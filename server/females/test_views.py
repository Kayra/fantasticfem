import json

from django.core.urlresolvers import reverse
from django.test import TestCase

from .models import Female


def createFemale(firstName, lastName, dateOfBirth, zipCode, bio, fantasticBio):
    """
        Convinience function to create a test female
    """
    Female.objects.create(firstName=firstName, lastName=lastName, dateOfBirth=dateOfBirth, zipCode=zipCode, bio=bio, fantasticBio=fantasticBio)


class FemaleAPITests(TestCase):

    def setUp(self):
        createFemale('Kayra', 'Alat', '1990-01-01', '11111', 'bio example', 'fantasticbio example')
        createFemale('Oytun', 'Alat', '1990-01-01', '11111', 'bio example', 'fantasticbio example')
        createFemale('Sule', 'Alat', '1990-01-01', '11111', 'bio example', 'fantasticbio example')

    def test_getFemale(self):
        """
            A female is returned when a correct Id is passed as a parameter
        """
        url = reverse('females:get_female')
        response = self.client.get(url, {'identifier': 10})
        self.assertEquals(response.status_code, 200)
        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 7)  # Make sure all fields are present

    def test_getRandomFemale(self):
        """
            A female is returned
        """
        url = reverse('females:get_random_female')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 7)

    def test_getRandomFemaleIsRandom(self):
        """
            When making multiple requests, the female returned should not be the same every time.
        """
        pass

    def test_getFemaleList(self):
        pass

    def test_createFemale(self):
        pass

    def test_editFemale(self):
        pass

    def test_deleteFemale(self):
        pass
