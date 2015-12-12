import random

from django.utils.datastructures import MultiValueDictKeyError

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Female
from .serializers import FemaleSerializer


@api_view(['GET'])
def getRandomFemale(request):

    try:
        last = Female.objects.count() - 1
        randomIndex = random.randint(0, last)
        randomFemale = Female.objects.all()[randomIndex]

    except ValueError:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(randomFemale)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getFemale(request):

    identifier = request.query_params['identifier']

    try:
        female = Female.objects.get(pk=identifier)

    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    except TypeError:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getFemaleList(request):

    try:
        females = Female.objects.all().order_by('lastName')

    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemales = FemaleSerializer(females, many=True)
    return Response(serializedFemales.data)


@api_view(['POST'])
def createFemale(request):

    serializedFemale = FemaleSerializer(data=request.data)

    if serializedFemale.is_valid():
        serializedFemale.save()
        return Response(serializedFemale.data)

    else:
        return Response(serializedFemale.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def editFemale(request):

    try:
        female = Female.objects.get(pk=request.data['id'])
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female, data=request.data)

    if serializedFemale.is_valid():
        serializedFemale.save()
        return Response(serializedFemale.data)

    else:
        return Response(serializedFemale.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteFemale(request):

    #  Handle both query params and data to satisfy the lack of query params in test client
    try:
        identifier = request.query_params['id']
    except MultiValueDictKeyError:
        identifier = request.data['id']

    try:
        female = Female.objects.get(pk=identifier)
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    female.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
