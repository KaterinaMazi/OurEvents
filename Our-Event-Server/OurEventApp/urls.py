from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ActivityViewSet, LoginView, LogoutView, CheckAuthenticationView, EventViewSet, MediaViewSet, PartnerViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'media', MediaViewSet)
router.register(r'partners', PartnerViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthenticationView.as_view(), name='check-auth'),
    path('events/<int:event_id>/partners/', PartnerViewSet.as_view({'get': 'list'}), name='partner-list'),
    path('events/<int:event_id>/activities/', ActivityViewSet.as_view({'get': 'list'}), name='activity-list'),
    path('events/<int:event_id>/registrations/', RegistrationViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'destroy'}), name='registration-list'),

    path('events/<int:event_id>/media/', MediaViewSet.as_view({'get': 'list', 'post': 'create'}), name='media-list'),
    path('events/<int:event_id>/media/<int:pk>/', MediaViewSet.as_view({'delete': 'destroy'}), name='media-detail'),

    path('', include(router.urls)),
]
