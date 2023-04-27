from fastapi.testclient import TestClient
from queries.sticky import StickyQueries
from authenticator import authenticator
from main import app


client = TestClient(app)


class EmptyStickyQueries:
    def get_stickies(self):
        return []


def account_override():
    return {
        "id": "1",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test"
    }


def test_get_all_stickies():
    app.dependency_overrides[StickyQueries] = EmptyStickyQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    response = client.get("/sticky")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []

# please run -> python -m pytest tests/test_get_all_stickies.py
