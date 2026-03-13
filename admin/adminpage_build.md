# VCET Admin Panel: Build Overview & Documentation

This document provides a comprehensive technical and visual overview of the VCET Admin Panel, detailing the architecture, design philosophy, and module-specific features implemented during the recent transformation.

## 1. Project Overview
The VCET Admin Panel is a high-performance, premium management interface designed for the administrators of Vidyavardhini's College of Engineering & Technology (VCET). It serves as a centralized hub for managing institutional data, student events, achievements, and communication.

## 2. Architecture & Tech Stack
- **Frontend Framework**: React (with TypeScript)
- **Styling Engine**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Authentication**: Integrated with a flexible Auth Context (supporting Mock Auth for development).
- **Data Layer**: Centralized API client with a robust `mockStore` for seamless frontend-independent development.

## 3. Design Philosophy (Premium SaaS)
The panel follows a unified **Premium SaaS aesthetic**, characterized by:
- **Color Palette**: Deep Navy (#0f172a), Slate (#1e293b), and pure white backgrounds for high contrast and readability.
- **Unified Spacing**: Strict adherence to a `space-y-10` vertical gap between search/header sections and data tables to ensure a balanced, professional layout.
- **Typography**: Inter (Sans-serif) for utility and Playfair Display (Serif) for branding.
- **Interactive Elements**: Custom toggle switches (eye-icons), hover-animated cards, and focused input states.
- **Form Design**: Centered, minimal form layouts that reduce cognitive load for administrators.

## 4. Key Modules & Features

### 🔐 Authentication (Login)
- **Split-Screen UI**: A world-class split-screen layout with a branding-heavy left panel and a clean, secure login form on the right.
- **Branding**: Displays "VCET: Empowering Administration" with a sophisticated serif typeface.
- **Security Features**: Password reveal toggle, "Remember session" persistence, and Single Sign-On (SSO) secure badging.

### 📊 Dashboard
- **Visit Website Portal**: A direct link at the top to view the public-facing site instantly.
- **Quick Actions**: Six dedicated cards for rapid task execution (e.g., adding a notice, creating an event, or updating the news ticker).
- **Metric Stat Cards**: Dynamic cards showing total counts with color-coded accents for "Published" and "Draft" states.

### 📢 Managed Content Modules
Common features across **Notices**, **Events**, **Achievements**, **Enquiries**, and **Placements**:
- **Breadcrumb Navigation**: Clear paths (e.g., Dashboard / Notices) for easy spatial orientation.
- **Advanced Search & Filtering**: Integrated search bars with "Filter" and "Export" capabilities.
- **Action-Oriented Tables**: High-fidelity tables with rounded avatars, status pills (with activity dots), and icon-based action suites (View/Edit/Delete).
- **Visibility Control**: Interactive "eye-toggle" buttons in the actions column to publish or hide content in real-time.

## 5. Visual Documentation Reference

| Feature | Visual Description | Reference Link |
| :--- | :--- | :--- |
| **Login Page** | Split-screen with navy branding and white form | [Login View]() |
| **Main Dashboard** | Quick Actions and Visit Website link | [Dashboard View]() |
| **Standardized Lists** | Unified spacing and high-fidelity tables | [Module Spacing]() |

## 6. Branding & Assets
- **Logo Integration**: Standardized college logo usage across the Login page, Sidebar, and Dashboard header using the path `/images/VCET logo.jpeg`.
- **Versioning**: Current Build Version: **Admin Portal V1.0**.

---
*Documented on: 2026-03-13*
