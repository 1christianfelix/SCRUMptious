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



# from typing import Optional
# from pydantic import BaseModel
# from datetime import datetime
# from queries.pool import client
# from bson import ObjectId

# db = client["Users"]
# collection =db["User1"]


# class DuplicateAccountError(ValueError):
#     pass


# class AccountIn(BaseModel):
#     email: str
#     # username: str
#     password: str
#     first_name: str
#     last_name: str
#     auth_token: str

# class AccountOut(BaseModel):
#     id: str
#     email: str
#     # username: str
#     first_name: str
#     last_name: str

# class AccountOutWithPassword(AccountOut):
#     hashed_password: str

# class AccountQueries:
#     # def get_user_by_id(self, user_id):
#     #     result = collection.find_one({"_id": ObjectId(user_id)})
#     #     if result:
#     #         result["id"] = str(result["_id"])
#     #         del result["_id"]
#     #         return User(**result)

#     def create(self, info: AccountIn, hashed_password: str):
#         result = collection.insert_one(info.dict(), hashed_password)
#         if result.inserted_id:
#             return True

#     # def get_all_users(self):
#     #     results = collection.find({})
#     #     if results:
#     #         users = [User(**result) for result in results]
#     #         return users

#     #     #     result["id"] = str(result["_id"])
#     #     #     del result["_id"]
#     #     # if results:
#     #     #     return results

#     # def update_user(self, user_id, user):
#     #     user_id = ObjectId(user_id)
#     #     result = collection.update_one(
#     #         {"_id": user_id},
#     #         {"$set": user.dict(exclude_unset=True)}
#     #     )
#     #     if result.modified_count:
#     #         return self.get_user_by_id(user_id)


#     # def delete_user(self, user_id):
#     #     result = collection.delete_one({"_id": ObjectId(user_id)})
#     #     if result:
#     #         return True
#     #     else:
#     #         return False
