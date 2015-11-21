from django.db import models
from localflavor.us.models import USZipCodeField


class Female(models.Model):

    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    dateOfBirth = models.DateField()
    zipCode = USZipCodeField()
    bio = models.TextField()
    fantasticBio = models.TextField()
