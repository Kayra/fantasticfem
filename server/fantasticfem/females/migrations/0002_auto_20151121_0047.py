# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import localflavor.us.models


class Migration(migrations.Migration):

    dependencies = [
        ('females', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='female',
            name='zipCode',
            field=localflavor.us.models.USZipCodeField(max_length=10),
        ),
    ]
