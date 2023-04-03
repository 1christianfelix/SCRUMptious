from pydantic import BaseModel

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
    DB_NAME = "library"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOutWithPassword:...

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:...


