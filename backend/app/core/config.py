import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _split_csv(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    cors_origins: list[str] | None = None

    def __post_init__(self) -> None:
        if self.cors_origins is None:
            origins = os.getenv(
                "CORS_ORIGINS",
                "http://localhost:3000,http://localhost:5173",
            )
            object.__setattr__(self, "cors_origins", _split_csv(origins))


settings = Settings()
