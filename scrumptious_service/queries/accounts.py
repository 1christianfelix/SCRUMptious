from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from queries.pool import client



db = client["Accounts"]
collection = db["accounts"]


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

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        try:
            collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)
