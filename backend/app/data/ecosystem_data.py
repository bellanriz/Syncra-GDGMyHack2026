from __future__ import annotations

from copy import deepcopy
from typing import Any

mentors: list[dict[str, Any]] = [
    {
        "id": "m1",
        "name": "Alex River",
        "role": "Senior Software Engineer",
        "expertise": ["React", "TypeScript", "Tailwind"],
        "values": ["Quality Code", "Mentorship", "Scalability"],
        "bio": "10+ years experience building scalable web applications. Specialist in UI architecture.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        "currentLoad": 2,
        "maxLoad": 5,
        "type": "MENTOR",
        "score": 94,
    },
    {
        "id": "m2",
        "name": "Sarah Chen",
        "role": "AI ENGINEER",
        "expertise": ["Node.js", "Python", "LLMs", "PyTorch"],
        "values": ["Innovation", "Ethics", "Efficiency"],
        "bio": "Passionate about backend architecture and AI integration.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        "currentLoad": 4,
        "maxLoad": 5,
        "type": "MENTOR",
        "score": 82,
    },
    {
        "id": "m3",
        "name": "Marcus Thorne",
        "role": "Solutions Architect",
        "expertise": ["Cloud Native", "Design Systems", "WebGPU"],
        "values": ["Precision", "Aesthetics", "Performance"],
        "bio": "Bridging the gap between beautiful design and efficient code.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        "currentLoad": 1,
        "maxLoad": 3,
        "type": "MENTOR",
        "score": 65,
    },
    {
        "id": "m4",
        "name": "Elena Vance",
        "role": "CLOUD ENGINEER",
        "expertise": ["AWS", "Kubernetes", "DevOps"],
        "values": ["Uptime", "Security", "Automation"],
        "bio": "Infrastructure specialist focusing on high-availability systems.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        "currentLoad": 0,
        "maxLoad": 4,
        "type": "MENTOR",
        "score": 88,
    },
    {
        "id": "m5",
        "name": "David Park",
        "role": "Marketing Manager",
        "expertise": ["GTM Strategy", "Growth Hacking", "Branding"],
        "values": ["Storytelling", "Data-Driven", "Empathy"],
        "bio": "Helping startups find their voice and scale their user base.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        "currentLoad": 2,
        "maxLoad": 6,
        "type": "MENTOR",
        "score": 91,
    },
]

companies: list[dict[str, Any]] = [
    {
        "id": "c1",
        "name": "ZenPay Global",
        "stage": "Series A",
        "industry": "Fintech",
        "needs": ["React", "Security"],
        "type": "COMPANY",
        "score": 88,
        "values": ["Transparency", "Speed", "Compliance"],
    },
    {
        "id": "c2",
        "name": "BioTrack",
        "stage": "Seed",
        "industry": "HealthTech",
        "needs": ["System Design", "Node.js"],
        "type": "COMPANY",
        "score": 74,
        "values": ["Scientific Integrity", "Privacy", "Accessibility"],
    },
    {
        "id": "c3",
        "name": "CloudCraft",
        "stage": "Pre-seed",
        "industry": "DevTools",
        "needs": ["UX", "Branding"],
        "type": "COMPANY",
        "score": 38,
        "values": ["Developer Experience", "Open Source", "Design"],
    },
    {
        "id": "c4",
        "name": "Grab Holdings",
        "stage": "Public",
        "industry": "Super-app",
        "needs": ["AI Ethics", "Logistics Optimization"],
        "type": "COMPANY",
        "score": 98,
        "values": ["Heart", "Hunger", "Humour"],
        "bio": "Southeast Asia's leading super-app providing everyday services.",
        "compliance": {
            "ssm": "VERIFIED",
            "bnm": "CLEARED",
            "lhdn": "ACTIVE",
            "lastAuditDate": "2026-01-15",
        },
    },
    {
        "id": "c5",
        "name": "Carsome",
        "stage": "Unicorn",
        "industry": "Automotive",
        "needs": ["Computer Vision", "Pricing Engines"],
        "type": "COMPANY",
        "score": 92,
        "values": ["Trust", "Efficiency", "Customer-First"],
        "bio": "Southeast Asia's largest integrated car e-commerce platform.",
        "compliance": {
            "ssm": "VERIFIED",
            "bnm": "CLEARED",
            "lhdn": "ACTIVE",
            "lastAuditDate": "2026-03-22",
        },
    },
    {
        "id": "c6",
        "name": "Aerodyne Group",
        "stage": "Series B",
        "industry": "Drone Tech",
        "needs": ["Edge AI", "Data Analytics"],
        "type": "COMPANY",
        "score": 95,
        "values": ["Innovation", "Safety", "Precision"],
        "bio": "Global leader in drone-based enterprise solutions.",
        "compliance": {
            "ssm": "VERIFIED",
            "bnm": "UNDER_REVIEW",
            "lhdn": "ACTIVE",
            "lastAuditDate": "2026-04-10",
        },
    },
    {
        "id": "c7",
        "name": "StoreHub",
        "stage": "Series B",
        "industry": "SaaS / Retail",
        "needs": ["Growth Strategy", "Internationalization"],
        "type": "COMPANY",
        "score": 89,
        "values": ["Merchant Success", "Automation", "Reliability"],
        "bio": "Enabling retailers to automate and grow their businesses.",
        "compliance": {
            "ssm": "VERIFIED",
            "bnm": "CLEARED",
            "lhdn": "LATE",
            "lastAuditDate": "2025-12-05",
        },
    },
    {
        "id": "c8",
        "name": "Dropee",
        "stage": "Series A",
        "industry": "B2B Marketplace",
        "needs": ["Supply Chain AI", "Fintech Integration"],
        "type": "COMPANY",
        "score": 84,
        "values": ["B2B Empowerment", "Data Transparency", "Service Excellence"],
        "bio": "B2B e-commerce marketplace for independent retailers.",
        "compliance": {
            "ssm": "PENDING",
            "bnm": "CLEARED",
            "lhdn": "ACTIVE",
            "lastAuditDate": "2026-02-28",
        },
    },
]

