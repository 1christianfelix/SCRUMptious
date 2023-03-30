from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from queries.pool import client



db = client["User"]
collection = db["User"]


class User(BaseModel):
    name: str


class UserQueries:
    def create_user(self, user):
        result = collection.insert_one(user.dict())
        if result.inserted_id:
            return True
