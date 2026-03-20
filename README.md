# Passport Application Experience Redesign

This project is a modern, clean, and intuitive web application designed to simplify the passport application process for end-users. It addresses long, confusing forms by breaking them down into digestible steps, providing clear document upload instructions, and ensuring progress is never lost via an auto-save capability.

## Demo Login credentials
- **Email:** `hire-me@anshumat.org`
- **Password:** `HireMe@2025!`

## Approach Explanation (UX/UI Justification)
1. **Simplified Onboarding:** The initial view clearly communicates what users can expect, reducing anxiety for first-time applicants by outlining the steps and the estimated time required (5-10 minutes).
2. **Step-by-Step Guided Form:** Instead of a massive, overwhelming page, the form is divided into explicitly tracked steps (e.g., "Step 1/5", "Step 2/5"). I used step forms to entirely reduce confusion and cognitive overload.
3. **Draft Auto-save Feature:** A critical product thinking addition. A background auto-save syncs changes every few seconds or on step transitions. A clear "Saved at 2:30 PM" indicator provides peace of mind.
4. **Visual Document Clarity:** Replaced ambiguous bullet points with a clear checklist UI (`Aadhaar ✔️`, `Photo ❌`) so users know precisely what is uploaded and pending.
5. **Modern Aesthetics:** Utilized a clean, premium color palette (blues, crisp whites), smooth micro-animations (fade ins, hover states), and robust CSS variables built entirely using Vanilla CSS.

## 🧠 Design Decisions
Following the assignment criteria, specific targeted UX improvements were made:
- **"Step form use kiya to reduce confusion"**: Breaking the forms into explicit 5 steps (Personal Info, Address, Docs, Review, Appointment) replaces the "heavy long forms" issue immediately. The user can clearly track `"Step X of 5 completed"` through a massive visual progress bar.
- **"Checklist diya to document clarity aaye"**: Reconfigured the Document Upload step heavily, providing visual drag-and-drop combined with a literal Checklist mapping the exact documents required.
- **"Clear Validation Messaging"**: Incorrect inputs are met with exact, clear phrasing (e.g., *"Please enter valid DOB"*, *"Valid 6-digit PIN is required"*), significantly improving the error handling.
- **OTP Login Flow**: Removed traditional tricky password patterns and utilized a mocked "OTP" structure, adapting perfectly for non-tech-savvy/first-time applicants.

## Tech Stack Justification
- **Frontend: React (Vite)**
  - *Why:* Vite provides an exceptionally fast development server. React's component-based architecture is perfect for managing the state of a multi-step form effectively. 
- **Styling: Vanilla CSS**
  - *Why:* As per the assignment constraints to maintain maximum flexibility, pure CSS was chosen over utility libraries like Tailwind. We implemented a robust `:root` design system that mimics the structural benefits of a CSS framework while remaining entirely lightweight and custom.
- **Backend: Node.js (Express)**
  - *Why:* A minimal footprint server that perfectly complements the Javascript frontend. Instead of complex external database dependencies that could complicate a recruiter's evaluation, we utilize an in-memory data store structure to demonstrate functionality (like auto-saving forms and checking demo credentials) seamlessly out-of-the-box.

## Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Start the Backend Server
Open a terminal inside the `/backend` directory:
```bash
cd backend
npm install
node server.js
```
*The backend will run on `http://localhost:5000`*

### 2. Start the Frontend Application
Open a new terminal inside the `/frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`. Open this URL in your browser.*

### 3. Testing the Application
- Navigate to `http://localhost:5173`
- The system will redirect you to the login screen.
- Enter the **Demo Credentials** mentioned above.
- Proceed to start a new application, traverse the form (observe the auto-saving indicator), mock document uploads, and complete the physical appointment booking.
