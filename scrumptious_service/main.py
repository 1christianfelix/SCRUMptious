from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import sticky, stickyboard, accounts
from authenticator import authenticator

tags_metadata = [
    {
        "name": "Stickyboard",
        "description": "Stickyboard endpoints",
    },
    {
        "name": "Sticky",
        "description": "Sticky endpoints",
    },
    {
        "name": "Account",
        "description": "Account endpoints",
    },
]

app = FastAPI(openapi_tags=tags_metadata)
app.include_router(sticky.router)
app.include_router(stickyboard.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000" )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }
