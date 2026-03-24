Ensign Holdings CRM - Development Implementation Guide

Project Context for AI Assistant

You are building a multi-tenant, centralized Customer Relationship Management (CRM) system for Ensign Holdings. Ensign Holdings has 14+ subsidiaries (e.g., Flora Gas, Ecomatt Foods, Granite Haven). The system must allow subsidiary managers to capture and manage their specific customer data in isolation, while a "Super Admin" (Marketing Manager) has a global view of all data across all companies.

Tech Stack & Tooling

Framework: Next.js (App Router)

Styling: Tailwind CSS

UI Components: Shadcn UI (Radix UI primitives) + Lucide Icons

Database & Auth: Supabase (PostgreSQL)

Forms: React Hook Form + Zod (for validation)

Tables: TanStack Table (React Table v8)

Charts: Recharts

Deployment: Vercel

Step-by-Step Implementation Phases

Phase 1: Project Initialization & Database Setup

Goal: Scaffold the app and set up the PostgreSQL schema with Row Level Security (RLS).

$$$$

 Step 1.1: Init Next.js & UI Tools

Initialize Next.js App Router with Tailwind CSS.

Initialize Shadcn UI and install core components: button, input, form, card, dialog, select, table, dropdown-menu.

$$$$

 Step 1.2: Supabase Schema Creation

Create organizations table (id, name). Example: TARAND Investments.

Create subsidiaries table (id, org_id, name, logo_url). Example: Flora Gas.

Create users table (extending Supabase Auth): (id, email, full_name, role

$$super_admin, sub_admin$$

, subsidiary_id).

Create customers table: (id, first_name, surname, phone, gender, location, physical_address, subsidiary_id, created_at).

Crucial: Add a metadata column (type JSONB) to the customers table to store dynamic, subsidiary-specific data (e.g., cylinder_size for Flora Gas, quantity_kg for Ecomatt Foods).

$$$$

 Step 1.3: Supabase Row Level Security (RLS)

Write RLS policy: super_admin can SELECT/INSERT/UPDATE/DELETE all records.

Write RLS policy: sub_admin can SELECT/INSERT/UPDATE records ONLY where customers.subsidiary_id == auth.users.subsidiary_id.

Phase 2: Authentication Module

Goal: Secure login and role-based routing.

$$$$

 Step 2.1: Login UI

Build a clean, modern login page (referencing 'Pagedone' UI style).

Include Email and Password fields using React Hook Form and Zod for validation.

$$$$

 Step 2.2: Auth Integration

Integrate @supabase/ssr or @supabase/supabase-js for authentication.

On successful login, fetch the user's role from the users table.

$$$$

 Step 2.3: Role-Based Routing (Middleware)

Implement Next.js Middleware to protect routes.

Route super_admin users to /admin/dashboard.

Route sub_admin users to /workspace/dashboard.

Phase 3: Core Layouts & Navigation

Goal: Build the shell of the application.

$$$$

 Step 3.1: Super Admin Layout

Build a global sidebar (referencing 'Docare' and 'Event Portal' UI).

Links: Global Dashboard, All Customers, Subsidiaries, User Management, Global Settings.

$$$$

 Step 3.2: Subsidiary Workspace Layout

Build a focused sidebar.

Links: Workspace Dashboard, Customer Directory, Add New Customer, Reports.

Include a header showing the specific Subsidiary Name and Logo (e.g., "Flora Gas Portal").

Phase 4: Dynamic Data Capture Module (The Core Engine)

Goal: A flexible form system that adapts based on the logged-in subsidiary.

$$$$

 Step 4.1: Base Form Component

Build the standard input fields: First Name, Surname, Phone Number (+263 validation), Gender, Physical Address.

$$$$

 Step 4.2: Dynamic JSONB Fields Configurator

Create a configuration object/mapping in the code (or DB) that defines extra fields per subsidiary.

Example Flora Gas: [{ name: 'cylinder_size', type: 'select', options: ['9kg', '19kg', '48kg'] }].

