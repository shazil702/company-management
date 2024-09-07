from django.urls import path
from . import views

urlpatterns = [
    path("allCompanies", views.CompanyView.as_view()),
]