import re

from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

default_cache_time = 60


def cache_key_stringfiy(base_key, query_dict=None):
    result = [base_key]
    if query_dict:
        for key, value in query_dict.items():
            if isinstance(value, str):
                value = re.sub(' |　', '_', value)
            result.append(f'{key}-{value}')
    return ':'.join(result)


def get_max_num_key(base_key, query_key):
    return cache_key_stringfiy(base_key, query_dict={query_key: "max_num"})


def get_detail_key(base_key, pk):
    return cache_key_stringfiy(base_key, query_dict={"pk": pk})


class CacheListModelMixin(mixins.ListModelMixin):
    enable_query_param_list = ['category', 'tag', 'page']

    def list(self, request, *args, **kwargs):
        queryset = self.get_list_queryset(
            query_params=request.query_params, base_key=self.base_cache_key)
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True, context={
            "request": request})
        return self.get_paginated_response(
            serializer.data)

    def get_list_queryset(self, query_params, base_key, time=None):
        if 'search' in query_params:
            return self.filter_queryset(super().get_queryset().filter())
        query_dict = self.sort_query_dict(query_params)
        self.list_cache_key_save(
            query_dict=query_dict,
            base_key=base_key)
        cache_key = cache_key_stringfiy(
            base_key=base_key, query_dict=query_dict)
        print(cache_key)
        return cache.get_or_set(
            cache_key, self.filter_queryset(
                super().get_queryset().filter()))

    def sort_query_dict(self, query_dict):
        sorted_dict = {}
        for key in self.enable_query_param_list:
            if key in query_dict:
                sorted_dict[key] = query_dict[key]
        return sorted_dict

    def list_cache_key_save(self, query_dict, base_key, time=None):
        for key, value in query_dict.items():
            self.save_cache_max_number(
                value=value, base_key=base_key, query_key=key, time=time)

    def save_cache_max_number(self,
                              value,
                              base_key,
                              query_key,
                              time=None):
        key_name = get_max_num_key(base_key, query_key)
        max_num = cache.get(key_name)
        if max_num:
            if value > max_num:
                cache.set(
                    key_name,
                    value,
                    timeout=time if time else default_cache_time)
        else:
            cache.set(
                key_name,
                value,
                timeout=time if time else default_cache_time)


class CacheRetrieveModelMixin(mixins.RetrieveModelMixin):
    def retrieve(self, request, pk=None):
        instance = self.get_detail_queryset(
            base_key=self.base_cache_key, request=request, pk=pk)
        serializer = self.get_serializer(instance, context={
            "request": request})
        return Response(serializer.data)

    def get_detail_queryset(self, base_key, request, pk=None):
        key_name = get_detail_key(base_key=base_key, pk=pk)
        result = cache.get(key_name)
        if result:
            return result

        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        cache.set(key_name, instance, default_cache_time)
        return instance


