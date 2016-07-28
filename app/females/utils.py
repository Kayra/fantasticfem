import random

from females.models import Female


def get_random_female():
    """
        Return a random female model object from the db
    """
    last = Female.objects.count() - 1
    randomIndex = random.randint(0, last)
    return Female.objects.all()[randomIndex]
