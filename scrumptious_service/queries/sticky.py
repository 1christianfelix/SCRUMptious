from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from queries.pool import client
from bson import ObjectId
from queries.send_email import send_email

db = client["Scrumptious"]
collection = db["Sticky"]


class Sticky(BaseModel):
    subject: str
    content: Optional[str]
    priority: int
    category: str
    start_date: datetime
    deadline: datetime
    account: list[str]
    stickyboard: str


class CreateSticky(BaseModel):
    subject: str
    content: Optional[str]
    priority: int
    category: str
    start_date: datetime
    deadline: datetime
    account: list[str]
    append: Optional[bool] = False

class UpdateSticky(BaseModel):
    subject: Optional[str]
    content: Optional[str]
    priority: Optional[int]
    category: Optional[str]
    start_date: Optional[datetime]
    deadline: Optional[datetime]
    account: Optional[list[str]]
    stickyboard: Optional[str]





class StickyQueries:
    def get_sticky_by_id(self, sticky_id):
        result = collection.find_one({"_id": ObjectId(sticky_id)})
        if result:
            result["id"] = str(result["_id"])
            del result["_id"]
            return result

    # Creating sticky moved to queries.stickyboard

    # def create_sticky(self, sticky):
    #     result = collection.insert_one(sticky.dict())
    #     if result.inserted_id:
    #         return self.get_sticky_by_id(result.inserted_id)

    def get_stickies(self):
        results = list(collection.find())
        print("results: ", results)
        for result in results:
            result["id"] = str(result["_id"])
            del result["_id"]
        if results:
            return results


    def update_sticky(self, sticky_id, sticky):
        sticky_id = ObjectId(sticky_id)
        original_sticky = collection.find_one({"_id": ObjectId(sticky_id)})
        result = collection.update_one(
            {"_id": sticky_id},
            {"$set": sticky.dict(exclude_unset=True)}
        )
        if result.modified_count:
            updated_sticky = collection.find_one({"_id": ObjectId(sticky_id)})
            if updated_sticky["category"] != original_sticky["category"]:
                stickyboard = db["StickyBoard"].find_one({"_id": ObjectId(updated_sticky["stickyboard"])})
                category_list_for_removal = stickyboard[original_sticky["category"]]
                category_list_for_removal.remove(str(updated_sticky["_id"]))
                category_list_for_appending = stickyboard[updated_sticky["category"]]
                category_list_for_appending.append(str(updated_sticky["_id"]))
                db["StickyBoard"].update_one(
                    {"_id": ObjectId(updated_sticky["stickyboard"])},
                    {"$set": {updated_sticky["category"]: category_list_for_appending,
                              original_sticky["category"]: category_list_for_removal}}
                )
            return self.get_sticky_by_id(sticky_id)


    def delete_sticky(self, sticky_id):
        sticky_id = ObjectId(sticky_id)
        sticky = collection.find_one({"_id": ObjectId(sticky_id)})
        result = collection.delete_one({"_id": sticky_id})
        if result.deleted_count:
            stickyboard = db["StickyBoard"].find_one({"_id": ObjectId(sticky["stickyboard"])})
            category_list_for_removal = stickyboard[sticky["category"]]
            category_list_for_removal.remove(str(sticky["_id"]))
            db["StickyBoard"].update_one(
                {"_id": ObjectId(sticky["stickyboard"])},
                {"$set": {sticky["category"]: category_list_for_removal}})
            return {"message": "Sticky deleted successfully"}
        else:
            return {"message": "Sticky not found"}
