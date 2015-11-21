import random

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Female
from .serializers import FemaleSerializer


@api_view(['GET'])
def getFemale(request):

    try:
        female = Female.objects.get(pk=request.data['pk'])
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getRandomFemale(request):

    last = Female.objects.count() - 1
    randomIndex = random.randint(0, last)
    randomFemale = Female.objects.all()[randomIndex]

    serializedFemale = FemaleSerializer(randomFemale)
    return Response(serializedFemale.data)


@api_view(['POST'])
def createFemale(request):
    pass


@api_view(['POST'])
def editFemale(request):
    pass


@api_view(['POST'])
def deleteFemale(request):
    pass
