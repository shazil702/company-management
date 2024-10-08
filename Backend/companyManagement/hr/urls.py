from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.EmployeeView.as_view()),
    path('send_email/', views.SendFormView.as_view()),
    path('manager/', views.ManagerView.as_view()),
    path('employee_detail/', views.EmployeeDetailView.as_view()),
    path('add_attendance/', views.AddAttendanceView.as_view()),
    path('view_attendance/', views.AttendanceListView.as_view()),
]