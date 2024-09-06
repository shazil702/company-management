from rest_framework import generics,status
from .models import User
from rest_framework.permissions import AllowAny
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate

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
            user = User.objects.get(email=email)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            return Response({'message': 'User registered successfully',
                             'user':response.data,
                             'access_token': access_token,
                             'refresh_token': refresh_token},
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
            try:
                if user.is_superuser:
                    admin_access_token = str(refresh.access_token)
                    admin_refresh_token = str(refresh)
                    return Response({
                        'message': 'Admin authentication successful',
                        'admin_access_token': admin_access_token,
                        'admin_refresh_token': admin_refresh_token
                    }, status=status.HTTP_200_OK)
                
                elif user.is_hr:
                    hr_access_token = str(refresh.access_token)
                    hr_refresh_token = str(refresh)
                    return Response({
                        'message': 'HR authentication successful',
                        'hr_access_token': hr_access_token,
                        'hr_refresh_token': hr_refresh_token
                    }, status=status.HTTP_200_OK)
                
                elif user.is_manager:
                    manager_access_token = str(refresh.access_token)
                    manager_refresh_token = str(refresh)
                    return Response({
                        'message': 'Manager authentication successful',
                        'manager_access_token': manager_access_token,
                        'manager_refresh_token': manager_refresh_token
                    }, status=status.HTTP_200_OK)
                
                else:
                    employee_access_token = str(refresh.access_token)
                    employee_refresh_token = str(refresh)
                    return Response({
                        'message': 'Employee authentication successful',
                        'employee_access_token': employee_access_token,
                        'employee_refresh_token': employee_refresh_token
                    }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'message': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)

            
