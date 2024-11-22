#!/bin/sh

# Check if the required parameters are passed
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
  echo "Usage: $0 <admin_username> <admin_email> <admin_password>"
  exit 1
fi

ADMIN_USERNAME="$1"
ADMIN_EMAIL="$2"
ADMIN_PASSWORD="$3"

echo "Running migrations"
python manage.py migrate

echo "Creating admin user..."
python manage.py shell <<EOF
from OurEventApp.models import User

# Check if superuser exists
try:
    User.objects.get(username='$ADMIN_USERNAME')
    print("Admin user already exists.")
except User.DoesNotExist:
    # Create the superuser with provided parameters
    User.objects.create_superuser(
        username='$ADMIN_USERNAME',
        email='$ADMIN_EMAIL',
        password='$ADMIN_PASSWORD',
    )
    print("Admin user created.")
