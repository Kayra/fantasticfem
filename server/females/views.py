from django.utils.datastructures import MultiValueDictKeyError

from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .models import Female
from .serializers import FemaleSerializer
from . import utility


@api_view(['GET'])
def getRandomFemale(request):

    try:
        randomFemale = utility.getRandomFemale()
    except ValueError:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(randomFemale)
    return Response(serializedFemale.data)


@api_view(['GET'])
def getFemale(request):

    try:
        identifier = request.query_params['identifier']
    except MultiValueDictKeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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
    except MultiValueDictKeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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
