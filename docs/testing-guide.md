# Testing

`npm test` runs the backend Vitest suite. Tests should use a dedicated test graph and never point destructive fixtures at a live coursework or production database. For a configured local graph, verify `GET /api/health`, pet and shelter lists, adoption and rescue traversals, graph output, and each query catalogue example. The API bounds list sizes and accepts parameters rather than interpolating user strings into Cypher.

At scaffold time no Neo4j credentials or installed dependencies were supplied, so database connectivity, end-to-end CRUD, and production smoke tests are pending configuration.
