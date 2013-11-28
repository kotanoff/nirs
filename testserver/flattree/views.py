# Create your views here.
from django.shortcuts import render
from django.template import Template
from django.template import Context
import datetime


def home(request):
    context = {}
    return render(request, 'index.html', context)
