from rest_framework.views import APIView
from authentication.models import User
from .serializer import UserSerizlizer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsHR

class EmployeeView(APIView):
    permission_classes = (IsAuthenticated, IsHR,)
    def get(self, request):
        employees = User.objects.exclude(Q(is_hr=True) | Q(is_superuser=True))
        serializer = UserSerizlizer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)