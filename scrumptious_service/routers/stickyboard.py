from fastapi import APIRouter, Depends
from authenticator import authenticator
from queries.stickyboard import StickyBoard, StickyBoardQueries
from queries.stickyboard import StickyBoardUpdate

router = APIRouter()

tags_metadata = [
    {
        "name": "Stickyboard",
        "description": "Stickyboard endpoints",
    }
]


@router.post("/stickyboard", tags=["Stickyboard"])
def create_stickyboard(
    sticky: StickyBoard,
    queries: StickyBoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.create_stickyboard(sticky)


@router.get("/stickyboard", tags=["Stickyboard"])
def get_stickyboards(queries: StickyBoardQueries = Depends(),
                     account_data: dict = Depends(
                        authenticator.get_current_account_data
                     )
                     ):
    return queries.get_stickyboards()


@router.get("/stickyboard/{stickyboard_id}", tags=["Stickyboard"])
def get_stickyboard_by_id(stickyboard_id: str,
                          queries: StickyBoardQueries = Depends(),
                          account_data: dict = Depends(
                            authenticator.get_current_account_data
                            )
                          ):
    return queries.get_stickyboard_by_id(stickyboard_id)


@router.get("/stickyboard/{stickyboard_id}/sticky", tags=["Stickyboard"])
def get_stickyboard_stickies(
    stickyboard_id: str,
    queries: StickyBoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.get_stickyboard_stickies(stickyboard_id)


@router.put("/stickyboard/{stickyboard_id}", tags=["Stickyboard"])
def update_stickyboard(
    stickyboard_id: str,
    stickyboard: StickyBoardUpdate,
    queries: StickyBoardQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update_stickyboard(stickyboard_id, stickyboard)


@router.delete("/stickyboard/{stickyboard_id}", tags=["Stickyboard"])
def delete_stickyboard(
    stickyboard_id: str,
    queries: StickyBoardQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return queries.delete_stickyboard(stickyboard_id)