Example Ecomatt Foods: [{ name: 'quantity_kg', type: 'number', min: 10 }].

$$$$

 Step 4.3: Form Submission Engine

On submit, map the base fields to standard database columns.

Map the dynamic fields into the metadata JSONB object.

Push data to Supabase and show a success toast notification.

Phase 5: Customer Data Management (Table UI)

Goal: View, filter, and manage captured data.

$$$$

 Step 5.1: The Data Grid (TanStack Table)

Implement a robust data table matching the "Docare" UI reference.

Features: Pagination, Global Search (by name or phone), and Row Selection.

$$$$

 Step 5.2: Advanced Filtering & Columns

Implement a filter dropdown (Filter by Date, Location, or Customer Type).

Implement "Toggle Columns" so users can hide/show specific data points.

$$$$

 Step 5.3: Edit & Export

Add an "Edit" action that opens a Dialog/Modal pre-filled with the customer's data (including parsing the JSONB metadata).

Implement a "Export to CSV" button that flattens the standard columns and JSONB data into a downloadable file.

Phase 6: Analytics & Dashboards

Goal: Provide actionable insights to users.

$$$$

 Step 6.1: Subsidiary Dashboard

Build KPI cards: Total Customers, Customers Added This Week.

Build a Recharts bar chart showing customer registrations over the last 30 days.

$$$$

 Step 6.2: Super Admin Global Dashboard

Build global KPI cards.

Build a Recharts pie chart showing Customer Distribution by Subsidiary.

Build a cross-referencing tool: A search bar where the Admin types a phone number, and it lists all subsidiaries that customer interacts with.

Phase 7: Advanced CRM Features (Deep Data Management)

Goal: Evolve the system from simple data capture into a full-fledged customer relationship tool.

$$$$

 Step 7.1: Customer Interaction Logs (Notes & History)

Create an interaction_logs table (id, customer_id, user_id, note, created_at).

Add a "Notes" tab to the Customer Profile Modal where subsidiary admins can type timestamped updates (e.g., "Customer requested a 48kg gas delivery next Friday").

$$$$

 Step 7.2: Bulk CSV Data Import Engine

Build a drag-and-drop CSV uploader using react-dropzone.

Implement a mapping UI so users can map their legacy Excel spreadsheet columns (e.g., "First Name", "Size") to the database fields and JSONB metadata.

Process the upload in chunks to prevent server timeouts.

$$$$

 Step 7.3: Audit Trails (Security)

Create an audit_logs table.

Trigger a database function or edge function whenever a customer record is updated to log "who changed what" (e.g., "John Doe updated phone number for Jane Smith").

Phase 8: Business Intelligence & Automation (Super Admin Focus)

Goal: Provide the Marketing Manager with high-level tools to drive revenue and cross-company synergies.

$$$$

 Step 8.1: Geographic Distribution Mapping

Integrate a lightweight mapping library (like react-leaflet or Google Maps).

Allow the Super Admin to view a heatmap or scatter plot of where customers are concentrated based on their location or physical_address fields (highly useful for optimizing Onset Transport routes).

$$$$

 Step 8.2: Cross-Selling Lead Generator

Build an internal tool on the Master Dashboard that automatically highlights "VIP Cross-Sell Targets."

Logic: Find customers who buy from Ecomatt Butcheries but don't buy from Flora Gas, and generate a downloadable lead list for the Flora Gas sales team.

$$$$

 Step 8.3: Webhooks for External Marketing

Build a settings page where the Super Admin can paste a Webhook URL (e.g., to Zapier, Mailchimp, or an SMS gateway).

Trigger this webhook automatically whenever a new customer is added, allowing Ensign Holdings to instantly send automated "Welcome" SMS messages.

$$$$

 Step 8.4: System Theming

Implement next-themes to support system Dark/Light mode, ensuring it matches the aesthetic of the provided UI references seamlessly.
