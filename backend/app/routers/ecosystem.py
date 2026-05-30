from fastapi import APIRouter

from app.data.ecosystem_data import get_ecosystem_data, get_mentors, get_resources
from app.models.schemas import EcosystemResponse

router = APIRouter()


@router.get("/ecosystem", response_model=EcosystemResponse)
def read_ecosystem() -> dict:
    return get_ecosystem_data()


@router.get("/mentors")
def read_mentors() -> list[dict]:
    return get_mentors()


@router.get("/resources")
def read_resources() -> list[dict]:
    return get_resources()
