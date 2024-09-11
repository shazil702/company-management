from rest_framework import serializers
from authentication.models import User,Department
from authentication.serializer import DepartmentSerializer
from .models import Attendance

class UserSerizlizer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'image', 'department', 'department_id')

class AttendanceSerializer(serializers.ModelSerializer):
    employee = UserSerizlizer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Attendance
        fields = ('id', 'employee', 'employee_id', 'date', 'clock_in', 'clock_out')

    def create(self, validated_data):
        employee = validated_data.pop('employee_id')
        return Attendance.objects.create(employee=employee, **validated_data)
