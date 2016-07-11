from django.db import models


class Female(models.Model):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_image = models.ImageField()
    bio = models.TextField()
    fantastic_bio = models.TextField()
