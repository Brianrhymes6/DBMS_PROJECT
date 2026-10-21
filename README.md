# Pet Adoption & Rescue · BACSE202 DA3 Mini-Project

A full-stack modern web application extending the Pet Adoption and Rescue domain with a Neo4j graph database. Built for the BACSE202 Database Systems DA3 modern database technology component using React, TypeScript, Express, and Neo4j.

## Features

- **Responsive Interface**: Dark green navigation header with paw-print branding, responsive navigation, pale gray page background, white rounded content panels, and mobile-friendly grid layouts.
- **Live-Data Dashboard**: Real-time aggregated statistics (Total Pets, Available Pets, Adoption Requests, Total Donations, and Volunteers).
- **Pet Catalog**: Responsive pet cards with real-time status badges (`Available`, `Adopted`, `Pending`), breed, age, gender, category, and connected shelter information.
- **Adoption Applications & Rescue Reporting**: Validated forms for submitting adoption requests and reporting rescued animals connected to shelters.
- **Neo4j Graph Visualization**: Interactive graph explorer powered by Cytoscape.js rendering real graph nodes and directed relationships with full node property inspection.
- **Secure Architecture**: Server-side parameterized Cypher queries, Zod input validation, strict rate limiting, security headers via Helmet, and credentials isolated to backend environment variables.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Cytoscape.js, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, Neo4j JavaScript Driver, Zod, Helmet, CORS
- **Database**: Neo4j Graph Database (AuraDB or local instance)

## Prerequisites

- Node.js 20 or newer
- npm
- Neo4j AuraDB instance or local Neo4j Desktop / Community Edition

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```bash
   cp .env.example backend/.env
   ```
   Edit `backend/.env` with your Neo4j database credentials:
   ```env
   NEO4J_URI=neo4j+s://<your-instance-id>.databases.neo4j.io
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=<your-neo4j-password>
   NEO4J_DATABASE=neo4j
   API_PORT=4000
   FRONTEND_ORIGIN=http://localhost:5173
   DEMO_WRITES_ENABLED=false
   ```

3. **Seed database (optional / when database is connected)**:
   ```bash
   npm run seed
   ```

## Development

Start both the backend API and frontend Vite dev server concurrently:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`

## Build & Test

- **Run unit tests**:
  ```bash
  npm test
  ```

- **Build production bundles**:
  ```bash
  npm run build
  ```

## Neo4j Graph Model

- **Nodes**:
  - `User`: Adopters and donors (`user_id`, `name`, `email`, `phone`, `address`, `role`)
  - `Pet`: Rescued and adoptable animals (`pet_id`, `name`, `age`, `gender`, `breed`, `status`)
  - `PetCategory`: Animal types (`category_id`, `category_name`)
  - `Shelter`: Rescue shelters and partner facilities (`shelter_id`, `shelter_name`, `location`, `contact`)
  - `Adoption`: Adoption applications (`adoption_id`, `application_date`, `status`)
  - `Volunteer`: Registered rescue volunteers (`volunteer_id`, `name`, `phone`, `experience`)
  - `RescueEvent`: Incident details (`rescue_id`, `rescue_date`, `rescue_location`)
  - `Donation`: Financial contributions (`donation_id`, `amount`, `donation_date`)

- **Relationships**:
  - `(:User)-[:APPLIED_FOR]->(:Adoption)-[:FOR_PET]->(:Pet)`
  - `(:Pet)-[:BELONGS_TO]->(:PetCategory)`
  - `(:Pet)-[:HOUSED_AT]->(:Shelter)`
  - `(:Volunteer)-[:PARTICIPATED_IN]->(:RescueEvent)-[:RESCUED]->(:Pet)`
  - `(:User)-[:DONATED_BY]-(:Donation)-[:DONATED_TO]->(:Shelter)`
