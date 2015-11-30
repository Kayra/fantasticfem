import random

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Female
from .serializers import FemaleSerializer


@api_view(['GET'])
def getRandomFemale(request):

    last = Female.objects.count() - 1
    randomIndex = random.randint(0, last)
    randomFemale = Female.objects.all()[randomIndex]

    serializedFemale = FemaleSerializer(randomFemale)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getFemale(request):

    femaleId = request.GET.get("id", None)

    try:
        female = Female.objects.get(pk=femaleId)
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getFemaleList(request):

    try:
        females = Female.objects.all().order_by('lastName')
        serializedFemales = FemaleSerializer(females, many=True)

        return Response(serializedFemales.data)

    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def createFemale(request):

    serializedFemale = FemaleSerializer(data=request.data)

    if serializedFemale.is_valid():
        serializedFemale.save()
        return Response(serializedFemale.data)

    return Response(serializedFemale.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def editFemale(request):

    try:
        female = Female.objects.get(firstName=request.data['firstName'], lastName=request.data['lastName'])
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female, data=request.data)

    if serializedFemale.is_valid():
        serializedFemale.save()
        return Response(serializedFemale.data)

    return Response(serializedFemale.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteFemale(request):

    firstName = request.GET.get("firstName", None)
    lastName = request.GET.get("lastName", None)
    print(firstName, lastName)
    try:
        female = Female.objects.get(firstName=firstName, lastName=lastName)
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    female.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
