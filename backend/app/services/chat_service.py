from __future__ import annotations

import json
import re
from typing import Any

from app.data.ecosystem_data import get_ecosystem_data
from app.models.schemas import ChatMessage
from app.services.gemini_service import gemini_service


def _compact_context(data: dict[str, Any]) -> dict[str, Any]:
    return {
        "product": {
            "name": "Syncra",
            "assistantName": "Syncra Intelligence",
            "purpose": "Coordinate startup ecosystem linkages across founders, mentors, partners, service providers, programmes, and compliance signals.",
            "roles": ["Programme Administrator", "Startup Founder"],
            "coreActions": [
                "generate cohort proposals",
                "match mentors and ventures",
                "explain compliance risks",
                "recommend partners and service providers",
                "summarize programme or linkage strategy",
            ],
            "knownTerms": {
                "SSM": "Companies Commission of Malaysia company-registration compliance.",
                "BNM": "Bank Negara Malaysia financial or regulatory clearance signal.",
                "LHDN": "Malaysia inland revenue or tax compliance signal.",
                "linkage": "A reusable relationship between an ecosystem node and a venture, such as mentorship, cloud credits, or legal compliance support.",
            },
        },
        "companies": [
            {
                "id": item["id"],
                "name": item["name"],
                "industry": item.get("industry"),
                "stage": item.get("stage"),
                "needs": item.get("needs", []),
                "compliance": item.get("compliance"),
            }
            for item in data["companies"]
        ],
        "mentors": [
            {
                "id": item["id"],
                "name": item["name"],
                "role": item.get("role"),
                "expertise": item.get("expertise", []),
                "load": f"{item.get('currentLoad')}/{item.get('maxLoad')}",
            }
            for item in data["mentors"]
        ],
        "partners": data["partners"],
        "serviceProviders": data["serviceProviders"],
        "linkages": data["linkages"],
        "insights": data.get("analystInsights", []),
    }


def _fallback_reply_admin(message: str) -> str:
    lowered = message.lower()
    if _is_greeting(message) or _is_capability_question(message):
        return _intro_reply("ADMIN")
    if "syncra" in lowered or "system" in lowered or "platform" in lowered:
        return (
            "Syncra is an ecosystem coordination platform for startup programmes.\n\n"
            "It helps admins assemble cohorts, monitor compliance signals, and connect ventures with mentors, partners, and service providers.\n\n"
            "You can ask me to explain a company risk, suggest a mentor, build a cohort idea, or summarize what action the admin should take next."
        )
    if "ssm" in lowered or "bnm" in lowered or "lhdn" in lowered:
        return (
            "SSM, BNM, and LHDN are compliance signals used in this demo.\n\n"
            "SSM tracks company-registration readiness, BNM tracks financial or regulatory clearance, and LHDN tracks tax/audit status.\n\n"
            "In Syncra, these signals help decide which venture needs support before joining or scaling inside a cohort."
        )
    if "legal" in lowered or "compliance" in lowered or "lhdn" in lowered:
        return (
            "Recommendation: route StoreHub to LawLogic for LHDN delay resolution.\n\n"
            "Evidence: StoreHub has LHDN marked LATE, while Dropee still has SSM pending.\n\n"
            "Next action: clear the compliance blocker first, then attach AWS Startups for infrastructure support."
        )
    if "mentor" in lowered or "match" in lowered:
        return (
            "Recommendation: assign Elena Vance to Aerodyne Group.\n\n"
            "Evidence: Aerodyne needs Edge AI and Data Analytics, and Elena covers AWS, Kubernetes, and DevOps with open capacity.\n\n"
            "Next action: pair Aerodyne with AWS Startups, then review LawLogic only if compliance scope expands."
        )
    if "program" in lowered or "apply" in lowered:
        return (
            "Recommendation: proceed with the automated programme application sequence.\n\n"
            "Evidence: the venture can be routed through Regulatory Proof Units, Cradle Compliance Check, and ecosystem linkage initialization.\n\n"
            "Next action: generate the linkage package for mentor, partner, and service provider assignment."
        )
    if "cohort" in lowered or "prioritize" in lowered:
        return (
            "Recommendation: prioritize Aerodyne, Dropee, and StoreHub.\n\n"
            "Evidence: they combine high scale potential with unresolved infrastructure or regulatory gaps.\n\n"
            "Next action: create one cohort proposal that connects mentors, AWS Startups, and LawLogic into a single approval-ready structure."
        )
    
    return "I am currently in offline mode and can only answer questions related to predefined demo paths (e.g., mentors, compliance, programmes). For general knowledge questions, please ensure the AI service is fully configured."


