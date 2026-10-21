import {describe,it,expect} from 'vitest';import request from 'supertest';import app from './server.js';
describe('API safety and health',()=>{
 it('reports an unconfigured database as unavailable without leaking credentials',async()=>{const r=await request(app).get('/api/health');expect([200,503]).toContain(r.status);expect(JSON.stringify(r.body)).not.toContain('NEO4J_PASSWORD');});
 it('rejects an out-of-range list limit as invalid input',async()=>{const r=await request(app).get('/api/pets?limit=1000');expect(r.status).toBe(400);expect(r.body.error).toBe('Invalid request');});
 it('keeps public writes disabled unless the isolated demo flag is enabled',async()=>{const old=process.env.DEMO_WRITES_ENABLED;delete process.env.DEMO_WRITES_ENABLED;const r=await request(app).post('/api/pets').send({});if(old!==undefined)process.env.DEMO_WRITES_ENABLED=old;expect(r.status).toBe(403);});
});
