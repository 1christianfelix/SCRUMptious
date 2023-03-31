from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from queries.pool import db
from bson import ObjectId

collection =db["User"]


class User(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str
    auth_token: str


class UserQueries:
    def get_user_by_id(self, user_id):
        result = collection.find_one({"_id": ObjectId(user_id)})
        if result:
            result["id"] = str(result["_id"])
            del result["_id"]
            return User(**result)

    def create_user(self, user):
        result = collection.insert_one(user.dict())
        if result.inserted_id:
            return self.get_user_by_id(result.inserted_id)

    def get_users(self):
        results = list(collection.find())
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def update_user(self, user_id, user):
        user_id = ObjectId(user_id)
        result = collection.update_one(
            {"_id": user_id},
            {"$set": user.dict(exclude_unset=True)}
        )
        if result.modified_count:
            return self.get_user_by_id(user_id)


    def delete_user(self, user_id):
        result = collection.delete_one({"_id": ObjectId(user_id)})
        if result:
            return True
        else:
            return False