def _fallback_reply_founder(message: str) -> str:
    lowered = message.lower()
    if _is_greeting(message) or _is_capability_question(message):
        return _intro_reply("FOUNDER")
    if "syncra" in lowered or "system" in lowered or "platform" in lowered:
        return (
            "Syncra is an ecosystem coordination platform.\n\n"
            "It helps founders like you connect with mentors, partners, and service providers.\n\n"
            "You can ask me to help prepare your venture for compliance, find a mentor, or suggest the next step for your program application."
        )
    if "ssm" in lowered or "bnm" in lowered or "lhdn" in lowered:
        return (
            "SSM, BNM, and LHDN are compliance signals used in this demo.\n\n"
            "SSM tracks company-registration readiness, BNM tracks financial or regulatory clearance, and LHDN tracks tax/audit status.\n\n"
            "These signals help us determine your readiness for programme support."
        )
    if "legal" in lowered or "compliance" in lowered or "lhdn" in lowered:
        return (
            "Recommendation: review your current LHDN compliance status.\n\n"
            "Evidence: your venture may have pending regulatory or tax clearances.\n\n"
            "Next action: resolve any compliance blockers, then we can attach AWS Startups or other linkages."
        )
    if "mentor" in lowered or "match" in lowered:
        return (
            "Recommendation: request a mentorship session with Elena Vance.\n\n"
            "Evidence: you indicated a need for Edge AI and Data Analytics, and Elena has expertise in these areas.\n\n"
            "Next action: apply for mentorship and wait for programme admin approval."
        )
    if "program" in lowered or "apply" in lowered:
        return (
            "Recommendation: proceed with your automated programme application sequence.\n\n"
            "Evidence: you can be routed through Regulatory Proof Units, Cradle Compliance Check, and ecosystem linkage initialization.\n\n"
            "Next action: I will prepare your venture profile for mentor, partner, and service provider linkage once your compliance is clear."
        )
    if "infrastructure" in lowered or "gap" in lowered:
        return (
            "Recommendation: prioritize resolving any infrastructure or regulatory gaps.\n\n"
            "Evidence: this will increase your venture's scale potential and readiness for the programme.\n\n"
            "Next action: prepare your profile for mentor and partner linkage."
        )

    return "I am currently in offline mode and can only answer questions related to predefined demo paths (e.g., mentors, compliance, applying to programs). For general questions or advice, please ensure the AI service is fully configured."


def _is_greeting(message: str) -> bool:
    normalized = re.sub(r"[^a-z\s]", "", message.lower()).strip()
    return normalized in {"hi", "hello", "hey", "hai", "yo", "good morning", "good afternoon", "good evening"}


def _is_capability_question(message: str) -> bool:
    normalized = re.sub(r"[^a-z\s]", "", message.lower()).strip()
    patterns = [
        r"^what\s+(can\s+)?you\s+do$",
        r"^what\s+you\s+do$",
        r"^who\s+are\s+you$",
        r"^help$",
        r"^help\s+me$",
        r"^how\s+to\s+use\s+(this|syncra|the\s+app)$",
        r"^how\s+can\s+you\s+help$",
        r"^what\s+should\s+i\s+ask$",
        r"^what\s+is\s+syncra\s+intelligence$",
    ]
    return any(re.match(pattern, normalized) for pattern in patterns)


def _intro_reply(role: str | None = None) -> str:
    if role == "FOUNDER":
        return (
            "Hello, I'm Syncra Intelligence.\n\n"
            "I can explain your programme status, suggest useful mentors or partners, and help prepare your venture for compliance and ecosystem linkage.\n\n"
            "Try asking: \"What support should ZenPay request next?\""
        )

    return (
        "Hello, I'm Syncra Intelligence.\n\n"
        "I help programme admins generate cohorts, match mentors, detect compliance risks, and plan partner or service-provider linkages.\n\n"
        "Try asking: \"Suggest mentors for Aerodyne\" or \"Which startup has compliance risk?\""
    )


