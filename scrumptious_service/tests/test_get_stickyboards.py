from fastapi.testclient import TestClient
from main import app
from queries.stickyboard import StickyBoardQueries
import pytest
from authenticator import authenticator

client = TestClient(app)

class EmptyStickyBoardQueries:
    def get_stickyboards(self):
        return []

def test_get_all_stickyboards():
    app.dependency_overrides[StickyBoardQueries] = EmptyStickyBoardQueries
    response = client.get("/stickyboard")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
