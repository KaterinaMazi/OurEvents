# Generated by Django 5.1 on 2024-08-22 18:29

import phonenumber_field.modelfields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('OurEventApp', '0002_media'),
    ]

    operations = [
        migrations.AddField(
            model_name='guest',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, null=True, region=None, unique=True),
        ),
    ]
