# Pet Adoption and Rescue Management System Using Neo4j Graph Database

**Course:** BACSE202 — Database Systems  
**Assignment:** DA3 — Modern Database Technology Extension  
**Team:** See [team.md](team.md); enter actual member details before submission.

## Abstract

This project extends a normalized pet adoption and rescue domain with a Neo4j property graph. It models users, pets, categories, shelters, adoption applications, volunteers, rescue events, and donations as labeled nodes connected by directed, typed relationships. A React dashboard and Express API demonstrate graph-backed lists, bounded Cypher examples, and interactive graph exploration. Seed data is fictional. Live database and deployment results must be recorded only after configuring and verifying those services.

## Introduction and problem statement

The existing project represents users, pets, categories, shelters, adoptions, volunteers, rescue events, and donations through relational entities and normalized schemas. Multi-step questions—such as which volunteers participated in the rescue of a pet now housed at a particular shelter—require following several connected records. DA3 asks how a modern graph database can complement this relational design.

## Objectives and existing project overview

- Preserve the pet adoption and rescue domain and existing entity set.
- Define Neo4j labels, properties, identifier constraints, and relationship directions.
- Demonstrate parameterized Cypher, repeatable seed data, REST access, and graph visualization.
- Compare relational and graph representations without asserting that one replaces the other.

## Why Neo4j

Neo4j stores relationships as first-class graph structures and Cypher expresses patterns and multi-hop traversals compactly. This makes connected rescue and adoption analysis a suitable demonstration. Oracle remains useful for normalized records, structured transactions, and established relational operations; Neo4j is a complementary relationship-focused view.

## Architecture

The browser uses React, TypeScript, Vite, and Cytoscape.js. It calls an Express + TypeScript REST API. The API validates input and uses the official Neo4j JavaScript driver with parameterized queries. Credentials remain on the server. See [architecture.md](architecture.md).

## Graph schema and relationships

Labels: User, Pet, PetCategory, Shelter, Adoption, Volunteer, RescueEvent, Donation. Directed edges: `APPLIED_FOR`, `FOR_PET`, `HOUSED_AT`, `BELONGS_TO`, `PARTICIPATED_IN`, `RESCUED`, `DONATED_BY`, and `DONATED_TO`. See [database-schema.md](database-schema.md) and `database/schema.cypher`.

## Implementation details

The dashboard requests statistics and real graph/list records from the API. The Graph Explorer maps returned nodes and edges to Cytoscape elements. The Cypher Lab runs a finite catalogue of read-only queries; it exposes no arbitrary Cypher endpoint. Demo writes are disabled by default. Input schemas, request size limits, rate limits, HTTP headers, bounded list reads, and server-side error sanitization are included.

## Dataset and import methodology

`backend/src/seed.ts` creates fictional stable IDs and uses `MERGE` to make seeding repeatable. It creates 10 users, 20 pets, 5 shelters, 4 categories, 10 applications, 8 volunteers, 10 rescue events, and 15 donations with valid relationships. `database/sample-pets.csv` and `database/import-pets.cypher` demonstrate CSV import. Hosted Aura cannot read a local `file://` path; use its supported upload workflow or the seed runner.

## Important Cypher queries

See `database/queries.cypher` for pet-shelter matching, location filters, pending applications, volunteer rescue histories, donation aggregation, selected-pet context, and a four-hop volunteer-to-shelter path.

## Screenshots

No screenshots are included because no running database-backed application has been captured in this environment. Add screenshots captured from the actual running application after configuration; do not substitute mockups for live evidence.

## Test cases and actual results

The API and frontend source are scaffolded, but dependencies were not installed and no Neo4j credentials were available at authoring time. Therefore builds, automated test results, database connectivity, CRUD workflows, and production smoke tests remain **not run**. Record actual output and observed results here after following [testing-guide.md](testing-guide.md). Do not report planned checks as passed.

## Relational versus graph comparison

Relational tables and foreign keys excel at structured records and transactional operations. Graph nodes and explicit relationships make traversal across several related entities natural. SQL is broadly effective for tabular aggregation; Cypher concisely matches graph patterns. Graph models add operational and modelling needs and do not remove the value of Oracle. This project uses the graph to study relationship paths.

## Advantages, limitations, and future enhancements

Advantages include readable multi-hop patterns, explicit relationships, and visual exploration. Limitations include the need for a configured Neo4j service, deployment credentials, test data isolation, and further authorization before enabling public writes. Future work can add authenticated roles, complete validated CRUD for all entities, filtering and pagination controls, captured evidence, deployment, and measured query comparisons on equivalent data.

## Conclusion

The implementation scaffold demonstrates how a Neo4j graph can extend the existing pet rescue domain and provides a path to a live database-backed demonstration. Completion evidence depends on installing dependencies, configuring Neo4j, running tests, capturing real screenshots, and deploying with authorized accounts.
