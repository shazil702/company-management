from django.db import models
from authentication.models import User

class Attendance(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    clock_in = models.TimeField()
    clock_out = models.TimeField(null=True, blank=True)
