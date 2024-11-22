from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('auth_token')
        if not token:
            return None
        
        token_model = Token.objects.filter(key=token)
        if not token_model.exists():
            return None

        return self.authenticate_credentials(token)