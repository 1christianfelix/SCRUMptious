from fastapi import APIRouter, Depends
from queries.stickyboard import StickyBoard, StickyBoardQueries
from queries.pool import db

router = APIRouter()


@router.post("/stickyboard")
def create_stickyboard(
    sticky: StickyBoard, queries: StickyBoardQueries = Depends()
):
    return queries.create_stickyboard(sticky)


@router.get("/stickyboard")
def get_stickyboards(queries: StickyBoardQueries = Depends()):
    return queries.get_stickyboards()


@router.get("/stickyboard/{stickyboard_id}/sticky")
def get_stickyboard_stickies(
    stickyboard_id: str, queries: StickyBoardQueries = Depends()
):
    return queries.get_stickyboard_stickies(stickyboard_id)


@router.put("/stickyboard/{stickyboard_id}")
def udpate_stickyboard(
    stickyboard_id: str,
    stickyboard: StickyBoard,
    queries: StickyBoardQueries = Depends(),
):
    return queries.update_sticky(stickyboard_id, stickyboard)


@router.delete("/stickyboard/{stickyboard_id}")
def delete_stickyboard(
    stickyboard_id: str, queries: StickyBoardQueries = Depends()
):
    return queries.delete_stickyboard(stickyboard_id)
