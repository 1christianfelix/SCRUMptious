from fastapi import APIRouter, Depends
from authenticator import authenticator
from queries.stickyboard import StickyBoard, StickyBoardQueries


router = APIRouter()


@router.post("/stickyboard")
def create_stickyboard(
    sticky: StickyBoard, queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.create_stickyboard(sticky)


@router.get("/stickyboard")
def get_stickyboards(queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    return queries.get_stickyboards()

@router.get("/stickyboard/{stickyboard_id}")
def get_stickyboard_by_id(stickyboard_id: str, queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    return queries.get_stickyboard_by_id(stickyboard_id)


@router.get("/stickyboard/{stickyboard_id}/sticky")
def get_stickyboard_stickies(
    stickyboard_id: str, queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.get_stickyboard_stickies(stickyboard_id)


@router.put("/stickyboard/{stickyboard_id}")
def update_stickyboard(
    stickyboard_id: str,
    stickyboard: StickyBoard,
    queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_sticky(stickyboard_id, stickyboard)


@router.delete("/stickyboard/{stickyboard_id}")
def delete_stickyboard(
    stickyboard_id: str,
    queries: StickyBoardQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.delete_stickyboard(stickyboard_id)
