# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Female',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('firstName', models.CharField(max_length=255)),
                ('lastName', models.CharField(max_length=255)),
                ('dateOfBirth', models.DateField()),
                ('zipCode', models.CharField(max_length=255)),
                ('bio', models.TextField()),
                ('fantasticBio', models.TextField()),
            ],
        ),
    ]
