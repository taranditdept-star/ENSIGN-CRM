# Ensign CRM: Capabilities & Feature Registry (Completed)

This document outlines the current state, capabilities, and technical architecture of the Ensign CRM as of March 24, 2026.

## 🏛️ Core Architecture & Design
- **Stack**: Next.js 15 (App Router), Supabase (Auth & PG), Tailwind CSS (Vanilla), Lucide Icons.
- **Aesthetic**: Premium "Glassmorphic" UI with frosted-glass containers, vivid gradients, and high-fidelity typography (Inter/Outfit).
- **Branding**: Dynamic Theme Injection system that automatically adjusts the entire dashboard accent colors based on the active subsidiary's industry (e.g., Solar = Amber, Sbali = Pink).

## 🧭 Navigation & UX Professionalization
- **Functional Global Search**: A debounced, real-time search engine in the header that filters all admin tables instantly.
- **Admin Header**: Global quick actions and centralized search for maximum operational efficiency.
- **Branch Navigation 2.0**: A refined organizational tree with better hierarchy and a smooth search experience.
- **Mobile Responsiveness**: Dedicated hamburger-menu system with a slide-out drawer.
- **Skeleton "Frosted" Loaders**: Premium, pulsing loading states for better UX.

## 📈 High-Fidelity Data Capture
- **Dynamic Schema Engine**: A centralized registry (`subsidiarySchemas`) that generates custom forms for 12+ industries (Fuel, Mining, Food, Solar, etc.).
- **Sales-First Capture**: 
  - **Sbali**: Captures Quantity (KG), Total Price (USD), and Payment Status.
  - **Solar**: Track Technical Purchase Descriptions (Inverters, Batteries) and Customer Type.
  - **LPG Gas**: Supports all refill weights (1kg to 77kg+) and cylinder ownership logs.
  - **Branding**: Detailed Service Briefs for Embroidery, Photography, and Design work.
- **Tactile Feedback**: Haptic vibration and sound cues upon successful form submission.
- **Smart Validation**: Real-time visual "Validated" indicators and server-side numeric checks for Prices and Quantities.

## 🛠️ Administrative Strategic Tools
- **Sales Intelligence Dashboard**: A live Command Center module with real-time aggregation of today's revenue and transactions.
- **High-Density Data Tables**: Consolidated customer lists with explicit, **always-visible** columns for **Location**, **Quantity**, **Price**, and **Status**.
- **Connected Action System**: Unified action icons (View, Edit, Delete) that are always accessible and linked to functional modals.
- **QR Code Manager**: High-resolution PNG/JPG QR generation with one-click sharing.
- **Help & Feedback System**: Functional triggers for the Help Center and user feedback submission.
- **Master Customer List**: Consolidated view of all data entries across the entire group.

## 🔐 Security & Operations
- **Supabase Integration**: Robust authorization and server-side data fetching.
- **Stabilized Build**: Resolved critical 500 serialization errors and production Turbopack build failures.
- **Clean Registry**: Removed mock data and terminology (e.g., "Justice Fallback") to ensure a professional, production-ready environment.
