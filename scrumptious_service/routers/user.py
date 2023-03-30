from fastapi import APIRouter, Depends
from queries.user import User, UserQueries


router = APIRouter()


@router.post("/user")
def create_user(user: User, queries: UserQueries = Depends()):
    return queries.create_user(user)
