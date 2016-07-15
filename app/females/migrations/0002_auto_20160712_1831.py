# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('females', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='female',
            old_name='fantasticBio',
            new_name='fantastic_bio',
        ),
        migrations.RenameField(
            model_name='female',
            old_name='firstName',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='female',
            old_name='lastName',
            new_name='last_name',
        ),
        migrations.RenameField(
            model_name='female',
            old_name='profileImage',
            new_name='profile_image',
        ),
    ]
