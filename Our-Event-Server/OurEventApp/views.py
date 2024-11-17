from .models import Activity, Event, Media, Partner, Registration  
from .serializers import ActivitySerializer, EventSerializer, MediaSerializer, PartnerSerializer, RegistrationSerializer
from rest_framework import status, generics, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .permissions import IsAdminOrReadOnly, IsEventGuest
from django.shortcuts import get_object_or_404
from django.conf import settings



class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly, IsEventGuest] 

    def get_queryset(self):
        if self.request.user.is_staff:
            return Event.objects.all()
        return Event.objects.filter(guests=self.request.user)


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly, IsEventGuest]

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, id=event_id)

        if self.request.user.is_staff or self.request.user in event.guests.all():
            return Activity.objects.filter(event=event)
        return Activity.objects.none() 


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly, IsEventGuest]

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, id=event_id)

        if self.request.user.is_staff or self.request.user in event.guests.all():
            return Partner.objects.filter(event=event)
        return Partner.objects.none()

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated, IsEventGuest]

    def perform_create(self, serializer):
        event_id = self.kwargs.get('event_id') 
        event = get_object_or_404(Event, id=event_id)
        serializer.save(user=self.request.user, event=event)
   
    def destroy(self, request, *args, **kwargs):
        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, id=event_id)
        try:
            registration = Registration.objects.get(user=request.user, event=event)
            registration.delete()  
            return Response({"detail": "Έχετε αποχωρήσει από το event."}, status=status.HTTP_204_NO_CONTENT)
        except Registration.DoesNotExist:
            return Response({"detail": "Δεν υπάρχει εγγραφή για το συγκεκριμένο event."}, status=status.HTTP_404_NOT_FOUND)
        

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated, IsEventGuest]  

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, id=event_id)

        if self.request.user.is_staff or self.request.user in event.guests.all():
            return Media.objects.filter(event=event)
        return Media.objects.none() 

    def create(self, request, *args, **kwargs): 

        if not request.user.is_staff:
            return Response({"detail": "Δεν έχετε δικαίωμα να εκτελέσετε αυτή την ενέργεια."}, status=status.HTTP_403_FORBIDDEN)

        event_id = self.kwargs.get('event_id')
        event = get_object_or_404(Event, id=event_id)
        file = request.FILES.get('file')

        if not file:
            return Response({"detail": "Απαιτείται ένα αρχείο."}, status=status.HTTP_400_BAD_REQUEST)


        file_type = 'image' if file.content_type.startswith('image') else 'video' if file.content_type.startswith('video') else None

        if not file_type:
            return Response({"detail": "Μόνο φωτογραφίες και βίντεο επιτρέπονται."}, status=status.HTTP_400_BAD_REQUEST)


        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save(event=event, file_type=file_type) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):

        if not request.user.is_staff:
            return Response({"detail": "Δεν έχετε δικαίωμα να εκτελέσετε αυτή την ενέργεια."}, status=status.HTTP_403_FORBIDDEN)

        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Το αρχείο διαγράφηκε επιτυχώς."}, status=status.HTTP_204_NO_CONTENT)
    

class LoginView(generics.views.APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            response = Response({"message": "Login successful"}, status=200)
            response.set_cookie(
                key='auth_token',
                value=token.key,
                httponly=False,
                secure= not settings.DEBUG,
                samesite='Lax',
            )
            return response
        return Response({"message": "Invalid credentials"}, status=400)
    

class LogoutView(generics.views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logout successful"}, status=200)
        response.delete_cookie('auth_token', samesite='Lax')
        request.user.auth_token.delete()
        return response
    

class CheckAuthenticationView(generics.views.APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        return Response({"message": "User authenticated"}, status=200) 









