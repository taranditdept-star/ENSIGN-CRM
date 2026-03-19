Ensign Holdings Centralized CRM & Data Capture System
Project Proposal & Feature Specification

1. Executive Summary
Ensign Holdings requires a modern, centralized Customer Relationship Management (CRM) system to replace legacy paper-based data capture across its 14+ subsidiaries. The system will feature a multi-tenant architecture, allowing each subsidiary to log in, capture, view, and edit their specific customer data without seeing other subsidiaries' data. A centralized "Super Admin" dashboard will empower the Marketing Manager to oversee all data, track performance, and generate cross-company analytics.

2. Technical Architecture & Environment
To achieve the "state-of-the-art" look from the UI inspirations and ensure seamless performance, the following modern tech stack is proposed:
Frontend Framework: Next.js (React) - Perfect for highly interactive dashboards and fast page loads.
Styling: Tailwind CSS & Shadcn UI - To precisely match the clean, modern aesthetics of the provided Pinterest inspirations (Docare, TerraHub).
Database & Authentication: Supabase (PostgreSQL) - Crucial for its Row Level Security (RLS), which ensures subsidiary data is strictly isolated at the database level.
Version Control: GitHub.
Hosting & Deployment: Vercel - Enables automatic deployments every time code is pushed to GitHub.

3. Role-Based Access Control (RBAC)
Security and data privacy are paramount. The system will utilize Supabase Auth to enforce three distinct roles:
Super Admin (Marketing Manager / Executive):
Full access to ALL subsidiary data.
Can view global analytics and cross-reference customers.
Can manage users (create accounts, reset passwords).
Ability to perform "Soft Deletes" (archiving records).
Subsidiary Admin / Manager:
Can only access data belonging to their assigned subsidiary (e.g., Flora Gas).
Can create, view, and edit customer records.
Cannot delete records.
Can export their specific subsidiary data.
Data Capture Clerk (Optional future role):
Can only view the data entry form and submit data (no access to the broader database/dashboard).

4. Core Features (MVP)

A. Authentication & Onboarding (Ref: Pagedone UI)
Clean, branded login portal.
Secure email/password authentication (managed by Supabase).
Automatic routing based on role: Super Admins go to the Master Dashboard, Subsidiary users go directly to their specific workspace.

B. Dynamic Data Capture Forms (Ref: Flora Gas & Sbali UI)
Because different subsidiaries require different data (e.g., Gas Cylinder Size vs. Gold Mining Volumes vs. Roller Meal KGs), the system must support Dynamic Forms.
Flora Gas Form: Includes Family Size, Cylinder Size, Usage Frequency, Delivery toggles.
Sbali/Chitsano Form: Includes Quantity (kg), Location, Customer Type.
Validation: Real-time form validation (mandatory fields, correct phone number formats for Zimbabwe +263).
Mobile-First Design: Ensure forms are fully optimized for seamless data entry on tablets and smartphones at physical subsidiary locations.
Theme Adaptation: Forms can support Light/Dark mode depending on the user's system preference or subsidiary branding.
QR Code Quick-Capture: Generate a unique QR code for each subsidiary form so customers standing in line can scan and fill out the form on their own mobile devices, saving clerk time.

C. The Subsidiary Workspace (Ref: Docare UI)
When a subsidiary user logs in, they see a tailored dashboard:
Data Table View: A robust, paginated table showing all their registered customers.
Advanced Filtering: (As seen in the Docare UI) Filter by date registered, customer type, location, or specific product preferences.
Column Toggling: Let users hide/show specific columns to customize their view.
Edit Capabilities: Click on a row to open an "Edit Customer" modal.
CSV Bulk Import & Export Mapping: A secure bulk upload tool where subsidiaries can upload historical data from CSV/Excel and map spreadsheet columns to the standard and custom database fields.
Basic Interaction Logging (Notes/Tasks): Ability for users to add timestamped notes to a customer's profile (e.g., "Customer requested delivery next Tuesday") or set future follow-up dates.

D. The Marketing Manager Master Dashboard (Ref: Event Portal UI)
High-Level KPI Cards: Total customers registered globally, customers by subsidiary, weekly growth rate.
Cross-Subsidiary Analytics: Bar charts comparing customer acquisition between Granite Haven and REDEEM RESOURCES.
Global Search: Ability to search a phone number and see if a customer buys from both Ecomatt Butcheries and Flora Gas (excellent for cross-selling).
Export Engine: Export filtered data to CSV/Excel for marketing campaigns (e.g., SMS blasts).
Automated Weekly/Monthly Reporting: A background task that automatically emails the Super Admin a clean PDF or HTML summary of the week's performance (Total captures, top performing subsidiary, etc.).
Data Deduplication & Merge Tool: An interface that flags potential duplicate customer entries (e.g., based on phone number or ID) across subsidiaries and allows the Super Admin to merge them into a single master profile.

1. Recommended Advanced Features (To Impress the Marketing Manager)
Progressive Web App (PWA) / Offline Mode: * Why: Subsidiaries like Ecomatt Farm or Continental Treasures Mining might operate in areas with poor internet.
How: The form caches data locally on the device and automatically syncs to Supabase when the internet connection is restored.
Audit Trails (Activity Logs):
Since data cannot be deleted by users, the system should track who edited a customer record and when (e.g., "User X changed phone number from Y to Z").
Cross-Selling Insights:
An algorithm that detects matching phone numbers across different subsidiaries to identify highly loyal "Ensign Holdings" VIP customers.
WhatsApp API Integration (Future Phase):
Automatically send a welcome message to a customer when their data is captured ("Welcome to Flora Gas!").

2. High-Level Database Schema (Supabase/PostgreSQL)
To achieve dynamic data, a flexible schema is required:
organizations (Table): Stores parent companies (TARAND, GRANITE HAVEN, etc.)
subsidiaries (Table): Stores specific branches (MountPlus, Flora Gas, Ecomatt Foods). Links to organizations.
users (Table): System users. Links to a subsidiary_id and has a role (super_admin, user).
customers (Table): The core data. Contains universal fields:
id, first_name, surname, phone, gender, physical_address, subsidiary_id, created_at, updated_at.
customer_metadata (JSONB Column within customers):
Crucial for flexibility. Instead of creating 50 different columns for every possible subsidiary question, subsidiary-specific data (like cylinder_size, pie_preference, mining_license) is stored as a structured JSON object.

3. Development & Deployment Pipeline
Design Handoff: Finalize UI/UX in Figma based on provided Illustrator mockups and Pinterest references.
Environment Setup: Initialize Next.js project, connect to GitHub repo, link to Vercel.
Backend Setup: Configure Supabase, set up tables, and write Row Level Security (RLS) policies to lock down data per subsidiary.
Frontend Build: Develop Authentication, Master Dashboard, Subsidiary Dashboards, and Dynamic Forms.
UAT (User Acceptance Testing): Marketing Manager and select subsidiary leads test the system on Vercel preview links.
Go-Live: Final deployment to production URL (e.g., crm.ensignholdings.com).
