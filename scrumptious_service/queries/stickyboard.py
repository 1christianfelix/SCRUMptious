from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from queries.pool import db

collection = db["StickyBoard"]


class StickyBoard(BaseModel):
    boardName: str
    priority: int
    startDate: datetime
    deadline: datetime
    user: Optional[str]


class StickyBoardUpdate(BaseModel):
    boardName: Optional[str]
    priority: Optional[int]
    startDate: Optional[datetime]
    deadline: Optional[datetime]
    user: Optional[str]


class StickyBoardQueries:
    def get_stickyboard_by_id(self, stickyboard_id):
        result = collection.find_one({"_id": stickyboard_id})
        if result:
            result["id"] = str(result["_id"])
            del result["_id"]
            return result

    def create_stickyboard(self, stickyboard):
        result = collection.insert_one(stickyboard.dict())
        if result.inserted_id:
            return self.get_stickyboard_by_id(result.inserted_id)

    def get_stickyboards(self):
        results = list(collection.find())
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def get_stickyboard_stickies(self, stickyboard_id):
        results = list(collection.find({"stickyboard": stickyboard_id}))
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def update_stickyboard(self, stickyboard_id, stickyboard):
        pass

    def delete_stickyboard(self, stickyboard_id):
        result = collection.delete_one({"_id": stickyboard_id})
        if result:
            return True
