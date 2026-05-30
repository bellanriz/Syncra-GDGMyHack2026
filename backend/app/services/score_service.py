from __future__ import annotations

import json
import random
import re
from typing import Any

from app.services.gemini_service import gemini_service


def _compute_fallback_score(member: dict[str, Any]) -> dict[str, str | int]:
    """Deterministic fallback when Gemini is unavailable."""
    score = 70
    reasons = []

    member_type = member.get("type", "")
    expertise = member.get("expertise", [])
    active_work = member.get("activeWork", [])
    compliance = member.get("compliance")
    status = member.get("status", "")

    if len(expertise) >= 3:
        score += 10
        reasons.append("broad expertise coverage")
    elif len(expertise) >= 1:
        score += 5
        reasons.append("focused specialization")

    if active_work:
        score += 8
        reasons.append("active engagements")

    if status == "ACTIVE":
        score += 5
        reasons.append("currently active in ecosystem")

    if compliance:
        compliant_count = sum(
            1
            for v in [compliance.get("ssm"), compliance.get("bnm"), compliance.get("lhdn")]
            if v in ("VERIFIED", "CLEARED", "ACTIVE")
        )
        score += compliant_count * 3
        if compliant_count == 3:
            reasons.append("full regulatory compliance")
        elif compliant_count > 0:
            reasons.append("partial compliance verified")

    # Cap at 100
    score = min(score, 98)

    # Add slight variance based on member id hash
    member_id = member.get("id", "")
    if member_id:
        hash_val = sum(ord(c) for c in member_id) % 7
        score = min(score + hash_val - 3, 98)
        score = max(score, 45)

    justification_parts = reasons[:2] if reasons else ["standard ecosystem participant"]
    justification = f"Score driven by {' and '.join(justification_parts)}."

    return {"score": score, "justification": justification}


async def justify_score(member: dict[str, Any]) -> dict[str, str | int]:
    """Use Gemini to generate a score and one-line justification for an ecosystem member."""

    if not gemini_service.is_configured:
        return _compute_fallback_score(member)

    system_instruction = (
        "You are Syncra Intelligence, an AI that evaluates ecosystem members.\n"
        "Given a member's profile data, produce exactly one JSON object with two fields:\n"
        '- "score": an integer from 40 to 98 representing their ecosystem value percentage\n'
        '- "justification": a single sentence (max 15 words) explaining the score\n\n'
        "Scoring criteria:\n"
        "- Breadth and relevance of expertise\n"
        "- Active engagement level (active work, status)\n"
        "- Compliance health (SSM, BNM, LHDN signals)\n"
        "- Strategic fit within the ecosystem\n\n"
        "Return ONLY the JSON object, no markdown, no extra text."
    )

    member_summary = json.dumps(
        {
            "name": member.get("name"),
            "type": member.get("type"),
            "expertise": member.get("expertise", []),
            "status": member.get("status"),
            "industry": member.get("industry"),
            "stage": member.get("stage"),
            "activeWork": member.get("activeWork", []),
            "compliance": member.get("compliance"),
            "values": member.get("values", []),
        },
        default=str,
    )

    message = f"Evaluate this ecosystem member and return the JSON score:\n{member_summary}"

    try:
        raw = await gemini_service.generate(
            system_instruction=system_instruction,
            message=message,
            temperature=0.3,
        )

        # Extract JSON from response
        json_match = re.search(r"\{[^}]+\}", raw)
        if json_match:
            parsed = json.loads(json_match.group())
            score = int(parsed.get("score", 70))
            score = max(40, min(98, score))
            justification = str(parsed.get("justification", "Evaluated by Syncra Intelligence."))
            # Truncate if too long
            if len(justification) > 100:
                justification = justification[:97] + "..."
            return {"score": score, "justification": justification}

        return _compute_fallback_score(member)
    except Exception:
        return _compute_fallback_score(member)
