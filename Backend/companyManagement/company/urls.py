from django.urls import path
from . import views

urlpatterns = [
    path("allCompanies/", views.CompanyView.as_view()),
    path("allCompanies/<int:id>/",views.CompanyView.as_view()),
]