def _classify_intent(message: str) -> str:
    normalized = re.sub(r"[^a-z0-9\s]", " ", message.lower()).strip()
    ecosystem_keywords = {
        "cohort",
        "mentor",
        "mentee",
        "compliance",
        "risk",
        "ssm",
        "bnm",
        "lhdn",
        "linkage",
        "partner",
        "provider",
        "programme",
        "program",
        "audit",
        "aerodyne",
        "dropee",
        "storehub",
        "zenpay",
        "biotrack",
        "cloudcraft",
        "carsome",
        "grab",
        "aws",
        "lawlogic",
    }

    if _is_greeting(message):
        return "greeting"
    if _is_capability_question(message):
        return "capability_help"
    if "syncra" in normalized or "this app" in normalized or "platform" in normalized:
        return "product_help"
    if normalized.startswith(("what is", "define", "explain")) and any(term in normalized for term in ["ssm", "bnm", "lhdn", "cohort", "linkage"]):
        return "definition"
    if any(keyword in normalized for keyword in ecosystem_keywords):
        return "ecosystem_operation"
    if any(term in normalized for term in ["startup", "venture", "founder", "investor", "pitch", "fundraising"]):
        return "general_question"
    return "general_question"


async def answer_chat(message: str, history: list[ChatMessage], role: str | None = None) -> str:
    data = get_ecosystem_data()
    context = _compact_context(data)
    detected_intent = _classify_intent(message)

    if _is_greeting(message) or _is_capability_question(message):
        return _intro_reply(role)

    is_founder = role == "FOUNDER"
    
    if not gemini_service.is_configured:
        return _fallback_reply_founder(message) if is_founder else _fallback_reply_admin(message)

    if is_founder:
        system_instruction = (
            "You are Syncra Intelligence, the operating AI inside a startup ecosystem "
            "coordination platform. Your answer is shown directly in the product UI to a Startup Founder.\n\n"
            "Audience rules:\n"
            "- Focus strictly on what the founder should do next, what support they can request, and why it helps.\n"
            "- Do not provide admin-level governance, approval logic, or cohort allocation details.\n"
            "- YOU MUST ANSWER ANY QUESTION THE USER ASKS, even if it is general knowledge or not related to startups. For general knowledge or startup advice, answer directly and helpfully.\n\n"
            "Choose the right answer mode:\n"
            "- greeting: give a warm Syncra Intelligence intro and 1-2 example questions.\n"
            "- capability_help or product_help: explain what you can do for founders.\n"
            "- definition: explain the term clearly.\n"
            "- ecosystem_operation: use exactly three short sections named Recommendation, Evidence, and Next action.\n"
            "- general_question: answer normally and helpfully in 1-3 short paragraphs.\n\n"
            "Response style rules:\n"
            "- Keep most answers under 140 words unless the user asks for detail.\n"
            "- If using bullets, use plain hyphen bullets only.\n"
            "- Keep the tone confident, concise, and helpful."
        )
        audience = "Startup Founder"
    else:
        system_instruction = (
            "You are Syncra Intelligence, the operating AI inside a startup ecosystem "
            "coordination platform. Your answer is shown directly in the product UI to a Programme Administrator.\n\n"
            "Audience rules:\n"
            "- Focus strictly on governance, cohort approval, compliance risk, and resource allocation.\n"
            "- Do not write directly to founders.\n"
            "- YOU MUST ANSWER ANY QUESTION THE USER ASKS, even if it is general knowledge or not related to startups. For general knowledge or startup advice, answer directly and helpfully.\n\n"
            "Choose the right answer mode:\n"
            "- greeting: give a warm Syncra Intelligence intro and 1-2 example questions.\n"
            "- capability_help or product_help: explain what you can do for admins.\n"
            "- definition: explain the term clearly.\n"
            "- ecosystem_operation: use exactly three short sections named Recommendation, Evidence, and Next action.\n"
            "- general_question: answer normally and helpfully in 1-3 short paragraphs.\n\n"
            "Response style rules:\n"
            "- Keep most answers under 140 words unless the user asks for detail.\n"
            "- If using bullets, use plain hyphen bullets only.\n"
            "- Mention IDs only when useful for implementation or admin action.\n"
            "- Keep the tone confident, concise, and professional."
        )
        audience = "Programme Administrator"

    message_with_context = (
        f"Audience: {audience}\n\n"
        f"Detected intent: {detected_intent}\n\n"
        f"Ecosystem context: {json.dumps(context)}\n\n"
        f"User request: {message}"
    )

    try:
        return await gemini_service.generate(
            system_instruction=system_instruction,
            message=message_with_context,
            history=history[-8:],
            temperature=0.35,
        )
    except Exception:
        return _fallback_reply_founder(message) if is_founder else _fallback_reply_admin(message)
