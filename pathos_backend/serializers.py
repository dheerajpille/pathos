
from rest_framework import serializers

from rest_framework.exceptions import ValidationError

from django.contrib.auth import authenticate 
from django.contrib.auth.models import User
from .models import Patient, Doctor

class PatientSerializer(serializers.ModelSerializer):

    age = serializers.IntegerField()
    sex = serializers.ChoiceField(choices=(('Male'), ('Female')))
    doctor = serializers.ReadOnlyField()
    username = serializers.CharField(source='user.username', max_length=25)
    password = serializers.CharField(source='user.password', max_length=50)


    class Meta: 
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'age', 'sex', 'doctor')
    
    def create(self, validated_data):
        patient_data = validated_data.pop('patient', None)
        user = super(PatientSerializer, self).create(validated_data)

        self.update_or_create_patient(user, patient_data)
        return user
    

    def update(self, instance, validated_data):
        patient_data = validated_data.pop('patient', None)
        self.update_or_create_patient(instance, patient_data)

        return super(PatientSerializer, self).update(instance, validated_data)

    def update_or_create_patient(self, user, patient_data):
        Patient.objects.update_or_create(user=user, defaults=patient_data)

class DoctorSerializer(serializers.ModelSerializer):

    age = serializers.IntegerField()
    sex = serializers.ChoiceField(choices=(('Male'), ('Female')))

    class Meta: 
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'age', 'sex')
    
    def create(self, validated_data):
        doctor_data = validated_data.pop('doctor', None)
        user = super(DoctorSerializer, self).create(validated_data)

        self.update_or_create_doctor(user, doctor_data)
        return user
    

    def update(self, instance, validated_data):
        doctor_data = validated_data.pop('doctor', None)
        self.update_or_create_doctor(instance, doctor_data)

        return super(DoctorSerializer, self).update(instance, validated_data)

    def update_or_create_doctor(self, user, doctor_data):
        Doctor.objects.update_or_create(user=user, defaults=doctor_data)

class LoginSerializer(serializers.Serializer):
    """
    Login serializer, which validates client's username and password with database
    """

    # JSON fields rendered for input
    username = serializers.CharField(style={'input_type': 'username'}, required=True)
    password = serializers.CharField(style={'input_type': 'password'}, required=True)

    # Validates login credentials with database
    def validate(self, attrs):

        # Gets username and password fields from given data
        username = attrs.get('username')
        password = attrs.get('password')

        # Authenticates username and password with database
        user = authenticate(request=self.context.get('request'), username=username, password=password)

        # Checks if User was found, raises ValidationError otherwise
        if user:
            pass
        else:
            # ValidationError when username/password is incorrect and not matching with any User in database
            raise ValidationError('Unable to login with provided credentials.')

        # Gives User if found
        return user

    class Meta:
        # Specifies model
        model = User

        # Lists fields given to serializer
        fields = ('username', 'password', )

        # Declares password field to not be shown in response
        write_only_fields = ('password', )
