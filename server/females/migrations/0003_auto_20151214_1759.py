# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('females', '0002_auto_20151121_0047'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='female',
            name='dateOfBirth',
        ),
        migrations.RemoveField(
            model_name='female',
            name='zipCode',
        ),
    ]
