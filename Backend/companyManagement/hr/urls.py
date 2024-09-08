from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.EmployeeView.as_view()),
    path('send_email', views.SendFormView.as_view()),
]