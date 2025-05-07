
from app.models.user import User
from app.utils.security import hash_password
from fastapi.testclient import TestClient

def get_test_data():
    return [
        User(name="hel", email="moi@example.com", password=hash_password("test")),
        User(name="test", email="test@example.com", password=hash_password("test")),
    ]