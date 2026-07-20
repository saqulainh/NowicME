import os
import sys
import django

print("=== Nowic Studio Admin Promoter ===")
database_url = input("Enter production DATABASE_URL: ").strip()
email = input("Enter the email to promote to admin: ").strip()

if not database_url or not email:
    print("Error: DATABASE_URL and email are required.")
    sys.exit(1)

os.environ['DATABASE_URL'] = database_url
os.environ['SECRET_KEY'] = 'temp-secret-key'
os.environ['CLERK_JWKS_URL'] = 'https://clerk.nowicstudio.in'
os.environ['CLERK_WEBHOOK_SECRET'] = 'temp'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.base')

try:
    django.setup()
except Exception as e:
    print(f"\nFailed to connect. Check your DATABASE_URL. Error: {e}")
    sys.exit(1)

from apps.users.models import UserProfile

try:
    user, created = UserProfile.objects.get_or_create(
        clerk_user_id='user_3GXbhuSUGc4Latyj3065AnnlBWk',
        defaults={
            'email': email,
            'full_name': 'S.saqulain Haider',
            'role': 'admin'
        }
    )
    if not created:
        user.role = 'admin'
        user.email = email
        user.full_name = 'S.saqulain Haider'
        user.save()
        
    print(f"\nSuccess! The user {email} is now an ADMIN in the live database.")
    print("Go back to the website and refresh the Admin Portal.")
except Exception as e:
    print(f"\nError: Could not update the database. {e}")
