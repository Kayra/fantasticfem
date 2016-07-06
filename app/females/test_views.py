import json
from PIL import Image

from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpResponse
from django.core.files.images import ImageFile
from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework.renderers import JSONRenderer

from .models import Female
from .serializers import FemaleSerializer


def createFemale(firstName, lastName, dateOfBirth):

    """
        Convinience function to create a test female
    """

    Female.objects.create(firstName=firstName, lastName=lastName, profileImage=createImageFile(), bio='bio example', fantasticBio='fantastic bio example')


def createImageFile():

    """
        Convinience function to create a test image
    """

    image = Image.new('RGBA', size=(50, 50), color=(256, 0, 0))
    response = HttpResponse(content_type="image/png")
    image.save(response, 'PNG')

    return ImageFile(image)


class FemaleAPITests(TestCase):

    def setUp(self):
        createFemale('Ada', 'Lovelace', '11111')
        createFemale('Barbara', 'Liskov', '22222')
        createFemale('Murasaki', 'Shikibu', '33333')

    def test_getFemale(self):

        """
            A female should be returned when a correct id is passed as a parameter
        """

        testFemale = Female.objects.all()[:1].get()
        testIdentifier = testFemale.id

        url = reverse('females:get_female')

        response = self.client.get(url)
        self.assertEquals(response.status_code, 400)  # Make sure no params return error response

        response = self.client.get(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 400)  # Make sure bad params return error response

        response = self.client.get(url, {'identifier': testIdentifier})
        self.assertEquals(response.status_code, 200)  # Make sure valid request returns success response

        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 6)  # Make sure all fields are present

        self.assertEquals(testIdentifier, data['id'])  # Make sure the correct female was returned

    def test_getRandomFemale(self):

        """
            A female should be returned
        """

        url = reverse('females:get_random_female')

        response = self.client.get(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 200)  # Make sure parameters are ignored

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # Make sure valid request returns success response

        data = json.loads(response.content.decode())
        self.assertEquals(len(data), 6)  # Make sure all fields are present

    def test_getRandomFemaleIsRandom(self):

        """
            When making multiple requests, the female returned should not be the same every time.
        """

        females = []
        url = reverse('females:get_random_female')

        for i in range(0, 10):
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

        response = self.client.get(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 200)  # Make sure parameters are ignored

        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)  # Make sure valid request returns success response

        data = json.loads(response.content.decode())

        responseIds = []
        for female in data:
            responseIds.append(female['id'])

        self.assertEquals(femaleIds, responseIds)  # Make sure females from API match actual females

    def test_createFemale(self):

        """
            Female created with the API should be in the database
        """

        profileImage = SimpleUploadedFile("test.png", createImageFile())

        femaleToCreate = {}
        femaleToCreate['firstName'] = "Test"
        femaleToCreate['lastName'] = "Female"
        femaleToCreate['profileImage'] = profileImage
        femaleToCreate['bio'] = "Test bio"
        femaleToCreate['fantasticBio'] = "Fantastic test bio"

        url = reverse('females:create_female')

        response = self.client.post(url)
        self.assertEquals(response.status_code, 400)  # Make sure no params return error response

        response = self.client.post(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 400)  # Make sure bad params return error response

        response = self.client.post(url, femaleToCreate)
        self.assertEquals(response.status_code, 200)  # Make sure valid request returns success response

        femaleFromDb = Female.objects.get(pk=response.data['id'])
        self.assertEquals(femaleFromDb.firstName, response.data['firstName'])  # Make sure the female sent to the API is the same as that in the db
        self.assertEquals(femaleFromDb.lastName, response.data['lastName'])  # Make sure the female sent to the API is the same as that in the db

    def test_editFemale(self):

        """
            Female edited with the API should persist those edits in the db
        """

        femaleToEdit = Female.objects.all()[:1].get()
        editedBio = "This is now an edited bio"
        femaleToEdit.bio = editedBio

        femaleToEditSerialized = FemaleSerializer(femaleToEdit)
        femaleToEditJson = JSONRenderer().render(femaleToEditSerialized.data)

        url = reverse('females:edit_female')

        response = self.client.put(url)
        self.assertEquals(response.status_code, 400)  # Make sure no params return error response

        response = self.client.put(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 400, )  # Make sure bad params return error response

        response = self.client.put(url, femaleToEditJson, content_type='application/json')
        self.assertEquals(response.status_code, 200)  # Make sure valid request returns success response

        femaleFromDb = Female.objects.get(pk=response.data['id'])
        self.assertEquals(femaleFromDb.bio, editedBio)  # Make sure the female in the DB has the same bio as the bio we passed to the API

    def test_deleteFemale(self):

        """
            Female that has been deleted should not be in the db
        """

        femaleToDelete = Female.objects.all()[:1].get()
        femaleToDeleteId = {'id': femaleToDelete.id}
        femaleToDeleteJson = json.dumps(femaleToDeleteId)

        url = reverse('females:delete_female')

        response = self.client.delete(url, {'wrong': 'wrong'}, content_type='application/json')
        self.assertEquals(response.status_code, 400, )  # Make sure bad params return error response

        response = self.client.delete(url, femaleToDeleteJson, content_type='application/json')
        self.assertEquals(response.status_code, 204)  # Make sure valid request returns success response

        with self.assertRaises(Female.DoesNotExist):
            Female.objects.get(pk=femaleToDelete.id)  # Make sure the female no longer exists in the DB
