import 'dotenv/config';
import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !user || !password) {
  throw new Error('Set NEO4J_URI, NEO4J_USERNAME, and NEO4J_PASSWORD in backend/.env');
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const db = process.env.NEO4J_DATABASE || 'neo4j';

const categories = [
  { category_id: '1', category_name: 'Dog' },
  { category_id: '2', category_name: 'Cat' },
  { category_id: '3', category_name: 'Rabbit' },
  { category_id: '4', category_name: 'Small Animal' },
];

const shelters = [
  { shelter_id: '1', shelter_name: 'Happy Paws Shelter', location: 'Chennai', contact: '9876543210' },
  { shelter_id: '2', shelter_name: 'Animal Care Shelter', location: 'Tambaram', contact: '9876501234' },
  { shelter_id: '3', shelter_name: 'Hope Animal Shelter', location: 'Velachery', contact: '9876512345' },
];

const users = [
  { user_id: '1', name: 'Arun', email: 'arun@example.com', phone: '9876543201', address: 'Chennai', role: 'Adopter' },
  { user_id: '2', name: 'Kiran', email: 'kiran@example.com', phone: '9876543202', address: 'Tambaram', role: 'Adopter' },
  { user_id: '3', name: 'Rahul', email: 'rahul@example.com', phone: '9876543203', address: 'Chennai', role: 'Donor' },
  { user_id: '4', name: 'Priya', email: 'priya@example.com', phone: '9876543204', address: 'Velachery', role: 'Adopter' },
];

const volunteers = [
  { volunteer_id: '1', name: 'Ravi', phone: '9876543211', experience: '2 years' },
  { volunteer_id: '2', name: 'Kumar', phone: '9876543212', experience: '3 years' },
  { volunteer_id: '3', name: 'Sneha', phone: '9876543213', experience: '4 years' },
];

const pets = [
  { pet_id: '101', name: 'Bruno', breed: 'Labrador', age: 2, gender: 'Male', status: 'Adopted', shelter_id: '1', category_id: '1' },
  { pet_id: '102', name: 'Milo', breed: 'Persian', age: 1, gender: 'Male', status: 'Adopted', shelter_id: '1', category_id: '2' },
  { pet_id: '103', name: 'Rocky', breed: 'Indie', age: 3, gender: 'Male', status: 'Adopted', shelter_id: '1', category_id: '1' },
  { pet_id: '104', name: 'Lucky', breed: 'Indie', age: 1, gender: 'Male', status: 'Available', shelter_id: '1', category_id: '1' },
  { pet_id: '105', name: 'tomy', breed: 'Indie', age: 2, gender: 'Male', status: 'Available', shelter_id: '1', category_id: '1' },
  { pet_id: '106', name: 'sravy', breed: 'Persian', age: 1, gender: 'Female', status: 'Available', shelter_id: '1', category_id: '2' },
];

const adoptions = [
  { adoption_id: 'A101', application_date: '2026-10-01', status: 'Approved', user_id: '1', pet_id: '101' },
  { adoption_id: 'A102', application_date: '2026-10-05', status: 'Approved', user_id: '2', pet_id: '102' },
  { adoption_id: 'A103', application_date: '2026-10-08', status: 'Approved', user_id: '3', pet_id: '103' },
  { adoption_id: 'A104', application_date: '2026-10-12', status: 'Pending', user_id: '4', pet_id: '104' },
];

const donations = [
  { donation_id: 'D101', amount: 5000, donation_date: '2026-10-02', user_id: '1', shelter_id: '1' },
  { donation_id: 'D102', amount: 4500, donation_date: '2026-10-06', user_id: '2', shelter_id: '2' },
  { donation_id: 'D103', amount: 7000, donation_date: '2026-10-10', user_id: '3', shelter_id: '1' },
];

const rescues = [
  { rescue_id: 'R101', rescue_date: '2026-09-15', rescue_location: 'Chennai', pet_id: '104', volunteer_ids: ['1'] },
  { rescue_id: 'R102', rescue_date: '2026-09-20', rescue_location: 'Tambaram', pet_id: '105', volunteer_ids: ['2'] },
  { rescue_id: 'R103', rescue_date: '2026-09-25', rescue_location: 'Velachery', pet_id: '106', volunteer_ids: ['3'] },
];

async function main() {
  const session = driver.session({ database: db });
  try {
    for (const label of [
      'User',
      'Pet',
      'PetCategory',
      'Shelter',
      'Adoption',
      'Volunteer',
      'RescueEvent',
      'Donation',
    ]) {
      const idKey =
        label === 'PetCategory'
          ? 'category_id'
          : label === 'Shelter'
          ? 'shelter_id'
          : label === 'RescueEvent'
          ? 'rescue_id'
          : label === 'Adoption'
          ? 'adoption_id'
          : label === 'Donation'
          ? 'donation_id'
          : `${label.toLowerCase()}_id`;
      await session.run(
        `CREATE CONSTRAINT ${label.toLowerCase()}_id_unique IF NOT EXISTS FOR (n:${label}) REQUIRE n.${idKey} IS UNIQUE`
      );
    }

    await session.executeWrite(async (tx) => {
      for (const [label, rows, key] of [
        ['User', users, 'user_id'],
        ['Shelter', shelters, 'shelter_id'],
        ['PetCategory', categories, 'category_id'],
        ['Volunteer', volunteers, 'volunteer_id'],
      ] as const) {
        await tx.run(
          `UNWIND $rows AS row MERGE (n:${label} {${key}:row.${key}}) SET n += row`,
          { rows }
        );
      }

      await tx.run(
        `UNWIND $rows AS row
         MATCH (s:Shelter {shelter_id:row.shelter_id}), (c:PetCategory {category_id:row.category_id})
         MERGE (p:Pet {pet_id:row.pet_id})
         SET p += row
         MERGE (p)-[:HOUSED_AT]->(s)
         MERGE (p)-[:BELONGS_TO]->(c)`,
        { rows: pets }
      );

      await tx.run(
        `UNWIND $rows AS row
         MATCH (u:User {user_id:row.user_id}), (p:Pet {pet_id:row.pet_id})
         MERGE (a:Adoption {adoption_id:row.adoption_id})
         SET a += row
         MERGE (u)-[:APPLIED_FOR]->(a)
         MERGE (a)-[:FOR_PET]->(p)`,
        { rows: adoptions }
      );

      await tx.run(
        `UNWIND $rows AS row
         MATCH (p:Pet {pet_id:row.pet_id})
         MERGE (r:RescueEvent {rescue_id:row.rescue_id})
         SET r.rescue_id=row.rescue_id, r.rescue_date=row.rescue_date, r.rescue_location=row.rescue_location
         MERGE (r)-[:RESCUED]->(p)
         WITH row, r
         UNWIND row.volunteer_ids AS vid
         MATCH (v:Volunteer {volunteer_id:vid})
         MERGE (v)-[:PARTICIPATED_IN]->(r)`,
        { rows: rescues }
      );

      await tx.run(
        `UNWIND $rows AS row
         MATCH (u:User {user_id:row.user_id}), (s:Shelter {shelter_id:row.shelter_id})
         MERGE (d:Donation {donation_id:row.donation_id})
         SET d += row
         MERGE (d)-[:DONATED_BY]->(u)
         MERGE (d)-[:DONATED_TO]->(s)`,
        { rows: donations }
      );
    });

    const counts = await session.run(
      'MATCH (n) RETURN labels(n)[0] AS label, count(n) AS count ORDER BY label'
    );
    console.log(
      'Verified node counts:',
      counts.records.map((r) => `${r.get('label')}: ${r.get('count')}`).join(', ')
    );
  } finally {
    await session.close();
    await driver.close();
  }
}

main().catch((e) => {
  console.error('Seed failed:', e.message);
  process.exitCode = 1;
});
