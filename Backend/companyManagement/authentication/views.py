from rest_framework import generics,status
from .models import User
from rest_framework.permissions import AllowAny
from .serializer import RegisterSerializer
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'message':'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = super().post(request, *args,**kwargs)
            return response
        except Exception as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)