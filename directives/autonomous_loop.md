# Autonomous Agent Loop Directive

## Goal
To maintain a 24/7 high-performance business presence by autonomously hunting for leads, creating content, and maintaining system health.

## Core Principle
"Always be useful." If not hunting, then farming. If not farming, then learning (analyzing).

## The Daily Schedule (The "Brain" Logic)

The Orchestrator (`execution/orchestrator.py`) follows this priority queue:

### 1. The "Hunter" Block (09:00 - 12:00)
*   **Goal:** Fill the pipeline.
*   **Action:**
    *   Check `leads_db`: Do we have < 50 new leads this week?
    *   **Yes:** Run `gmaps_lead_pipeline.py` targeting a new city/niche combo (e.g., "Roofers in Dallas").
    *   **No:** Move to Farmer Block.

### 2. The "Farmer" Block (13:00 - 15:00)
*   **Goal:** Build authority.
*   **Action:**
    *   Check `state.json`: Have we posted to LinkedIn today?
    *   **No:** Run `social/content_generator.py` -> `social/poster.py`.
    *   **Yes:** Engage (Phase 2): Like/Comment on 5 industry posts.

### 3. The "Analyst" Block (16:00 - 18:00)
*   **Goal:** Improve quality.
*   **Action:**
    *   Run `enrich_emails.py` on any leads missing data.
    *   Run audits on potential client sites.

### 4. The "Night Shift" (00:00 - 06:00)
*   **Goal:** Infrastructure & Maintenance.
*   **Action:**
    *   Backup `leads_db` and `state.json`.
    *   Update `task.md` with daily summary.

## Error Handling
*   **API Failure:** If Apify or LLM fails > 3 times, pause that module for 4 hours.
*   **Critical Crash:** Log to `critical.log` and send alert (future: email owner).

## State Management
*   The agent effectively "punches in" and "punches out" of tasks using `data/state.json`.
*   It must always check "When did I last do X?" before doing X.
