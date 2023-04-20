import mongomock
from queries.accounts import AccountQueries, AccountIn, AccountOutWithPassword, DuplicateAccountError
from fastapi.testclient import TestClient
from pymongo.errors import DuplicateKeyError

client = mongomock.MongoClient()
account_queries = AccountQueries()

def test_get_all_accounts():
    account_in = AccountIn(email="test7778Dp@test.com", password="testpassword", first_name="John", last_name="Doe")
    hashed_password = "hashed_testpassword"

    # Get a handle to the accounts collection
    db_name = "test_db"
    collection_name = "accounts"
    collection = client[db_name][collection_name]

    # Delete all existing accounts
    collection.delete_many({})

    # Create the new account
    created_account = account_queries.create(account_in, hashed_password)

    # Test that the account was created successfully
    accounts = account_queries.get_all_accounts()
    assert any(account["email"] == created_account.email for account in accounts)






#  To pass the test please do the following in the terminal:
#  Cd to "scrumptious_service"
#  Input "python -m pytest tests/test_get_all_accounts.py"

#  Change the email again if you want to run it multiple times so that it passes,
#  otherwise you will run into an error.
