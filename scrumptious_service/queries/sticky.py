from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from queries.pool import client
from bson import ObjectId

db = client["Scrumptious"]
collection = db["Sticky"]


class Sticky(BaseModel):
    subject: str
    content: Optional[str]
    priority: int
    category: str
    start_date: datetime
    deadline: datetime
    stickyBoard: str
    account: Optional[str]


class StickyQueries:
    def get_sticky_by_id(self, sticky_id):
        result = collection.find_one({"_id": ObjectId(sticky_id)})
        if result:
            result["id"] = str(result["_id"])
            del result["_id"]
            return result

    def create_sticky(self, sticky):
        result = collection.insert_one(sticky.dict())
        if result.inserted_id:
            return self.get_sticky_by_id(result.inserted_id)

    def get_stickies(self):
        results = list(collection.find())
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def update_sticky(self, sticky_id, sticky):
        sticky_id = ObjectId(sticky_id)
        result = collection.update_one(
            {"_id": sticky_id},
            {"$set": sticky.dict(exclude_unset=True)}
        )
        if result.modified_count:
            return self.get_sticky_by_id(sticky_id)

    def delete_sticky(self, sticky_id):
        pass
