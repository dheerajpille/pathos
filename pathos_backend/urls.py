"""pathos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('create-parent/', views.CreateParentUserView.as_view(), name="create-parent"), 
    path('create-child/', views.CreateChildUserView.as_view(), name="create-child"), 
    path('login/', views.LoginView.as_view(), name='login'),


    #Patient specific API calls
    path('patients/<int:pk>/', views.GetPatientView.as_view(), name='patients'),
    #Doctor specific API calls
    path('doctors/list-patients/', views.PatientList.as_view(), name="list-patients"),
    path('doctors/get-patient/<int:pk>/', views.GetPatientView.as_view(), name='get-patient'),

]
