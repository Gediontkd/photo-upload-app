import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_upload_image():
    with open("tests/test_image.jpg", "rb") as img:
        response = client.post("/photos/upload/", files={"file": img}, data={
            "title": "Test Image",
            "description": "A test image",
            "latitude": 45.0,
            "longitude": -75.0
        })
    assert response.status_code == 200
    assert response.json()["title"] == "Test Image"
    assert response.json()["description"] == "A test image"

def test_read_photos():
    response = client.get("/photos/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_photo():
    response = client.get("/photos/1")
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        assert response.json()["id"] == 1
