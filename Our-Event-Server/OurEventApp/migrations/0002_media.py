# Generated by Django 5.0.6 on 2024-08-18 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OurEventApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='media/')),
                ('file_type', models.CharField(editable=False, max_length=50)),
            ],
        ),
    ]