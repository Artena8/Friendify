import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    expected_keys = {"message", "db"}
    assert expected_keys.issubset(response.json().keys())