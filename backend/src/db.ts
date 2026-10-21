import neo4j, { Driver } from 'neo4j-driver';
let driver: Driver | null = null;
export function getDriver(): Driver | null {
  if (driver) return driver;
  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
  if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) return null;
  driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
  return driver;
}
export async function query<T=Record<string,unknown>>(cypher:string, params:Record<string,unknown>={}):Promise<T[]> {
  const d=getDriver(); if(!d) throw Object.assign(new Error('Neo4j is not configured'),{status:503});
  const session=d.session({database:process.env.NEO4J_DATABASE||'neo4j'});
  try { const result=await session.executeRead(tx=>tx.run(cypher,params)); return result.records.map(r=>r.toObject() as T); }
  finally { await session.close(); }
}
export async function writeQuery<T=Record<string,unknown>>(cypher:string, params:Record<string,unknown>={}):Promise<T[]> {
  const d=getDriver(); if(!d) throw Object.assign(new Error('Neo4j is not configured'),{status:503});
  const session=d.session({database:process.env.NEO4J_DATABASE||'neo4j'});
  try { const result=await session.executeWrite(tx=>tx.run(cypher,params)); return result.records.map(r=>r.toObject() as T); }
  finally { await session.close(); }
}
export async function closeDriver(){if(driver){await driver.close();driver=null;}}
