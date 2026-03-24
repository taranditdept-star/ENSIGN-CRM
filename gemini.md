# ENHANCEMENT TASK: DAILY SALES REGISTER + ADVANCED DASHBOARD

## CONTEXT

We are enhancing an existing production-ready CRM built with:

* Next.js 15 (App Router)
* Supabase (PostgreSQL + Auth)
* Tailwind CSS

The system already captures transactional data per subsidiary (e.g., Sbali Roller Meal, LPG Gas, Solar).

We now want to evolve the system into a **Sales Intelligence Dashboard** with real-time aggregation and actionable insights.

---

# 🎯 OBJECTIVES

## 1. DAILY SALES REGISTER (CORE FEATURE)

### GOAL

Create a centralized system that aggregates all captured transactions into:

* Daily totals
* Monthly totals
* Branch-level performance
* Organization-level performance

---

## 🧱 DATABASE DESIGN (SUPABASE)

Create a derived or queryable structure based on existing captures.

### Table: `sales_register`

(If using materialized view or aggregation query, implement accordingly)

Fields:

* id (uuid)
* organization_id
* branch_id
* subsidiary_type (e.g., sbali, gas, solar)
* date (DATE)
* total_transactions (INT)
* total_quantity (NUMERIC)
* total_revenue (NUMERIC)
* avg_transaction_value (NUMERIC)
* created_at

---

### LOGIC

For each capture:

* Extract:

  * quantity (if exists)
  * total_price
* Aggregate per:

  * day
  * branch
  * organization

---

## 2. API / SERVER FUNCTIONS

Create server-side functions:

### `/api/sales/daily`

Returns:

* Today’s totals per branch
* Total revenue
* Total transactions

### `/api/sales/monthly`

Returns:

* Aggregated monthly totals
* Grouped by organization

### `/api/sales/branch-performance`

Returns:

* All branches with:

  * total revenue
  * activity count
  * last activity timestamp

---

## 3. DASHBOARD UI ENHANCEMENTS

Upgrade the Global Dashboard into a **data-driven control center**

---

### 🔹 A. INTERACTIVE KPI CARDS

Replace static cards with dynamic ones:

Cards:

* Total Revenue (Today)
* Total Transactions (Today)
* Active Branches
* Avg Transaction Value

Features:

* Hover → show % change vs yesterday
* Click → navigate to detailed report page

---

### 🔹 B. DAILY SALES TABLE (NEW SECTION)

Add a section:

Title: “Daily Sales Register”

Columns:

* Branch
* Organization
* Transactions
* Quantity
* Revenue
* Status (Active / Inactive)

Include:

* Sorting
* Filtering
* Search

---

### 🔹 C. BRANCH HEALTH INDICATOR

Each branch must show:

Status logic:

* 🟢 Active → activity within last 24h
* 🟡 Warning → no activity in 48h
* 🔴 Inactive → no activity >72h

Display:

* Colored badge
* Tooltip: “Last activity: X hours ago”

---

### 🔹 D. ACTIVITY HEATMAP (OPTIONAL BUT PREFERRED)

Add a visual grid showing:

* Days vs activity volume
* Color intensity based on number of captures

---

### 🔹 E. EMPTY STATE IMPROVEMENTS

Replace empty placeholders with:

* “No sales recorded today”
* CTA: “Open Capture Portal”

---

## 4. BRANCH PERFORMANCE PANEL

Add a new section:

Title: “Branch Performance Overview”

Each branch card should display:

* Branch name
* Total revenue (today)
* Total transactions
* Last activity timestamp
* Health indicator

---

## 5. DATA FLOW

Capture Form → Supabase → Aggregation → Dashboard

Ensure:

* Real-time updates (or near real-time via fetch revalidation)
* No performance bottlenecks

---

## 6. UI DESIGN REQUIREMENTS

* Maintain existing glassmorphic design
* Use subtle gradients for revenue cards
* Use color coding:

  * Green → good performance
  * Orange → warning
  * Red → inactive
* Keep spacing consistent with current design system

---

## 7. PERFORMANCE

* Use server components where possible
* Use caching/revalidation (Next.js)
* Avoid heavy client-side calculations

---

## 8. DELIVERABLES

* Database schema or SQL for aggregation
* API routes implemented
* Updated Global Dashboard UI
* Reusable components:

  * KPI Card
  * Sales Table
  * Branch Card
  * Status Badge

---

## 9. BONUS (IF POSSIBLE)

* Add export button:

  * CSV download for daily sales
* Add date filter:

  * Today / Yesterday / Custom range

---

# 🧠 FINAL GOAL

Transform the CRM dashboard into a:
→ Real-time Sales Intelligence System
→ Allow management to instantly see:

* Where money is coming from
* Which branches are underperforming
* Daily operational health

---

END OF TASK

# 🚀 SUGGESTED IMPLEMENTATION PATHWAY

Based on these requirements, here is the technical strategy I recommend:

1. **SQL Aggregation Logic**: Instead of a hard table, I suggest creating a **PostgreSQL View** or a **RPC (Remote Procedure Call)** in Supabase that dynamically calculates these totals from the `customers` table's `customer_metadata`. This ensures data is always live without needing sync jobs.
2. **Branch Health Service**: Create a utility function that compares `new Date()` with the `max(created_at)` for each subsidiary.
3. **Smart Dashboard Index**: We should refactor `src/app/admin/page.tsx` to use the `/api/sales/daily` route (or a server-side equivalent) to populate the four interactive KPI cards.
4. **Export Logic**: Use `json2csv` on the client-side for the "Daily Sales Register" table to allow managers to export their data instantly.
