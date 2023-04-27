# from fastapi.testclient import TestClient
# from main import app
# from pymongo import MongoClient

# client = TestClient(app)
# mongo_client = MongoClient("mongodb://localhost:8081/")
# db = mongo_client["mydatabase"]


# class TestUpdateSticky:
#     def test_update_sticky(self):
#         # Create a sample sticky board
#         stickyboard_id = db.stickyboard.insert_one({"name": "Test Sticky Board"}).inserted_id

#         # Create a sample sticky note
#         sticky = {"title": "Test Sticky", "body": "This is a test.", "board_id": stickyboard_id}
#         sticky_id = db.sticky.insert_one(sticky).inserted_id

#         # Update the sticky note
#         updated_sticky = {"title": "Updated Sticky", "body": "This is an updated test."}
#         response = client.put(f"/sticky/{sticky_id}", json=updated_sticky)

#         # Check that the sticky note was updated
#         assert response.status_code == 200
#         assert response.json()["title"] == "Updated Sticky"
#         assert response.json()["body"] == "This is an updated test."


## run python -m pytest tests/test_update_sticky.py
