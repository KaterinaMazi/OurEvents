# Generated by Django 5.1 on 2024-11-09 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OurEventApp', '0016_remove_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='activity_images/'),
        ),
    ]
