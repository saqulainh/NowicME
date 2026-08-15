from django.core.management.base import BaseCommand
from apps.users.models import UserProfile

class Command(BaseCommand):
    help = 'Promotes a given user to admin role'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email of the user to promote')

    def handle(self, *args, **kwargs):
        email = kwargs['email'].strip().lower()
        try:
            profile = UserProfile.objects.get(email__iexact=email)
            profile.role = 'admin'
            profile.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully updated {email} to admin.'))
        except UserProfile.DoesNotExist:
            profile = UserProfile.objects.create(
                clerk_user_id=f'pending_admin_{email}',
                email=email,
                full_name=email.split('@')[0].replace('.', ' ').replace('_', ' ').title(),
                role='admin'
            )
            self.stdout.write(self.style.SUCCESS(f'Created pending admin profile for {email}.'))
