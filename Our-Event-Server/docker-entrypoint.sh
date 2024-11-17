#!/bin/sh

echo "Running migrations"
python manage.py migrate

echo "Creating admin user..."
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
EOF

echo "Collecting static files"
python manage.py collectstatic --noinput

echo "Starting server"

# continue the parent caller
exec "${@}"