class CacheCreateAndUpdateAndDestroyModelMixin(
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={
                'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        self.delete_list_cache(self.base_cache_key)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        self.delete_list_cache(self.base_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
        return Response(serializer.data)

    def destroy(self, request, pk=None, *args, **kwargs):
        instance = self.get_object()
        print(self.base_cache_key)
        self.perform_destroy(instance)
        self.delete_list_cache(self.base_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete_list_cache(self, base_key):
        self.delete_index_cache(base_key)
        self.delete_list_query_cache(base_key)

    def delete_index_cache(self, base_key):
        key_name = cache_key_stringfiy(base_key)
        cache.delete(key_name)

    def delete_page_only_cache(self, base_key, max):
        count = 1
        while max >= count:
            key_name = cache_key_stringfiy(base_key, query_dict={
                'page': count,
            })
            cache.delete(key_name)
            count += 1

    def delete_cache_max_number(self, base_key, query_key, max, page_max):
        count = 1
        while max >= count:
            page_count = 1
            key_name = cache_key_stringfiy(base_key, query_dict={
                query_key: count,
                'page': page_count,
            })
            cache.delete(key_name)
            if page_max > 1:
                while int(page_max) >= page_count:
                    key_name = cache_key_stringfiy(base_key, query_dict={
                        query_key: count,
                        'page': page_count,
                    })
                    cache.delete(key_name)
                    page_count += 1
            count += 1

    def delete_detail_cache(self, base_key, pk):
        key_name = get_detail_key(base_key=base_key, pk=pk)
        cache.delete(key_name)

    def delete_list_query_cache(self, base_key):
        page_max_key = get_max_num_key(base_key, 'page')
        page_max = cache.get(page_max_key)
        if not page_max:
            return
        for key in self.enable_query_param_list:
            if key == 'page':
                self.delete_page_only_cache(base_key, int(page_max))
            else:
                max_key = get_max_num_key(base_key, key)
                max = cache.get(max_key)
                if max:
                    self.delete_cache_max_number(
                        base_key, key, int(max), int(page_max))


"""
page以外のparamはpageと必ずセットでキャッシュします
- category=1&page=1
page以外のparamは一つだけでキャッシュします
- category=1&page=1 # ok
- page=1 # ok
- category=1&tag=1&page=1 # not working
"""


class CacheModelViewSet(CacheListModelMixin,
                        CacheRetrieveModelMixin,
                        CacheCreateAndUpdateAndDestroyModelMixin,
                        viewsets.GenericViewSet):
    pass


class ReadOnlyCacheModelViewSet(CacheListModelMixin,
                                CacheRetrieveModelMixin,
                                viewsets.GenericViewSet):
    pass
    # class CacheModelViewSet(viewsets.ModelViewSet):
    #     """
    #     page以外のparamはpageと必ずセットでキャッシュします
    #     - category=1&page=1
    #     page以外のparamは一つだけでキャッシュします
    #     - category=1&page=1 # ok
    #     - page=1 # ok
    #     - category=1&tag=1&page=1 # not working
    #     """
    #     default_cache_time = 60
    #     enable_query_param_list = ['category', 'tag', 'page']

    #     def list(self, request):
    #         queryset = self.get_list_queryset(
    #             request=request, base_key=self.base_cache_key)
    #         page = self.paginate_queryset(queryset)
    #         serializer = self.get_serializer(page, many=True, context={
    #             "request": request})
    #         return self.get_paginated_response(
    #             serializer.data)

    #     def retrieve(self, request, pk=None):
    #         instance = self.get_detail_queryset(
    #             base_key=self.base_cache_key, request=request, pk=pk)
    #         serializer = self.get_serializer(instance, context={
    #             "request": request})
    #         return Response(serializer.data)

    #     def get_detail_queryset(self, base_key, request, pk=None):
    #         key_name = get_detail_key(base_key=base_key, pk=pk)
    #         result = cache.get(key_name)
    #         if result:
    #             return result

    #         queryset = self.queryset
    #         instance = get_object_or_404(queryset, pk=pk)
    #         cache.set(key_name, instance, self.default_cache_time)
    #         return instance

    #     def create(self, request, *args, **kwargs):
    #         serializer = self.get_serializer(
    #             data=request.data, context={
    #                 'request': request})
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         self.delete_index_cache(base_key=self.base_cache_key)
    #         self.delete_list_query_cache(base_key=self.base_cache_key)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)

    #     def update(self, request, pk=None):
    #         queryset = self.queryset
    #         instance = get_object_or_404(queryset, pk=pk)
    #         serializer = self.get_serializer(instance, data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_update(serializer)
    #         self.delete_index_cache(base_key=self.base_cache_key)
    #         self.delete_list_query_cache(base_key=self.base_cache_key)
    #         self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
    #         return Response(serializer.data)

    #     def get_list_queryset(self, request, base_key, time=None):
    #         if 'search' in request.query_params:
    #             return self.filter_queryset(super().get_queryset().filter())
    #         query_dict = self.sort_query_dict(request.query_params)
    #         self.list_cache_key_save(
    #             query_dict=query_dict,
    #             base_key=base_key)
    #         cache_key = cache_key_stringfiy(
    #             base_key=base_key, query_dict=query_dict)
    #         return cache.get_or_set(
    #             cache_key, self.filter_queryset(
    #                 super().get_queryset().filter()))

    #     def sort_query_dict(self, query_dict):
    #         sorted_dict = {}
    #         for key in self.enable_query_param_list:
    #             if key in query_dict:
    #                 sorted_dict[key] = query_dict[key]
    #         return sorted_dict

    #     def list_cache_key_save(self, query_dict, base_key, time=None):
    #         for key, value in query_dict.items():
    #             self.save_cache_max_number(
    #                 value=value, base_key=base_key, query_key=key, time=time)

    #     def save_cache_max_number(self,
    #                               value,
    #                               base_key,
    #                               query_key,
    #                               time=None):
    #         key_name = get_max_num_key(base_key, query_key)
    #         max_num = cache.get(key_name)
    #         if max_num:
    #             if value > max_num:
    #                 cache.set(
    #                     key_name,
    #                     value,
    #                     timeout=time if time else self.default_cache_time)
    #         else:
    #             cache.set(
    #                 key_name,
    #                 value,
    #                 timeout=time if time else self.default_cache_time)

    #     def delete_list_query_cache(self, base_key):
    #         page_max_key = get_max_num_key(base_key, 'page')
    #         page_max = cache.get(page_max_key)
    #         if not page_max:
    #             return
    #         for key in self.enable_query_param_list:
    #             if key == 'page':
    #                 self.delete_page_only_cache(base_key, int(page_max))
    #             else:
    #                 max_key = get_max_num_key(base_key, key)
    #                 max = cache.get(max_key)
    #                 if max:
    #                     self.delete_cache_max_number(
    #                         base_key, key, int(max), int(page_max))

    #     def delete_index_cache(self, base_key):
    #         key_name = cache_key_stringfiy(base_key)
    #         cache.delete(key_name)

    #     def delete_page_only_cache(self, base_key, max):
    #         count = 1
    #         while max >= count:
    #             key_name = cache_key_stringfiy(base_key, query_dict={
    #                 'page': count,
    #             })
    #             cache.delete(key_name)
    #             count += 1

    #     def delete_cache_max_number(self, base_key, query_key, max, page_max):
    #         count = 1
    #         while max >= count:
    #             page_count = 1
    #             key_name = cache_key_stringfiy(base_key, query_dict={
    #                 query_key: count,
    #                 'page': page_count,
    #             })
    #             cache.delete(key_name)
    #             if page_max > 1:
    #                 while int(page_max) >= page_count:
    #                     key_name = cache_key_stringfiy(base_key, query_dict={
    #                         query_key: count,
    #                         'page': page_count,
    #                     })
    #                     cache.delete(key_name)
    #                     page_count += 1
    #             count += 1

    #     def delete_detail_cache(self, base_key, pk):
    #         key_name = get_detail_key(base_key=base_key, pk=pk)
    #         cache.delete(key_name)
