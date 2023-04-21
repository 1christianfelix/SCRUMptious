import pytest
from queries.accounts import AccountQueries, AccountIn, AccountOutWithPassword, DuplicateAccountError
from pymongo.errors import DuplicateKeyError
import mongomock

client = mongomock.MongoClient()
account_queries = AccountQueries()

def test_create_account():
    account_queries.collection = client["Accounts"]["accounts"]
    account_queries.collection.create_index("email", unique=True)

    account_data = {
        "email": "test1a4FO@example.com",
        "password": "test_password",
        "first_name": "Test",
        "last_name": "User"
    }

    account_in = AccountIn(**account_data)
    hashed_password = "hashed_test_password"
    created_account = account_queries.create(account_in, hashed_password)

    assert created_account.email == account_data["email"]
    assert created_account.first_name == account_data["first_name"]
    assert created_account.last_name == account_data["last_name"]
    assert created_account.hashed_password == hashed_password


    with pytest.raises(DuplicateAccountError):
        account_queries.create(account_in, hashed_password)

#  HOW TO TEST
#  To pass the test please do the following in the terminal:
#  Cd to "scrumptious_service"
#  Input "python -m pytest tests/test_account_queries.py" in the terminal and execute

#  Change the email again if you want to run it multiple times so that it passes,
#  otherwise you will run into a FAILED error.
