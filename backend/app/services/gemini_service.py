from __future__ import annotations

import httpx

from app.core.config import settings
from app.models.schemas import ChatMessage


class GeminiService:
    def __init__(self) -> None:
        self.api_key = settings.gemini_api_key
        self.model = settings.gemini_model

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key)

    async def generate(
        self,
        *,
        system_instruction: str,
        message: str,
        history: list[ChatMessage] | None = None,
        temperature: float = 0.35,
    ) -> str:
        if not self.is_configured:
            raise RuntimeError("GEMINI_API_KEY is not configured.")

        url = (
            "https://generativelanguage.googleapis.com/v1beta/"
            f"models/{self.model}:generateContent"
        )

        contents = []
        for item in history or []:
            role = "user" if item.role == "user" else "model"
            contents.append({"role": role, "parts": [{"text": item.content}]})
        contents.append({"role": "user", "parts": [{"text": message}]})

        payload = {
            "systemInstruction": {"parts": [{"text": system_instruction}]},
            "contents": contents,
            "generationConfig": {"temperature": temperature},
        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, params={"key": self.api_key}, json=payload)
            response.raise_for_status()
            data = response.json()

        parts = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [])
        )
        text = "".join(part.get("text", "") for part in parts).strip()
        if not text:
            raise RuntimeError("Gemini returned an empty response.")
        return text


gemini_service = GeminiService()
