<div align="center">
  <h1>✨ Syncra Connect | Frontend</h1>
  <p><strong>The dynamic, AI-powered ecosystem governance interface for MyHack2026.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

<hr/>

## 🚀 Overview

**Syncra Connect** is the user-facing application for the Syncra platform. Built with a focus on premium aesthetics and seamless user experience, it serves as the ultimate dashboard for ecosystem discovery, governance, and direct communication.

### 🌟 Key Features

*   🤖 **Syncra Intelligence:** An advanced AI assistant chat built with stunning Framer Motion animations to guide users through the ecosystem.
*   💬 **Direct Linkage:** A secure, real-time chat interface allowing users to communicate directly with verified ecosystem nodes (mentors, partners, service providers).
*   🔍 **Ecosystem Discovery:** Powerful search and filtering to easily explore verified entities within the network.
*   📊 **Governance Dashboards:** Beautiful, real-time metric visualizations using Recharts to track ecosystem health and performance.

---

## 🛠️ Quick Start

### Prerequisites
Make sure you have **Node.js (v18+)** installed.

### 1. Installation
Clone the repository and install the required dependencies:
```bash
npm install
```

### 2. Environment Setup
The frontend relies on the FastAPI backend (usually running on port `8000`).
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure your `.env` contains the correct backend URL:
```env
BACKEND_URL=http://localhost:8000
```

### 3. Run the Development Server
Launch the application:
```bash
npm run dev
```
> **Note:** This command starts both the Vite development server and the custom Express proxy server (`server.ts`).

---

## 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
npm start
```

<div align="center">
  <p>Built with ❤️ for MyHack2026</p>
</div>
