from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Company(models.Model):
    companyName = models.CharField(max_length=255)
    companyEmail = models.EmailField()
    companyPhone = PhoneNumberField()
    conpanyAddress = models.TextField()
    companyLogo = models.ImageField(upload_to='images', blank=True, null=True)

    def __str__(self):
        return self.companyName
