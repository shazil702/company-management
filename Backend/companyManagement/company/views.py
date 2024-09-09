from rest_framework.views import APIView
from .models import Company
from .serializer import CompanySerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsSuperUser
from rest_framework import status

class CompanyView(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, id=None):
        if id is not None:
            company = Company.objects.get(id=id)
            serializer = CompanySerializer(company)
            return Response(serializer.data)
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
    def put(self, request, id):
        company = Company.objects.get(id=id)
        serializer = CompanySerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)
    def delete(self, request, id):
        company = Company.objects.get(id=id)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
