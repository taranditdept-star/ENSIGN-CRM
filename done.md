# Ensign CRM: Capabilities & Feature Registry (Completed)

This document outlines the current state, capabilities, and technical architecture of the Ensign CRM as of March 24, 2026.

## 🏛️ Core Architecture & Design
- **Stack**: Next.js 15 (App Router), Supabase (Auth & PG), Tailwind CSS (Vanilla), Lucide Icons.
- **Aesthetic**: Premium "Glassmorphic" UI with frosted-glass containers, vivid gradients, and high-fidelity typography (Inter/Outfit).
- **Branding**: Dynamic Theme Injection system that automatically adjusts the entire dashboard accent colors based on the active subsidiary's industry (e.g., Solar = Amber, Sbali = Pink).

## 🧭 Navigation & UX Professionalization
- **Breadcrumb Navigation**: Real-time path tracking (e.g., `Admin > Organizations > Flora Gas`) with bold, pill-style segmenting for high contrast and deep-dive context.
- **Admin Header**: Global quick actions (Add Org, Add Branch, Export) decoupled from the sidebar for maximum vertical space.
- **Branch Navigation 2.0**: A refined organizational tree with better hierarchy, bolder branding badges, and a smooth search experience.
- **Mobile Responsiveness**: Dedicated hamburger-menu system with a slide-out drawer containing all tools and navigation.
- **Skeleton "Frosted" Loaders**: Premium, pulsing loading states that eliminate layout shift.

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
- **Sales Performance Module**: A dedicated Command Center module in the sidebar for rapid access to business intelligence.
- **High-Density Data Tables**: Expanded customer lists with explicit columns for **Quantity (KG/Units)**, **Total Price (USD)**, and **Payment Status**.
- **QR Code Manager**: High-resolution PNG/JPG QR generation for every branch with "One-Click Share" link copying.
- **Capture Link Registry**: A master list of all live portal links for easy sharing.
- **Help & Feedback System**: Functional client-side triggers for the Help Center and user feedback submission.
- **Master Customer List**: Consolidated view of all data entries across the entire group.

## 🔐 Security & Operations
- **Supabase Integration**: Robust authorization and server-side data fetching.
- **Stabilized Build**: Resolved critical 500 serialization errors and production Turbopack build failures.
- **Clean Registry**: Removed mock data and terminology (e.g., "Justice Fallback") to ensure a professional, production-ready environment.
