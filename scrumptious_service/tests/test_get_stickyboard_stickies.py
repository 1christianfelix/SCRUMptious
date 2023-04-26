from fastapi.testclient import TestClient
from main import app
from queries.stickyboard import StickyBoardQueries
from authenticator import authenticator

client = TestClient(app)





class GetStickiesFromStickyBoardQueries:
     def get_stickyboard_stickies(self,stickyboard_id):
          sticky_note = {
              "subject": "f",
              "content": "f",
              "priority": 2,
              "category": "done",
              "start_date": "2023-04-11T07:00:00",
              "deadline": "2023-04-10T07:00:00",
              "account": [],
              "append": False,
              "stickyboard": stickyboard_id,
              "id": "6447771e53ecaa2913b42f9c"
           }
          stickyboard_categories ={
                      "backlog": [],
                      "todo": [],
                      "review": [],
                      "doing": [],
                      "done": []
                    }
          stickyboard_categories[sticky_note["category"]].append(sticky_note)
          return stickyboard_categories

def account_override():
    return {
        "id": "1",
        "email": "test@test.com",
        "first_name": "test",
        "last_name": "test"
    }

def test_get_stickyboard_stickies():
    app.dependency_overrides[StickyBoardQueries] = GetStickiesFromStickyBoardQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    stickyboard_id = "6447770a53ecaa2913b42f9b"
    response = client.get(f"/stickyboard/{stickyboard_id}/sticky")
    app.dependency_overrides = {}
    expected = {
                      "backlog": [],
                      "todo": [],
                      "review": [],
                      "doing": [],
                      "done": [
                        {
                          "subject": "f",
                          "content": "f",
                          "priority": 2,
                          "category": "done",
                          "start_date": "2023-04-11T07:00:00",
                          "deadline": "2023-04-10T07:00:00",
                          "account": [],
                          "append": False,
                          "stickyboard": stickyboard_id,
                          "id": "6447771e53ecaa2913b42f9c"
                        }
                      ]
                    }
    assert response.status_code == 200
    assert response.json() == expected
