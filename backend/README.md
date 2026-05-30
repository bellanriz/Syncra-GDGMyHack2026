<div align="center">
  <img width="80" height="80" src="https://api.dicebear.com/7.x/identicon/svg?seed=SyncraBackend&backgroundColor=1A1D1F" alt="Syncra Backend Logo" />
  <br/>
  <h1>⚡ Syncra Engine | Backend</h1>
  <p><strong>The high-performance, AI-driven FastAPI core powering Syncra.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  </p>
</div>

<hr/>

## 🚀 Overview

The **Syncra Engine** is the backbone of the MyHack2026 Syncra platform. It handles everything from securely serving ecosystem data to powering the "Syncra Intelligence" AI assistant using Google's Gemini API. 

### 🧠 Core Architecture & Services

*   ⚡ **High-Speed REST API:** Built on **FastAPI** for blazing-fast performance and automatic interactive API documentation.
*   🤖 **AI Agent Service (`chat_service.py`):** Deep integration with the **Google Gemini 2.5 Flash API** to provide dynamic, context-aware AI interactions with role-based scoping (Admin vs Founder).
*   🌐 **Ecosystem Data Management:** Robust endpoints managing state and data for mentors, partners, and service providers as first-class programmable entities.
*   📈 **AI Cohort Generation (`cohort_service.py`):** Gemini-powered cohort assembly with post-generation ID validation, structured JSON enforcement, and human-in-the-loop approval.

### 🛡️ Responsible AI Safeguards

*   **Context Grounding:** All AI responses are grounded in real ecosystem data injected as structured context.
*   **Hallucination Mitigation:** Entity ID validation, low temperature (0.25–0.35), strict JSON schema enforcement, and graceful fallbacks.
*   **Transparency:** Responses tagged with source (`gemini` | `fallback`); cohort proposals include explainable `logic` field.
*   **Privacy:** Minimal data exposure in prompts; role-based information scoping; inference-only API usage (no model training).

> 📖 See the [root README](../README.md) for full Architecture & Scalability and Responsible AI documentation.

---

## 🛠️ Quick Start

### Prerequisites
Make sure you have **Python 3.10+** installed.

### 1. Environment Setup
Create and activate a virtual environment to keep dependencies isolated:

**On Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**On Unix/MacOS:**
```bash
python -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies
Install the required Python packages:
```bash
pip install -r requirements.txt
```

### 3. Configuration
Copy the example environment file:
```bash
copy .env.example .env    # Windows
cp .env.example .env      # Unix/MacOS
```

> 🔑 **Important:** To enable live AI responses, add your `GEMINI_API_KEY` to the `.env` file. Without this key, the backend will gracefully fallback to returning deterministic demo responses.

### 4. Run the Server
Launch the FastAPI development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Your backend will be live at `http://localhost:8000`! You can also view the auto-generated API docs at `http://localhost:8000/docs`.

---

<div align="center">
  <p>Built with ❤️ for MyHack2026</p>
</div>
