import json

from django.core.urlresolvers import reverse
from django.test import TestCase

from .models import Female


class FemaleAPITests(TestCase):

    def setUp(self):
        pass

    def test_getRandomFemale(self):
        url = reverse('get_random_female')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEquals(len(data), 1)

    def test_getFemale(self):
        pass

    def test_getFemaleList(self):
        pass

    def test_createFemale(self):
        pass

    def test_editFemale(self):
        pass

    def test_deleteFemale(self):
        pass
