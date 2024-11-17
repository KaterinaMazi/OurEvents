from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Event, Activity, Media, Partner, Registration


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('first_name', 'last_name', 'username', 'password', 'phone')
    search_fields = ('first_name', 'last_name', 'username')

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone',)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone',)}),
    )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'date_time')
    search_fields = ('name', 'description')
    filter_horizontal = ('guests',)  

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'max_participants', 'event')
    search_fields = ('name', 'description')

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'event')  
    search_fields = ('name', 'description')

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event')  
    search_fields = ('user__username', 'event__name')


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('file', 'file_type', 'event')
    search_fields = ('file_type',)







