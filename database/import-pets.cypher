// Local Neo4j: copy sample-pets.csv into the Neo4j import/ directory, then run:
// cypher-shell -u neo4j -p <password> -f database/schema.cypher
// cypher-shell -u neo4j -p <password> -f database/import-pets.cypher
// Hosted Aura: upload the CSV using the Aura console import workflow (where available),
// or run the parameterized application seed script; Aura cannot read a local file:// path.
LOAD CSV WITH HEADERS FROM 'file:///sample-pets.csv' AS row
MATCH (s:Shelter {shelter_id:row.shelter_id}), (c:PetCategory {category_id:row.category_id})
MERGE (p:Pet {pet_id:row.pet_id})
SET p.name=row.name, p.age=toInteger(row.age), p.gender=row.gender,
    p.breed=row.breed, p.status=row.status
MERGE (p)-[:HOUSED_AT]->(s)
MERGE (p)-[:BELONGS_TO]->(c);
