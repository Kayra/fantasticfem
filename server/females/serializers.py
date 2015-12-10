from rest_framework import serializers
from .models import Female


class FemaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Female
