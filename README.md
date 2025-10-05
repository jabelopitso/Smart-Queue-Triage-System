🏥 Smart Queue Triage System

A modern patient queue management system built with Next.js, TypeScript, TailwindCSS, and Prisma.
Easily add patients, view a live queue, and manage triage efficiently. Perfect for clinics, hospitals, or triage centers.

✨ Features

Add Patients: Quickly register name, age, and symptoms.

Live Queue: Auto-refreshing patient queue every 5 seconds.

Clear Queue: Reset the queue with a single click.

Responsive Design: Works seamlessly on mobile and desktop.

Modern UI: Gradient cards, styled forms, and clean layouts.

TypeScript + Prisma: Strong typing and easy database integration.

🛠 Tech Stack

Frontend: Next.js (Pages Router), React, TypeScript, TailwindCSS

Backend / API: Next.js API Routes

Database: SQLite (via Prisma ORM)

Styling: TailwindCSS, responsive & gradient designs

🚀 Getting Started
Prerequisites

Node.js ≥ 18

npm ≥ 9

Installation
# Clone the repository
git clone https://github.com/yourusername/Smart-Queue-Triage-System.git
cd Smart-Queue-Triage-System

# Install dependencies
npm install
npm install --save-dev @types/node

DATABASE_URL="file:./dev.db"

# Run migrations and generate Prisma client
npx prisma migrate dev --name init
npx prisma generate

npm run dev

Project Structure
src/
├── components/       # PatientForm & QueueList
├── lib/              # Prisma client (db.ts)
└── pages/
    ├── api/          # API routes
    └── index.tsx     # Homepage
prisma/
├── schema.prisma     # Database schema
public/               # Static assets & images

Future Enhancements

Staff Triage Dashboard

Mark patients as processed

Notifications for next patient

Multiple clinic and queue support

📄 License

MIT License