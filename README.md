# B-API Frontend

Frontend application for the B-API backend built with Next.js 16, React 19, and TypeScript.

## Features

- **Authentication**: Login and registration with JWT
- **Dogs Management**: Full CRUD operations for dogs
- **Cats Listing**: View available cats
- **Protected Routes**: Authentication required for app features
- **Modern UI**: Clean, responsive design with dark mode support

## Prerequisites

- Node.js 20+
- b-api backend running on port 3000

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) with your browser

## Configuration

By default, the app connects to `http://localhost:3000` for the API. To change this, set the `NEXT_PUBLIC_API_URL` environment variable:

```bash
NEXT_PUBLIC_API_URL=http://your-api-url
```

## Project Structure

```
app/
├── page.tsx              # Home page
├── login/                # Login page
├── register/             # Registration page
├── dogs/                 # Dogs management
│   ├── page.tsx         # Dogs list
│   ├── create/          # Create dog
│   └── [id]/edit/       # Edit dog
└── cats/                # Cats page
lib/
├── api.ts               # API client
├── auth.ts              # Auth utilities
└── types.ts             # TypeScript types
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS