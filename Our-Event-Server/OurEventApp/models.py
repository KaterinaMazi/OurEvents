from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    phone = PhoneNumberField(null=True, blank=False, unique=True)

    def __str__(self):
        return self.username
    

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(null=True, max_length=1000)
    date_time = models.DateTimeField(null=True, blank=True) 
    ends_at = models.DateTimeField(null=True, blank=True) 
    guests =  models.ManyToManyField(User, related_name='events', blank=True)
    address = models.CharField(null=True, max_length=255)

    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(null=True, max_length=1000)
    max_participants = models.IntegerField(null=True)
    event = models.ForeignKey(Event, related_name='activities', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='activity_images/', null=True, blank=True)

    def __str__(self):
        return self.name
    
class Partner(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    link_page = models.URLField(max_length=255, null=True, blank=True) 
    event = models.ForeignKey(Event, related_name='partners', on_delete=models.CASCADE)  

    def __str__(self):
        return self.name

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    event = models.ForeignKey(Event, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"

class Media(models.Model):
    FILE_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    file = models.FileField(upload_to='media/')
    file_type = models.CharField(max_length=10, choices=FILE_TYPE_CHOICES, default='image')
    event = models.ForeignKey('Event', related_name='media_files', on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.file:
            if self.file.name.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                self.file_type = 'image'
            elif self.file.name.endswith(('.mp4', '.mov', '.avi', '.mkv')):
                self.file_type = 'video'
            else:
                self.file_type = 'other' 
        super().save(*args, **kwargs)
    




    
    
