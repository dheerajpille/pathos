

from django.shortcuts import render


from django.http import Http404
# Create your views here.

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from .serializers import PatientSerializer, LoginSerializer, DoctorSerializer
from django.contrib.auth.models import User

from .models import Patient, Doctor


class CreateParentUserView(APIView):

    permission_classes = {AllowAny, }
    def post(self, request):
        #This is where we create a parent for
        create_doctor = DoctorSerializer(data=request.data)

        if create_doctor.is_valid():
            create_doctor.save()

            serializer = DoctorSerializer(create_doctor.data, context={'request':request})
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(create_doctor.errors, status=status.HTTP_400_BAD_REQUEST)
        





class LoginView(APIView):
    """
    Logs client in with required User credentials (username/password)
    """

    # Gives any user permission to POST for login
    permission_classes = {AllowAny, }

    # POST data for login request
    def post(self, request):

        # Gets data from POST call and places it in LoginSerializer
        validate_user = LoginSerializer(data=request.data)

        # Checks if given data is valid
        if validate_user.is_valid():

            # Places the aforementioned data in UserSerializer
            serializer = DoctorSerializer(validate_user.validated_data, context={'request': request})

            # Logs User into API
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Returns any errors found in POST data
        return Response(validate_user.errors, status=status.HTTP_401_UNAUTHORIZED)

class PatientList(generics.ListAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        user = self.request.user
        doctor = Doctor.objects.get(user=user)
        return Patient.objects.filter(doctor=doctor)

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        try:
            serializer = PatientSerializer(queryset, many=True)
            return Response(serializer.data)

        except Patient.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class GetPatientView(APIView):


    serializer_class = PatientSerializer

    permission_classes = {AllowAny, }

    def get_object(self, pk):
        try:
            patient = Patient.objects.get(user=pk)
            return patient

        except Patient.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        try:
            patient = self.get_object(pk)

            if Patient.objects.get(user=request.user) == patient:
                serializer = PatientSerializer(patient, context={'request', request})

                return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        


