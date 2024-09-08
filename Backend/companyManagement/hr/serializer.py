from rest_framework import serializers
from authentication.models import User

class UserSerizlizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'image',)