partners: list[dict[str, Any]] = [
    {
        "id": "p_1",
        "name": "AWS Startups",
        "type": "PARTNER",
        "expertise": ["Cloud Credits", "Architecture Reviews"],
        "bio": "Providing cloud resources for early stage teams.",
        "score": 99,
        "values": ["Scalability", "Security", "Availability"],
    },
    {
        "id": "p_2",
        "name": "Google for Startups",
        "type": "PARTNER",
        "expertise": ["AI Mastery", "Scaling"],
        "bio": "Accelerating ecosystems through technology.",
        "score": 96,
        "values": ["Innovation", "Open Cloud", "Impact"],
    },
]

service_providers: list[dict[str, Any]] = [
    {
        "id": "sp_1",
        "name": "LawLogic",
        "type": "SERVICE_PROVIDER",
        "expertise": ["IP Law", "Compliance"],
        "bio": "Specialized legal services for tech companies.",
        "activeWork": [
            {"client": "ZenPay Global", "task": "Series A Compliance Review", "status": "80%"},
            {"client": "BioTrack", "task": "Patent Filing", "status": "25%"},
        ],
        "status": "ACTIVE",
        "score": 85,
        "values": ["Integrity", "Precision", "Confidentiality"],
    },
    {
        "id": "sp_2",
        "name": "PixelPerfect",
        "type": "SERVICE_PROVIDER",
        "expertise": ["Branding", "UI/UX"],
        "bio": "Premium design services for product-led teams.",
        "activeWork": [
            {"client": "CloudCraft", "task": "Rebranding Phase 1", "status": "COMPLETE"},
        ],
        "status": "ACTIVE",
        "score": 92,
        "values": ["Aesthetics", "User-Centricity", "Quality"],
    },
    {
        "id": "sp_3",
        "name": "SecureOps",
        "type": "SERVICE_PROVIDER",
        "expertise": ["Cybersecurity", "SOC2"],
        "bio": "Enterprise-grade security audits.",
        "activeWork": [],
        "status": "IDLE",
        "score": 48,
        "values": ["Safety", "Vigilance", "Resilience"],
    },
]

