from django.db import models


class Female(models.Model):

    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    profileImage = models.ImageField()
    bio = models.TextField()
    fantasticBio = models.TextField()
