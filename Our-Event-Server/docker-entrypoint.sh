#!/bin/sh

echo "Running migrations"
python manage.py migrate

echo "Creating admin and guest users..."
python manage.py shell <<EOF
from OurEventApp.models import User
from django.core.management import call_command
from django.conf import settings

# Check if superuser exists
try:
    User.objects.get(username='admin')
    print("Admin user already exists.")
except User.DoesNotExist:
    # Create the superuser with environment variables or default values
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',  # Optional, adjust if needed
        password='12345',    # Make sure to change this or use env vars
    )
    print("Admin user created.")

# Check if guest user exists
try:
    User.objects.get(username='guest')
    print("Guest user already exists.")
except User.DoesNotExist:
    # Create the guest user
    User.objects.create_user(
        username='demo',
        email='demo@example.com',  # Adjust if needed
        password='12345',  # Use a secure password or randomize
    )
    print("Guest user created.")
EOF

echo "Collecting static files"
python manage.py collectstatic --noinput

echo "Starting server"

# continue the parent caller
exec "${@}"