proposals: list[dict[str, Any]] = [
    {
        "id": "cohort_1",
        "name": "Deep Tech Scaling",
        "suggestedMentors": ["m1", "m4"],
        "suggestedCompanies": ["c6", "c8"],
        "suggestedPartners": ["p_1"],
        "suggestedProviders": ["sp_1"],
        "logic": "Focusing on deep-tech startups needing cloud infrastructure and IP protection.",
        "status": "PENDING",
    },
    {
        "id": "cohort_2",
        "name": "AI Ethics & Governance",
        "suggestedMentors": ["m2", "m3"],
        "suggestedCompanies": ["c4", "c1"],
        "suggestedPartners": ["p_2"],
        "suggestedProviders": ["sp_3"],
        "logic": "Aligning super-apps and fintechs with AI safety frameworks and solutions architect oversight.",
        "status": "PENDING",
    },
    {
        "id": "cohort_3",
        "name": "Retail Automation Hub",
        "suggestedMentors": ["m5", "m1"],
        "suggestedCompanies": ["c7", "c5"],
        "suggestedPartners": ["p_1", "p_2"],
        "suggestedProviders": ["sp_2"],
        "logic": "Driving retail transformation through growth strategy, infrastructure support, and UI/UX specialization.",
        "status": "PENDING",
    },
]

programs: list[dict[str, Any]] = [
    {
        "id": "pg_1",
        "name": "Global Scaleup 2026",
        "type": "PROGRAMME",
        "status": "ONGOING",
        "startDate": "2026-01-01",
        "description": "For companies expanding to SEA.",
    },
    {
        "id": "pg_2",
        "name": "TechFounders EU",
        "type": "PROGRAMME",
        "status": "REGISTERING",
        "startDate": "2027-07-15",
        "description": "Connecting EU talent with global investors.",
    },
    {
        "id": "pg_3",
        "name": "AI Innovation Lab",
        "type": "PROGRAMME",
        "status": "COMPLETED",
        "startDate": "2025-06-01",
        "description": "Pioneering LLM integration for enterprise.",
    },
]

analyst_insights: list[dict[str, Any]] = [
    {
        "id": "i1",
        "title": "Compliance Trend",
        "insight": "Significant improvement in SSM verification across Fintech sector (+22%).",
        "impact": "HIGH",
    },
    {
        "id": "i2",
        "title": "Scale-up Velocity",
        "insight": "Carsome and Aerodyne showing 15% higher ecosystem vitality than average.",
        "impact": "MEDIUM",
    },
    {
        "id": "i3",
        "title": "Risk Alert",
        "insight": "LHDN audit delays detected in 'SaaS / Retail' segment. Action required.",
        "impact": "CRITICAL",
    },
    {
        "id": "i4",
        "title": "Mentor Performance",
        "insight": "Top 5 mentors showing 92% average satisfaction across linkage sessions.",
        "impact": "HIGH",
    },
]

linkages: list[dict[str, Any]] = [
    {
        "id": "l1",
        "source": "m1",
        "target": "c1",
        "type": "MENTORSHIP",
        "program": "pg_1",
        "status": "VERIFIED",
        "strength": 85,
        "lastInteraction": "2h ago",
    },
    {
        "id": "l2",
        "source": "m2",
        "target": "c2",
        "type": "TECHNICAL_ADVISOR",
        "program": "pg_1",
        "status": "ACTIVE",
        "strength": 60,
        "lastInteraction": "1d ago",
    },
    {
        "id": "l3",
        "source": "p_1",
        "target": "c1",
        "type": "INFRASTRUCTURE_CREDITS",
        "program": "pg_1",
        "status": "VERIFIED",
        "strength": 100,
        "lastInteraction": "Active",
    },
    {
        "id": "l4",
        "source": "sp_1",
        "target": "c1",
        "type": "LEGAL_COMPLIANCE",
        "program": "pg_1",
        "status": "ONGOING",
        "strength": 45,
        "lastInteraction": "3d ago",
    },
]

resources: list[dict[str, Any]] = [
    {
        "id": "r1",
        "title": "Scaleup Governance Framework",
        "category": "Framework",
        "link": "#",
        "description": "Standardizing ecosystem relationships for global compliance.",
    },
    {
        "id": "r2",
        "title": "Automated Verification Guide",
        "category": "Automation",
        "link": "#",
        "description": "How to programmatically verify program participants.",
    },
    {
        "id": "r3",
        "title": "Linkage JSON Schema",
        "category": "Documentation",
        "link": "#",
        "description": "The technical specification for programmable relationships.",
    },
]


def get_ecosystem_data() -> dict[str, Any]:
    return deepcopy(
        {
            "mentors": mentors,
            "companies": companies,
            "partners": partners,
            "serviceProviders": service_providers,
            "programs": programs,
            "linkages": linkages,
            "proposals": proposals,
            "analystInsights": analyst_insights,
        }
    )


def get_resources() -> list[dict[str, Any]]:
    return deepcopy(resources)


def get_mentors() -> list[dict[str, Any]]:
    return deepcopy(mentors)
