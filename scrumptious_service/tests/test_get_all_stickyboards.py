from fastapi.testclient import TestClient
from main import app
from queries.stickyboard import StickyBoardQueries
from authenticator import authenticator

client = TestClient(app)


class EmptyStickyBoardQueries:
    def get_stickyboards(self):
        return []


def account_override():
    return {
        "id": "1",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test",
    }


def test_get_all_stickyboards():
    app.dependency_overrides[StickyBoardQueries] = EmptyStickyBoardQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    response = client.get("/stickyboard")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
