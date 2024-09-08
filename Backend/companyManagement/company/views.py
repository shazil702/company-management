from rest_framework.views import APIView
from .models import Company
from .serializer import CompanySerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsSuperUser

class CompanyView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    def post(self, request):
        print(request.data)
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
