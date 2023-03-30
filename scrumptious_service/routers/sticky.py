from fastapi import APIRouter, Depends
from queries.sticky import Sticky, StickyQueries
from queries.pool import db



router = APIRouter()



@router.post("/sticky")
def create_sticky(sticky: Sticky, queries: StickyQueries = Depends()):
    return queries.create_sticky(sticky)


@router.get("/sticky")
def get_stickies(queries: StickyQueries = Depends()):
    return queries.get_stickies()


@router.put("/sticky/{sticky_id}")
def update_sticky(
    sticky_id: str, sticky: Sticky, queries: StickyQueries = Depends()
):
    return queries.update_sticky(sticky_id, sticky)


@router.delete("/sticky/{sticky_id}")
def delete_sticky(sticky_id: str, queries: StickyQueries = Depends()):
    return queries.delete_sticky(sticky_id)
