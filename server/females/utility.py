import random

from .models import Female


def getRandomFemale():
    last = Female.objects.count() - 1
    randomIndex = random.randint(0, last)
    return Female.objects.all()[randomIndex]
