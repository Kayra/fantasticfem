from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Female
from .serializers import FemaleSerializer


@api_view(['GET'])
def getFemale(reuqest):
    pass


@api_view(['GET'])
def getRandomFemale(reuqest):
    pass


@api_view(['POST'])
def createFemale(request):
    pass


@api_view(['POST'])
def editFemale(request):
    pass


@api_view(['POST'])
def deleteFemale(request):
    pass
