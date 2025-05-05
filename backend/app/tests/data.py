
from app.models.user import User

def get_test_data():
    return [
        User(name="hel", email="moi@example.com"),
        User(name="test", email="test@example.com"),
    ]