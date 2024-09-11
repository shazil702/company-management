from rest_framework.views import APIView
from authentication.models import User
from .serializer import UserSerizlizer, AttendanceSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsHR, IsManager, IsEmployee
from django.core.mail import send_mail
from companyManagement import settings
from .models import Attendance

class EmployeeView(APIView):
    permission_classes = (IsAuthenticated, IsHR,)
    def get(self, request):
        employees = User.objects.exclude(Q(is_hr=True) | Q(is_superuser=True))
        serializer = UserSerizlizer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SendFormView(APIView):
    def post(self, request):
        try:
            mail = request.data.get('email')
            subject = 'Your Registration Form'
            message = 'click this link to register http://localhost:5173/register '
            from_mail = settings.EMAIL_HOST_USER
            send_mail(subject, message, from_mail, [mail])
            return Response({'message': 'Mail sent successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ManagerView(APIView):
    permission_classes = (IsAuthenticated, IsManager,)
    def get(self, request):
        manager_department = request.user.department
        employees = User.objects.filter(department=manager_department, is_employee=True)
        serializer = UserSerizlizer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class EmployeeDetailView(APIView):
    permission_classes = (IsAuthenticated, IsEmployee,)
    def get(self, request):
        employee_id = request.user.id
        employee = User.objects.get(id=employee_id)
        serializer = UserSerizlizer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AddAttendanceView(APIView):
    permission_classes = (IsAuthenticated, IsEmployee,)
    def post(self, request):
        print(request.data)
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

