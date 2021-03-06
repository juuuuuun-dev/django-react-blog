from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    throttle_scope = 'login'

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={
            "request": request})
        if serializer.is_valid():
            return super().post(request, *args, **kwargs)
        return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
