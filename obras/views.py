from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ObraSerializer
from .models import Obra

class ObraViewSet(viewsets.ModelViewSet):
    serializer_class = ObraSerializer
    queryset = Obra.objects.all()
