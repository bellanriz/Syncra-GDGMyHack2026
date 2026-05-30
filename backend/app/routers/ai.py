from fastapi import APIRouter

from app.models.schemas import (
    AiChatRequest,
    AiChatResponse,
    CohortGenerationRequest,
    CohortGenerationResponse,
    ScoreJustificationRequest,
    ScoreJustificationResponse,
)
from app.services.chat_service import answer_chat
from app.services.cohort_service import generate_cohort
from app.services.score_service import justify_score

router = APIRouter()
legacy_router = APIRouter()


@router.post("/chat", response_model=AiChatResponse)
async def chat(request: AiChatRequest) -> AiChatResponse:
    text = await answer_chat(request.message, request.history, request.role)
    return AiChatResponse(text=text)


@router.post("/generate-cohort", response_model=CohortGenerationResponse)
async def create_cohort(request: CohortGenerationRequest) -> CohortGenerationResponse:
    proposal, source = await generate_cohort(request.focus)
    return CohortGenerationResponse(proposal=proposal, source=source)


@legacy_router.post("/agent", response_model=AiChatResponse)
async def legacy_agent(request: AiChatRequest) -> AiChatResponse:
    text = await answer_chat(request.message, request.history, request.role)
    return AiChatResponse(text=text)


@router.post("/justify-score", response_model=ScoreJustificationResponse)
async def get_score_justification(request: ScoreJustificationRequest) -> ScoreJustificationResponse:
    result = await justify_score(request.member)
    return ScoreJustificationResponse(score=result["score"], justification=result["justification"])
