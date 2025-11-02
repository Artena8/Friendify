
from app.models.user import User
from app.utils.security import hash_password

def get_test_data():
    return [
        User(username="hel", email="moi@example.com", password=hash_password("test"), is_google_account = False),
        User(username="test", email="test@example.com", password=hash_password("test"), is_google_account = False),
    ]