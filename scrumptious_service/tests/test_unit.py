# from fastapi.testclient import TestClient
# from main import app
# from queries.sticky import StickyQueries
# from authenticator import authenticator


# client = TestClient(app)


# class EmptyStickyQueries:
#     def get_stickies(self):
#         return []


# def account_override():
#     return {
#         "id": "1",
#         "email": "test@test.com",
#         "first_name": "test",
#         "last_name": "test"
#     }


# def test_get_all_stickies():
#     app.dependency_overrides[StickyQueries] = EmptyStickyQueries
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = account_override
#     response = client.get("/{stickyboard_id}/sticky")
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == []
