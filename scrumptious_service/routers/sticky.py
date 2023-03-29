from fastapi import APIRouter, Depends
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import os
import pymongo


router = APIRouter()


client = pymongo.MongoClient(os.environ.get("MONGO_URL"))
db = client["Scrumptious"]
collection = db["Sticky"]


class Sticky(BaseModel):
    subject: str
    content: Optional[str]
    priority: int
    status: str
    startDate: datetime
    deadline: datetime
    user: str
    stickyBoard: str


class StickyUpdate(BaseModel):
    subject: Optional[str]
    content: Optional[str]
    priority: Optional[int]
    status: Optional[str]
    startDate: Optional[datetime]
    deadline: Optional[datetime]
    user: Optional[str]
    stickyboard: Optional[str]


class StickyQueries:
    def get_sticky_by_id(self, sticky_id):
        result = collection.find_one({"_id": sticky_id})
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
        pass

    def delete_sticky(self, sticky_id):
        result = collection.delete_one({"_id": sticky_id})
        if result:
            return True


@router.post("/sticky")
def create_sticky(sticky: Sticky, queries: StickyQueries = Depends()):
    return queries.create_sticky(sticky)


@router.get("/sticky")
def get_stickies(queries: StickyQueries = Depends()):
    return queries.get_stickies()


@router.put("/sticky/{sticky_id}")
def udpate_sticky(
    sticky_id: str, sticky: Sticky, queries: StickyQueries = Depends()
):
    return queries.update_sticky(sticky_id, sticky)


@router.delete("/sticky/{sticky_id}")
def delete_sticky(sticky_id: str, queries: StickyQueries = Depends()):
    return queries.delete_sticky(sticky_id)
