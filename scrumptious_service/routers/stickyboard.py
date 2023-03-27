from fastapi import APIRouter, Depends
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import os
import pymongo


router = APIRouter()


client = pymongo.MongoClient(os.environ.get('MONGO_URL'))
db = client['Scrumptious']
collection = db['StickyBoard']


class StickyBoard(BaseModel):
    board_name: str
    priority: int
    start_date: datetime
    deadline: datetime
    user_member: Optional[str]


class StickyBoardQueries:
    def get_stickyboard_by_id(self, stickyboard_id):
        result = collection.find_one({ '_id': stickyboard_id })
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
        results = list(db['Sticky'].find({ "stickyboard": stickyboard_id }))
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def update_stickyboard(self, stickyboard_id, stickyboard):
        pass

    def delete_stickyboard(self, stickyboard_id):
        result = collection.delete_one({ '_id': stickyboard_id })
        if result:
            return True

@router.post("/stickyboard")
def create_stickyboard(
    sticky: StickyBoard,
    queries: StickyBoardQueries = Depends()
):
    return queries.create_stickyboard(sticky)


@router.get("/stickyboard")
def get_stickyboards(
    queries: StickyBoardQueries = Depends()
):
    return queries.get_stickyboards()


@router.get("/stickyboard/{stickyboard_id}/sticky")
def get_stickyboard_stickies(
    stickyboard_id: str,
    queries: StickyBoardQueries = Depends()
):
    return queries.get_stickyboard_stickies(stickyboard_id)


@router.put("/stickyboard/{stickyboard_id}")
def udpate_stickyboard(
    stickyboard_id: str,
    stickyboard: StickyBoard,
    queries: StickyBoardQueries = Depends()
):
    return queries.update_sticky(stickyboard_id, stickyboard)


@router.delete("/stickyboard/{stickyboard_id}")
def delete_stickyboard(
    stickyboard_id: str,
    queries: StickyBoardQueries = Depends()
):
    return queries.delete_stickyboard(stickyboard_id)
