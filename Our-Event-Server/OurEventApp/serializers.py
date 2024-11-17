from rest_framework import serializers
from .models import Activity, Event, Media, Partner, Registration

class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'file', 'file_type', 'event'] 
        read_only_fields = ['file_type']  


class EventSerializer(serializers.ModelSerializer):
    media_files = MediaSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = ['id','name', 'description', 'date_time', 'ends_at', 'guests','media_files']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity  
        fields = ['id', 'name', 'description', 'max_participants', 'image']


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ['id','name', 'description', 'link_page']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['user', 'event'] 
        read_only_fields = ['user', 'event'] 
