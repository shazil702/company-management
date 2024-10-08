from rest_framework import generics,status
from .models import User
from rest_framework.permissions import AllowAny
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'message':'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = super().post(request, *args,**kwargs)
            user = User.objects.get(email=email)
            if user.is_manager:
                role = 'manager'
            else:
                role = 'employee'
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            return Response({'message': 'User registered successfully',
                             'user':response.data,
                             'access_token': access_token,
                             'refresh_token': refresh_token,
                             'role': role},
                             status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            try:
                if user.is_superuser:
                    return Response({
                        'message': 'Admin authentication successful',
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'role': 'admin'
                    }, status=status.HTTP_200_OK)
                elif user.is_hr:
                    return Response({
                        'message': 'HR authentication successful',
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'role': 'hr'
                    }, status=status.HTTP_200_OK)
                elif user.is_manager:
                    return Response({
                        'message': 'Manager authentication successful',
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'id' : user.id,
                        'role':'manager'
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'message': 'Employee authentication successful',
                        'access_token': access_token,
                        'refresh_token': refresh_token,
                        'role': 'employee'
                    }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'message': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)

            
