# from unittest.mock import patch, MagicMock
# from queries.sticky import Sticky, CreateSticky
# from queries.stickyboard import StickyBoardQueries
# from datetime import datetime
# import pytest


# @pytest.fixture
# def mock_sticky_board_queries():
#     with patch("queries.sticky.client") as mock_client:
#         yield StickyBoardQueries()


# def test_create_sticky(mock_sticky_board_queries):
#     # Arrange
#     mock_stickyboard_id = "mock_stickyboard_id"
#     mock_stickyboard = {"id": mock_stickyboard_id}
#     mock_sticky = Sticky(
#         subject="Test Sticky",
#         content="Test Content",
#         priority=1,
#         category="backlog",
#         start_date=datetime.utcnow(),
#         deadline=datetime.utcnow(),
#         account=["mock_account_id"],
#         stickyboard=mock_stickyboard_id,
#     )
#     mock_create_sticky = CreateSticky(
#         subject="Test Sticky",
#         content="Test Content",
#         priority=1,
#         category="backlog",
#         start_date=datetime.utcnow(),
#         deadline=datetime.utcnow(),
#         account=["mock_account_id"],
#         append=False,
#     )
#     mock_insert_result = MagicMock(inserted_id="mock_inserted_id")
#     mock_stickyboard_result = MagicMock(return_value=mock_stickyboard)
#     mock_find_one_result = MagicMock(return_value={"category": []})
#     mock_update_result = MagicMock(modified_count=1)
#     mock_send_email = MagicMock()

#     mock_collection = MagicMock()
#     mock_collection.insert_one.return_value = mock_insert_result
#     mock_collection.update_one.return_value = mock_update_result
#     mock_client = MagicMock()
#     mock_client.__getitem__.side_effect = lambda coll: mock_collection if coll == "Sticky" else None
#     mock_client.__getitem__("Scrumptious").__setattr__ = lambda attr, value: setattr(mock_collection, attr, value)

#     mock_client["Accounts"]["accounts"].find_one.return_value = {"email": "test@example.com"}

#     mock_sticky_board_queries.get_stickyboard_by_id = mock_stickyboard_result
#     mock_sticky_board_queries.get_stickyboard_stickies = mock_find_one_result
#     mock_sticky_board_queries.get_sticky_by_id = MagicMock()
#     mock_sticky_board_queries.send_email = mock_send_email

#     # Act
#     sticky = mock_sticky_board_queries.create_sticky(mock_stickyboard_id, mock_create_sticky)

#     # Assert
#     mock_collection.insert_one.assert_called_once_with(
#         {
#             "subject": "Test Sticky",
#             "content": "Test Content",
#             "priority": 1,
#             "category": "backlog",
#             "start_date": mock_create_sticky.start_date,
#             "deadline": mock_create_sticky.deadline,
#             "account": ["mock_account_id"],
#             "stickyboard": mock_stickyboard_id,
#         }
#     )
#     mock_collection.update_one.assert_called_once_with(
#         {"_id": "mock_stickyboard_id"},
#         {"$set": {"backlog": ["mock_inserted_id"]}},
#     )
#     mock_send_email.assert_called_once_with(
#         to_emails=["test@example.com"],
#         subject="You were added as a member of a sticky!",
#         content="Please login to check.",
#     )
#     assert sticky.id is not None


# # run python -m pytest tests/test_post_sticky.py
