# import mongomock
# from queries.accounts import AccountQueries, AccountIn

# client = mongomock.MongoClient()
# account_queries = AccountQueries()


# def test_get_all_accounts():
#     account_in = AccountIn(
#         email="test1772D501gpp@test.com",
#         password="testpassword",
#         first_name="John",
#         last_name="Doe",
#     )
#     hashed_password = "hashed_testpassword"

#     db_name = "test_db"
#     collection_name = "accounts"
#     collection = client[db_name][collection_name]

#     collection.delete_many({})

#     created_account = account_queries.create(account_in, hashed_password)

#     accounts = account_queries.get_all_accounts()
#     assert any(
#         account["email"] == created_account.email for account in accounts
    )


#  Per discussion with James during our presentation, he said it would
#  be best for this test not to run. Kurt has two other tests using
#  from fastapi.testclient import TestClient.

#  This test creates a test account, inserts it into a test collection,
#  and checks that the get_all_accounts method returns a list containing
#  at least one account with the same email as the created account.

#  To pass the test please do the following in the terminal:
#  Cd to "scrumptious_service"
#  Copy and paste "python -m pytest tests/test_get_all_accounts.py"

#  Change the email again if you want to run it multiple times so that it
#  passes, otherwise you will run into a "DuplicateAccountError" error.
