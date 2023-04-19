from fastapi import APIRouter, Depends, Path
from authenticator import authenticator
from queries.sticky import Sticky, CreateSticky, StickyQueries
from queries.stickyboard import StickyBoardQueries

router = APIRouter()


@router.post("/{stickyboard_id}/sticky", tags=["Sticky"])
def create_sticky(sticky: CreateSticky, stickyboard_id: str = Path(..., title="The ID of the sticky board"), queries: StickyBoardQueries = Depends(),
                #   account_data: dict = Depends(authenticator.get_current_account_data)
                  ):
    return queries.create_sticky(stickyboard_id, sticky)


@router.get("/sticky", tags=["Sticky"])
def get_stickies(queries: StickyQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    return queries.get_stickies()

@router.get("/{stickyboard_id}/stickies", tags=["Stickyboard"])
def get_stickies_data(stickyboard_id: str = Path(..., title="The ID of the sticky board"), queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    return queries.get_stickies_data(stickyboard_id)


@router.put("/sticky/{sticky_id}", tags=["Sticky"])
def update_sticky(
    sticky_id: str, sticky: Sticky, queries: StickyQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_sticky(sticky_id, sticky)


@router.delete("/sticky/{sticky_id}", tags=["Sticky"])
def delete_sticky(sticky_id: str, queries: StickyQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    return queries.delete_sticky(sticky_id)
