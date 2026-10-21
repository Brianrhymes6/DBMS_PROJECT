# Demonstration script (2–3 minutes)

1. Introduce the existing normalized pet adoption and rescue system and the DA3 objective: add a graph perspective with Neo4j.
2. Open Schema & Model. Explain that entities become labeled nodes, while typed directed relationships make connections explicit. Mention that Adoption and Donation are nodes because they have their own properties.
3. Open Graph Explorer. Select a pet and trace its shelter, category, application, or rescue connections. Explain that the visualization reflects database results.
4. Open Query Lab. Run the rescue traversal and donation aggregation, then describe how Cypher expresses relationship patterns and returns records.
5. Compare models: Oracle remains useful for structured transactional operations; Neo4j complements it for multi-step relationship analysis.
6. Close by noting the illustrative fictional dataset and the security choice to keep credentials on the backend.

Only perform database-backed steps after the live database and API are connected.

## Viva questions and answers

1. **Why Neo4j?** Its property graph and Cypher make connected multi-hop questions direct to express.
2. **What is a node?** A labeled entity with properties, such as a Pet or Shelter.
3. **What is a relationship?** A typed, directed connection between nodes, such as `HOUSED_AT`.
4. **Why is Adoption a node?** It has attributes such as date and status and connects an adopter with a pet.
5. **How does Cypher express a rescue path?** With a pattern from Volunteer through RescueEvent to Pet and Shelter.
6. **How are duplicate identifiers prevented?** Unique constraints enforce stable IDs; the seed uses `MERGE` for repeatable creation.
7. **Why use parameters?** They separate values from query structure and reduce injection risk.
8. **Why keep Oracle?** Relational systems remain strong for normalized records, constraints, and transactional workloads.
9. **How do donations work?** They are positive-value records linked to a donor and shelter; this prototype does not process payments.
10. **What is the dataset?** Fictional illustrative coursework data, not real personal information.

## Lab checklist

- [ ] Add real team details to `team.md`.
- [ ] Configure an isolated Neo4j database and backend environment.
- [ ] Run schema and idempotent seed; verify counts.
- [ ] Start API and frontend; verify `/api/health` reports connected.
- [ ] Check dashboard, lists, graph explorer, and Cypher Lab against live data.
- [ ] Capture genuine screenshots and record actual test outcomes.
- [ ] Keep credentials private; keep public demo writes disabled unless expressly needed on an isolated graph.
