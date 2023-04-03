from fastapi import APIRouter, Depends, HTTPException
from queries.user import User, UserQueries
from queries.pool import client

router = APIRouter()

user_queries = UserQueries()

#signup
@router.post("/user")
def create_user(user: User):
    created_user = user_queries.create_user(user)
    if created_user:
        return created_user
    else:
        raise HTTPException(status_code=500, detail="Could not create user")


#get fool
@router.get("/user/{user_id}")
def get_user_by_id(user_id: str):
    user = user_queries.get_user_by_id(user_id)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.get("/user")
def get_all_users():
    users = user_queries.get_all_users()
    if users:
        return users
    else:
        raise HTTPException(status_code=404, detail="User not found")

#edit fools
@router.put("/user/{user_id}")
def update_user(user_id: str, user: User):
    updated_user = user_queries.update_user(user_id, user)
    if updated_user:
        return updated_user
    # else:
    #     raise HTTPException(status_code=404, detail="User not found")

#delete fools
# @router.delete("/user/{user_id}")
# def delete_user(
#     user_id: str, user_queries: UserQueries = Depends()
# ):
#     return user_queries.delete_user(user_id)


@router.delete("/user/{user_id}")
def delete_user(user_id: str):
    deleted_user = user_queries.delete_user(user_id)
    if deleted_user:
        return deleted_user
    else:
        raise HTTPException(status_code=404, detail="User not found")




# get user + Sticky
# get user + stickyboard
# get user + sticky + StickyBoard
