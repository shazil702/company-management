from rest_framework import serializers
from authentication.models import User,Department
from authentication.serializer import DepartmentSerializer

class UserSerizlizer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'image', 'department', 'department_id')