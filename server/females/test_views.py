import json

from django.core.urlresolvers import reverse
from django.test import TestCase

from .models import Female


def createFemale(firstName, lastName, dateOfBirth, zipCode):
    """
        Convinience function to create a test female
    """
    Female.objects.create(firstName=firstName, lastName=lastName, dateOfBirth=dateOfBirth, zipCode=zipCode, bio='bio example', fantasticBio='fantastic bio example')


class FemaleAPITests(TestCase):

    def setUp(self):
        createFemale('Ada', 'Lovelace', '1990-01-01', '11111')
        createFemale('Barbara', 'Liskov', '1990-02-02', '22222')
        createFemale('Murasaki', 'Shikibu', '1990-02-02', '33333')

    def test_getFemale(self):

        """
            A female is returned when a correct Id is passed as a parameter
        """

        testFemale = Female.objects.all()[:1].get()
        testIdentifier = testFemale.id

        url = reverse('females:get_female')
        response = self.client.get(url, {'identifier': testIdentifier})
        self.assertEquals(response.status_code, 200)  # Make sure a success response is recieved

        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 7)  # Make sure all fields are present

        self.assertEquals(testIdentifier, data['id'])  # Make sure the correct female was returned

    def test_getRandomFemale(self):

        """
            A female is returned
        """

        url = reverse('females:get_random_female')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # Make sure a success response is recieved

        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 7)  # Make sure all fields are present

    def test_getRandomFemaleIsRandom(self):

        """
            When making multiple requests, the female returned should not be the same every time.
        """

        females = []
        url = reverse('females:get_random_female')

        for i in range(0, 5):
            response = self.client.get(url)
            data = json.loads(response.content.decode())
            females.append(data['id'])

        self.assertTrue(len(set(females)) > 1)  # Make sure the same female isn't being returned every time

    def test_getFemaleList(self):

        """
            List of all females should be returned
        """

        females = Female.objects.all().order_by('lastName')
        femaleIds = []
        for female in females:
            femaleIds.append(female.id)

        url = reverse('females:get_female_list')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # Make sure a success response is recieved

        data = json.loads(response.content.decode())

        responseIds = []
        for female in data:
            responseIds.append(female['id'])

        self.assertEquals(femaleIds, responseIds)  # Make sure females from API match actual females

    def test_createFemale(self):
        pass

    def test_editFemale(self):
        pass

    def test_deleteFemale(self):
        pass
