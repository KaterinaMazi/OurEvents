from rest_framework import permissions
from .models import Event

class IsEventGuest(permissions.BasePermission):
    
    def has_permission(self, request, view):
        event_id = view.kwargs.get("event_id")
        if event_id is None or request.user.is_staff:
            return True
        event = Event.objects.get(id=event_id)
        
        return request.user in event.guests.all()
        

class IsAdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff