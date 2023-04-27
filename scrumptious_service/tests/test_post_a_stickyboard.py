from fastapi.testclient import TestClient
from queries.stickyboard import StickyBoardQueries
from main import app
from authenticator import authenticator


client = TestClient(app)


class CreateStickyBoardQueries:
    def create_stickyboard(self, stickyboard):
        result = {"id": "1"}
        result.update(stickyboard)
        return result


def account_override():
    return {
        "id": "1",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test",
    }


def test_post_a_stickyboard():
    app.dependency_overrides[StickyBoardQueries] = CreateStickyBoardQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    stickyboard_input_data = {
        "board_name": "Test Stickyboard",
        "description": "Test Description",
        "priority": 1,
        "start_date": "2023-04-20T12:00:00+00:00",
        "deadline": "2023-04-30T12:00:00+00:00",
        "account": [],
        "backlog": [],
        "todo": [],
        "doing": [],
        "review": [],
        "done": [],
    }
    expected_stickyboard_data = {
        "id": "1",
        "board_name": "Test Stickyboard",
        "description": "Test Description",
        "priority": 1,
        "start_date": "2023-04-20T12:00:00+00:00",
        "deadline": "2023-04-30T12:00:00+00:00",
        "account": [],
        "backlog": [],
        "todo": [],
        "doing": [],
        "review": [],
        "done": [],
    }
    response = client.post("/stickyboard", json=stickyboard_input_data)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected_stickyboard_data
