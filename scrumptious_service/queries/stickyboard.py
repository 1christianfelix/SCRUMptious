from pydantic import BaseModel
from datetime import datetime
from queries.pool import client
from bson import ObjectId
from queries.sticky import Sticky
from typing import Optional


db = client["Scrumptious"]
collection = db["StickyBoard"]


class StickyBoard(BaseModel):
    board_name: str
    priority: int
    start_date: datetime
    deadline: datetime
    account: list[str]
    backlog: list[str]
    todo: list[str]
    doing: list[str]
    review: list[str]
    done: list[str]


class StickyBoardUpdate(BaseModel):
    board_name: Optional[str]
    priority: Optional[int]
    start_date: Optional[datetime]
    deadline: Optional[datetime]
    account: Optional[list[str]]
    backlog: Optional[list[str]]
    todo: Optional[list[str]]
    doing: Optional[list[str]]
    review: Optional[list[str]]
    done: Optional[list[str]]


class StickyBoardQueries:
    def get_stickyboard_by_id(self, stickyboard_id):
        result = collection.find_one({"_id": ObjectId(stickyboard_id)})
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
        results = list(db["Sticky"].find({"stickyBoard": stickyboard_id}))
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results

    def update_stickyboard(self, stickyboard_id, stickyboard):
        update_result = collection.update_one(
            {"_id": ObjectId(stickyboard_id)}, {"$set": stickyboard.dict(exclude_unset=True)}
        )
        if update_result.modified_count > 0:
            return self.get_stickyboard_by_id(stickyboard_id)

    def delete_stickyboard(self, stickyboard_id):
        result = collection.delete_one({"_id": ObjectId(stickyboard_id)})
        if result.deleted_count:
            return "The stickyboard is deleted."
        else:
            return "The stickyboard does not exist."

    def create_sticky(self, stickyboard_id, sticky) -> Sticky:
        props = sticky.dict()
        props['stickyboard'] = stickyboard_id
        db["Sticky"].insert_one(props)
        stickyboard = collection.find_one({"_id": ObjectId(props["stickyboard"])})
        category_list = stickyboard[props["initial_category"]]
        category_list.append(str(props["_id"]))
        collection.update_one(
            {"_id": ObjectId(props["stickyboard"])},
            {"$set": {props["initial_category"]: category_list}}
        )
        return(Sticky(**props))
