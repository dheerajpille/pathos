from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
# Create your models here.

#Parent Model 
class Doctor(models.Model):
    age = models.IntegerField()
    sex = models.CharField(max_length=8)
    user = models.OneToOneField(User, on_delete=models.CASCADE)



#Child Model
class Patient(models.Model):
    age = models.IntegerField()
    sex = models.CharField(max_length=8)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)

#Additional information

class Medication(models.Model):
    #Patient that the medication is assigned to 
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    
    name = models.CharField(max_length=150)
    status = models.CharField(max_length=25)


class SleepRate(models.Model):
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    light = models.DecimalField(max_digits=10, decimal_places=2)
    rem = models.DecimalField(max_digits=10, decimal_places=2)
    deep = models.DecimalField(max_digits=10, decimal_places=2)
    awake = models.DecimalField(max_digits=10, decimal_places=2)

class HeartRate(models.Model):
    peak = models.DecimalField(max_digits=10, decimal_places=2)
    resting = models.DecimalField(max_digits=10, decimal_places=2)
    out_of_range = models.DecimalField(max_digits=10, decimal_places=2)
    fat_burn = models.DecimalField(max_digits=10, decimal_places=2)
    cardio = models.DecimalField(max_digits=10, decimal_places=2) 

class DailyReport(models.Model):
    #Patient that the report belongs to
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    date = models.DateField()
    sentiment_array = ArrayField(
        models.DecimalField(max_digits=10, decimal_places=3)

    )

    average_sentiment = models.DecimalField(max_digits=10, decimal_places=3)
    daily_sleep = models.ForeignKey(SleepRate, on_delete=models.CASCADE)
    daily_heart_rate = models.ForeignKey(HeartRate, on_delete=models.CASCADE)


class Message(models.Model):
    date = models.DateField(auto_now=True)
    message = models.CharField(max_length=300)
    daily_report = models.ForeignKey(DailyReport, on_delete=models.CASCADE)

