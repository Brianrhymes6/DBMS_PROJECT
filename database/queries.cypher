// 1. Pets and their shelters
MATCH (p:Pet)-[:HOUSED_AT]->(s:Shelter) RETURN p.name,s.shelter_name LIMIT 25;
// 2. Available pets in a chosen location
MATCH (p:Pet {status:'Available'})-[:HOUSED_AT]->(s:Shelter) WHERE s.location=$location RETURN p.name,p.breed,s.location;
// 3. Pending adoption applications
MATCH (u:User)-[:APPLIED_FOR]->(a:Adoption {status:'Pending'})-[:FOR_PET]->(p:Pet) RETURN u.name,p.name,a.application_date;
// 4. Rescue histories and participating volunteers
MATCH (v:Volunteer)-[:PARTICIPATED_IN]->(r:RescueEvent)-[:RESCUED]->(p:Pet) RETURN r.rescue_location,p.name,collect(v.name);
// 5. Donation totals by shelter
MATCH (d:Donation)-[:DONATED_TO]->(s:Shelter) RETURN s.shelter_name,sum(d.amount) AS total ORDER BY total DESC;
// 6. Context around a selected pet (parameter: $petId)
MATCH (p:Pet {pet_id:$petId})-[r]-(n) RETURN p,type(r),n;
// 7. Four-hop volunteer → event → pet → shelter traversal
MATCH path=(v:Volunteer)-[:PARTICIPATED_IN]->(:RescueEvent)-[:RESCUED]->(p:Pet)-[:HOUSED_AT]->(s:Shelter) RETURN v.name,p.name,s.shelter_name LIMIT 25;
