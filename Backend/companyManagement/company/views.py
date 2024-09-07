from rest_framework.views import APIView
from .models import Company
from .serializer import CompanySerializer
from rest_framework.response import Response

class CompanyView(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
