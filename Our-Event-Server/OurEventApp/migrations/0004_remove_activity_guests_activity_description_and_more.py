# Generated by Django 5.1 on 2024-09-15 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OurEventApp', '0003_guest_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='guests',
        ),
        migrations.AddField(
            model_name='activity',
            name='description',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='max_participans',
            field=models.IntegerField(null=True),
        ),
    ]