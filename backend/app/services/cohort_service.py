from __future__ import annotations

import json
import re
import time
from typing import Any

from app.data.ecosystem_data import get_ecosystem_data
from app.models.schemas import CohortProposal
from app.services.gemini_service import gemini_service


def _compact_ecosystem(data: dict[str, Any]) -> dict[str, Any]:
    return {
        "mentors": [
            {
                "id": item["id"],
                "name": item["name"],
                "role": item.get("role"),
                "expertise": item.get("expertise", []),
                "currentLoad": item.get("currentLoad"),
                "maxLoad": item.get("maxLoad"),
                "score": item.get("score"),
            }
            for item in data["mentors"]
        ],
        "companies": [
            {
                "id": item["id"],
                "name": item["name"],
                "stage": item.get("stage"),
                "industry": item.get("industry"),
                "needs": item.get("needs", []),
                "score": item.get("score"),
                "compliance": item.get("compliance"),
            }
            for item in data["companies"]
        ],
        "partners": [
            {
                "id": item["id"],
                "name": item["name"],
                "expertise": item.get("expertise", []),
                "score": item.get("score"),
            }
            for item in data["partners"]
        ],
        "serviceProviders": [
            {
                "id": item["id"],
                "name": item["name"],
                "expertise": item.get("expertise", []),
                "status": item.get("status"),
                "score": item.get("score"),
            }
            for item in data["serviceProviders"]
        ],
    }


def _strip_code_fence(text: str) -> str:
    match = re.search(r"```(?:json)?\s*(.*?)```", text, flags=re.DOTALL)
    return match.group(1).strip() if match else text.strip()


def _fallback_cohort() -> CohortProposal:
    return CohortProposal(
        id=f"cohort_ai_{int(time.time())}",
        name="Deep Tech Compliance Sprint",
        suggestedMentors=["m2", "m4"],
        suggestedCompanies=["c6", "c8"],
        suggestedPartners=["p_1"],
        suggestedProviders=["sp_1"],
        logic=(
            "Pairs Aerodyne and Dropee with AI/cloud mentorship, AWS startup "
            "infrastructure, and LawLogic compliance support to resolve scaling "
            "and regulatory readiness gaps."
        ),
        status="PENDING",
    )


def _validate_ids(proposal: CohortProposal, data: dict[str, Any]) -> CohortProposal:
    valid_mentors = {item["id"] for item in data["mentors"]}
    valid_companies = {item["id"] for item in data["companies"]}
    valid_partners = {item["id"] for item in data["partners"]}
    valid_providers = {item["id"] for item in data["serviceProviders"]}

    proposal.suggestedMentors = [item for item in proposal.suggestedMentors if item in valid_mentors][:3]
    proposal.suggestedCompanies = [item for item in proposal.suggestedCompanies if item in valid_companies][:3]
    proposal.suggestedPartners = [item for item in proposal.suggestedPartners if item in valid_partners][:2]
    proposal.suggestedProviders = [item for item in proposal.suggestedProviders if item in valid_providers][:2]

    if not proposal.suggestedMentors or not proposal.suggestedCompanies:
        return _fallback_cohort()
    return proposal


async def generate_cohort(focus: str | None = None) -> tuple[CohortProposal, str]:
    data = get_ecosystem_data()
    compact_data = _compact_ecosystem(data)

    if not gemini_service.is_configured:
        return _fallback_cohort(), "fallback"

    system_instruction = (
        "You are Syncra Intelligence, an ecosystem coordination AI for a "
        "programme administrator. Generate one high-quality cohort proposal "
        "using only the provided entity IDs. Return JSON only. No markdown."
    )
    message = (
        "Create one cohort proposal for startup scaling. "
        f"Optional focus: {focus or 'best strategic fit'}. "
        "The JSON must exactly contain: id, name, suggestedMentors, "
        "suggestedCompanies, suggestedPartners, suggestedProviders, logic, status. "
        "status must be PENDING. Use concise executive language. "
        f"Ecosystem data: {json.dumps(compact_data)}"
    )

    try:
        text = await gemini_service.generate(
            system_instruction=system_instruction,
            message=message,
            temperature=0.25,
        )
        raw = json.loads(_strip_code_fence(text))
        raw["id"] = raw.get("id") or f"cohort_ai_{int(time.time())}"
        raw["status"] = "PENDING"
        proposal = CohortProposal(**raw)
        return _validate_ids(proposal, data), "gemini"
    except Exception:
        return _fallback_cohort(), "fallback"
