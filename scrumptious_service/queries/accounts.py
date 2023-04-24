from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from queries.pool import client
from bson import ObjectId


db = client["Accounts"]
collection = db["accounts"]

collection.create_index("email", unique=True)


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, email: str) -> AccountOutWithPassword:
        props = collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(self,
               info: AccountIn,
               hashed_password: str) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        try:
            collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def get_all_accounts(self):
        results = list(collection.find())
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
            del result["password"]
            del result["hashed_password"]
        sorted_results = sorted(
            results,
            key=lambda x: (x["last_name"], x["first_name"])
            )
        if sorted_results:
            return sorted_results

    def delete_account(self, account_id):
        result = collection.delete_one({"_id": ObjectId(account_id)})
        if result.deleted_count:
            return "The account is deleted."
        else:
            return "The account does not exist."
