import re

from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response


def cache_key_stringfiy(base_key, query_dict):
    result = [base_key]
    for key, value in query_dict.items():
        if isinstance(value, str):
            value = re.sub(' |　', '_', value)
        result.append(f'{key}-{value}')
    return ':'.join(result)


def get_page_max_num_key(base_key):
    return cache_key_stringfiy(base_key, query_dict={base_key: "page_max_num"})


def get_detail_key(base_key, pk):
    return cache_key_stringfiy(base_key, query_dict={"pk": pk})


class CacheModelViewSet(viewsets.ModelViewSet):

    default_cache_time = 60

    def list(self, request):
        queryset = self.get_cache_queryset(
            request=request, base_key=self.base_cache_key)
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True, context={
            "request": request})
        return self.get_paginated_response(
            serializer.data)

    def retrieve(self, request, pk=None):
        instance = self.get_detail_cache(
            base_key=self.base_cache_key, request=request, pk=pk)
        serializer = self.get_serializer(instance, context={
            "request": request})
        return Response(serializer.data)

    def get_detail_cache(self, base_key, request, pk=None):
        key_name = get_detail_key(base_key=base_key, pk=pk)
        result = cache.get(key_name)
        if result:
            return result

        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        cache.set(key_name, instance, self.default_cache_time)
        return instance

    def update(self, request, pk=None):
        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # delete cache
        self.delete_page_cache(base_key=self.base_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
        return Response(serializer.data)

    def get_cache_queryset(self, request, base_key, pk=None):
        if pk:
            return self.get_list_queryset(request=request, base_key=base_key)
        return self.get_list_queryset(request=request, base_key=base_key)

    def get_list_queryset(self, request, base_key, time=None):
        self.cache_key_name_save(
            query_dict=request.query_params,
            base_key=base_key)
        cache_key = cache_key_stringfiy(
            base_key=base_key, query_dict=request.query_params)
        cache_data = cache.get(cache_key)
        print(f"cache_key: {cache_key}")
        if not cache_data:
            result = self.filter_queryset(super().get_queryset().filter())
            cache.set(
                cache_key,
                result,
                timeout=time if time else self.default_cache_time)
            return result
        return cache_data

    def cache_key_name_save(self, query_dict, base_key, time=None):
        """[summary]

        Arguments:
            query_dict {[dict]} -- [description]
            base_key {[string]} -- [description]
        """
        for key, value in query_dict.items():
            if key == 'page':
                self.cache_page_max_number_save(
                    value=value, base_key=base_key, time=time)

    def cache_page_max_number_save(self, value, base_key, time=None):
        key_name = get_page_max_num_key(base_key)
        print(f"pagemax: {key_name}")
        page = cache.get(key_name)
        if page:
            if value > page:
                cache.set(
                    key_name,
                    value,
                    timeout=time if time else self.default_cache_time)
        else:
            cache.set(
                key_name,
                value,
                timeout=time if time else self.default_cache_time)
        print(f"cache_page_number_save: {page}")

    def delete_page_cache(self, base_key):
        key_name = get_page_max_num_key(base_key)
        page = cache.get(key_name)
        # list index
        cache.delete(base_key)
        if page:
            count = 1
            while int(page) >= count:
                print(f"count: {count}")
                cache.delete(f"{base_key}:page-{count}")
                count += 1

    def delete_detail_cache(self, base_key, pk):
        key_name = get_detail_key(base_key=base_key, pk=pk)
        cache.delete(key_name)
