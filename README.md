# Everafter 💍✨  
A wedding services platform concept (mini-app style) that helps couples browse verified vendors, compare packages, calculate budgets, and book + pay securely.

> **Project idea:** “Wedding Hub” inside a wallet app flow (e.g., KBZPay Mini Apps) — one place to discover wedding services and complete bookings with in-app payment.

---

## Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [App Flow](#app-flow)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Run](#setup--run)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Team](#team)
- [License](#license)

---

## About
**Everafter** is a service-based wedding hub designed to reduce the chaos of wedding planning by organizing vendors into clean categories and package-based offerings. Users can browse services (makeup, photography, venues, etc.), view vendor portfolios, chat, choose an event date, and confirm booking with wallet-based payment.

This project focuses on:
- A structured wedding marketplace experience
- Package + category browsing
- Booking flow with payment confirmation
- Scalable service template model (add more services later)

---

## Key Features
- ✅ **Full + Combo Wedding Packages** (featured promotions / hot offers)
- ✅ **Build Your Own Wedding** (mix & match services)
- ✅ **Budget Calculator** (estimate total based on selected services)
- ✅ **Browse by Service Categories** (Makeup, Photography, Venue, Decoration, etc.)
- ✅ **Vendor Detail Pages**
  - Portfolio / gallery
  - Package inclusions
  - Pricing
  - Chat with vendor
  - Select event date
- ✅ **Booking & Payment Flow**
  - Pay full amount (wallet)
  - Receipt / payment proof display

---

## App Flow
**Entry**
1. Open wallet app (e.g., KBZPay)
2. Mini Apps → **Everafter / Wedding Hub**

**Homepage**
- Full + Combo Wedding Packages
- Build Your Own Wedding / Budget Calculator
- Browse by Service Categories

**Browse Services**
- User selects a category (e.g., Makeup)
- System shows vendor list

**Vendor Detail**
- View portfolio + packages + pricing
- Chat
- Pick event date

**Booking & Payment**
- Confirm booking
- Pay via wallet
- Show receipt

---

## Tech Stack
> Update these to match your actual project.

**Frontend:** `React / Next.js / Vite`  
**Backend:** `Node.js / Express` *(optional if you have one)*  
**Database:** `MongoDB` *(optional)*  
**Auth:** `JWT / OAuth / Session` *(optional)*  
**Payments:** Wallet integration concept (e.g., KBZPay) *(demo/mock or real integration)*

---

## Project Structure
> Example structure — edit to match your repository.

```bash
everafter/
├── client/                 # Frontend app
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Backend API (optional)
│   ├── src/
│   └── package.json
├── docs/                   # Documentation / diagrams / slides
├── README.md
└── .env.example
