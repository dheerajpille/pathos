from django.contrib import admin
from django.contrib.admin import site

from .models import Doctor, Patient
# Register your models here.

admin.site.register(Doctor)
admin.site.register(Patient)