from django.shortcuts import render


from django.http import Http404
# Create your views here.

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView


class CreateParentUserView(APIView):

    permission_classes = {AllowAny, }
    def post(self, request):
        #This is where we create a parent for
        pass


class CreateChildUserView(APIView):

    def post(self, request): 
        pass