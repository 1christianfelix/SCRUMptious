from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError

from .client import Queries



class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    # username: str
    password: str
    first_name: str
    last_name: str

class AccountOut(BaseModel):
    id: str
    email: str
    # username: str
    first_name: str
    last_name: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str



class AccountQueries(Queries):
    DB_NAME = "Accounts"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        print(props)
        return AccountOutWithPassword(**props)


