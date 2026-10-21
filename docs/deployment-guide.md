# Deployment guide

## Required account work

Create a Neo4j AuraDB instance, choose a supported Node.js service for the API and static frontend hosting, and provide the credentials and resulting service URLs. This repository does not create cloud accounts, provision billable resources, or claim public URLs. Keep the Neo4j secret on the backend service only.

## Configure and deploy

1. Set backend `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`, `NEO4J_DATABASE`, `FRONTEND_ORIGIN` and leave `DEMO_WRITES_ENABLED=false` by default.
2. Run `npm run seed` from the repository root against an isolated coursework graph.
3. Deploy the backend with `npm run build` and `npm start` in `backend/`; expose its `/api/health` endpoint.
4. Set frontend build variable `VITE_API_URL` to the backend URL plus `/api`.
5. Deploy the `frontend/` Vite build to a static host.
6. Set backend `FRONTEND_ORIGIN` to the deployed frontend origin and redeploy.
7. Verify health, lists, graph, and read-only query examples using the real public URLs.

Actual deployment and smoke-test URLs must be recorded here after account-authorized deployment; none are claimed by this scaffold.
