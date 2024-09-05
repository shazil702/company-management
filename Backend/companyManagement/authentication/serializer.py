from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'phone']

    def create(self, validated):
        user = User.objects.create(username=validated['username'],
                                   email=validated['email'],
                                   phone=validated['phone'])
        user.set_password(validated['password'])
        user.save()
        return user
        
