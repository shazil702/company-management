from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from phonenumber_field.modelfields import PhoneNumberField

class Department(models.Model):
    departmentName = models.CharField(max_length=255)

    def __str__(self):
        return self.departmentName

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    is_superuser = models.BooleanField(default=False)
    is_hr = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    image = models.ImageField(null=True, blank=True, upload_to='images')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username