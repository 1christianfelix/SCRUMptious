from fastapi.testclient import TestClient
from main import app
from queries.stickyboard import StickyBoardQueries
from authenticator import authenticator

from queries.stickyboard import StickyBoard

client = TestClient(app)


class TestStickyBoardQueries(StickyBoardQueries):
    def create_stickyboard(self, stickyboard: StickyBoard):
        return {
            "id": "test_id",
            "board_name": stickyboard.board_name,
            "description": stickyboard.description,
            "priority": stickyboard.priority,
            "start_date": stickyboard.start_date,
            "deadline": stickyboard.deadline,
            "account": stickyboard.account,
            "backlog": stickyboard.backlog,
            "todo": stickyboard.todo,
            "doing": stickyboard.doing,
            "review": stickyboard.review,
            "done": stickyboard.done,
        }

    def delete_stickyboard(self, stickyboard_id: str):
        if stickyboard_id == "test_id":
            return {"detail": "StickyBoard deleted successfully"}
        else:
            return None


def account_override():
    return {
        "id": "1",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test",
    }


def test_create_stickyboard():
    app.dependency_overrides[StickyBoardQueries] = TestStickyBoardQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    sample_stickyboard = {
        "board_name": "Test Board",
        "description": "Test Description",
        "priority": 1,
        "start_date": "2023-04-26T00:00:00",
        "deadline": "2023-05-26T00:00:00",
        "account": ["1"],
        "backlog": [],
        "todo": [],
        "doing": [],
        "review": [],
        "done": [],
    }
    response = client.post("/stickyboard", json=sample_stickyboard)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "id": "test_id",
        **sample_stickyboard,
    }


def test_delete_stickyboard():
    app.dependency_overrides[StickyBoardQueries] = TestStickyBoardQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override

    response = client.delete("/stickyboard/test_id")
    assert response.status_code == 200
    assert response.json() == {"detail": "StickyBoard deleted successfully"}

    response = client.delete("/stickyboard/non_existent_id")
    assert response.status_code == 200
    assert response.json() is None  # Expecting None as the response body

    app.dependency_overrides = {}


#  This tests the deletion of a StickyBoard object, but in order to test the
#  functionality, a StickyBoard object needs to be created first.

#  To pass the test please do the following within Docker:
#  Copy and paste "python -m pytest tests/test_delete_stickyboard.py"
#  This particular test will ONLY pass in Docker in container fastapi-1
