from rest_framework import serializers
from .models import User, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'phone', 'is_superuser', 'is_hr', 'is_manager', 'is_employee', 'department', 'department_id']

    def create(self, validated):
        if validated.get('is_hr', False) or validated.get('is_superuser', False) or validated.get('is_manager', False):
            validated['is_employee'] = False
        else:
            validated['is_employee'] = True
        user = User.objects.create(username=validated['username'],
                                   email=validated['email'],
                                   phone=validated['phone'],
                                   is_superuser=validated.get('is_superuser', False),
                                   is_hr=validated.get('is_hr', False),
                                   is_manager=validated.get('is_manager', False),
                                   is_employee=validated['is_employee'])
        user.set_password(validated['password'])
        user.save()
        return user

