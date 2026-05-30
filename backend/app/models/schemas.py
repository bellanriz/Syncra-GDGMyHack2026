from typing import Any, Literal

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str
    content: str


class AiChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: list[ChatMessage] = Field(default_factory=list)
    role: str | None = None


class AiChatResponse(BaseModel):
    text: str


class CohortGenerationRequest(BaseModel):
    focus: str | None = None


class CohortProposal(BaseModel):
    id: str
    name: str
    suggestedMentors: list[str]
    suggestedCompanies: list[str]
    suggestedPartners: list[str]
    suggestedProviders: list[str]
    logic: str
    status: Literal["PENDING", "APPROVED", "DISMISSED"] = "PENDING"


class CohortGenerationResponse(BaseModel):
    proposal: CohortProposal
    source: Literal["gemini", "fallback"]


class EcosystemResponse(BaseModel):
    mentors: list[dict[str, Any]]
    companies: list[dict[str, Any]]
    partners: list[dict[str, Any]]
    serviceProviders: list[dict[str, Any]]
    programs: list[dict[str, Any]]
    linkages: list[dict[str, Any]]
    proposals: list[dict[str, Any]]
    analystInsights: list[dict[str, Any]] | None = None


class ScoreJustificationRequest(BaseModel):
    member: dict[str, Any] = Field(..., description="The ecosystem member data")


class ScoreJustificationResponse(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Ecosystem value score as percentage")
    justification: str = Field(..., description="One-line AI explanation for the score")
