# Generated by Django 5.1 on 2024-11-10 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OurEventApp', '0018_remove_partner_logo_partner_link_page'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='ends_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]