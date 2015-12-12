import random
import json

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

        serializedFemale = FemaleSerializer(randomFemale)
        return Response(serializedFemale.data)

    except ValueError:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getFemale(request):

    identifier = request.GET.get("identifier", None)

    # If the identifier is an id number
    try:
        float(identifier)
        try:
            female = Female.objects.get(pk=identifier)
        except Female.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # If the identifier is a full name
    except ValueError:
        fullName = json.loads(identifier)
        try:
            female = Female.objects.get(firstName=fullName['firstName'], lastName=fullName['lastName'])
        except Female.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # If there is no identifier
    except TypeError:
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
        female = Female.objects.get(pk=request.data['id'])
    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedFemale = FemaleSerializer(female, data=request.data)

    if serializedFemale.is_valid():
        serializedFemale.save()
        return Response(serializedFemale.data)

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
        female.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Female.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
