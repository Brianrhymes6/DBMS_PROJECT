import { FormEvent, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Activity, Cat, PawPrint, ShieldCheck, Heart, Users } from 'lucide-react';
import {
  samplePets,
  sampleShelters,
  sampleAdoptions,
  sampleVolunteers,
  sampleDonations,
  sampleGraphData,
  sampleDashboardStats,
} from './sampleData';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

type Page =
  | 'Home'
  | 'Dashboard'
  | 'Pets'
  | 'Adopt'
  | 'Report Rescue'
  | 'Donate'
  | 'Volunteer'
  | 'Records'
  | 'Shelters'
  | 'About'
  | 'Neo4j Graph';

type Row = Record<string, any>;

const pages: Page[] = [
  'Home',
  'Dashboard',
  'Pets',
  'Adopt',
  'Report Rescue',
  'Donate',
  'Volunteer',
  'Records',
  'Shelters',
  'About',
  'Neo4j Graph',
];

async function api(path: string, init?: RequestInit) {
  const r = await fetch(API + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw new Error(data.error || `Request failed (${r.status})`);
  }
  return data;
}

function Tile({ label, value, detail }: { label: string; value: unknown; detail?: string }) {
  const isFormattedCurrency = label === 'Total Donations';
  let formattedValue = '—';
  if (value !== undefined && value !== null && !isNaN(Number(value))) {
    formattedValue = isFormattedCurrency
      ? `₹${Number(value).toLocaleString('en-IN')}`
      : Number(value).toLocaleString('en-IN');
  }

  return (
    <div className="stat-tile">
      <span>{label}</span>
      <b>{formattedValue}</b>
      {detail && <small>{detail}</small>}
    </div>
  );
}

function PetCards({ pets }: { pets: Row[] }) {
  if (!pets.length) {
    return (
      <div className="empty">
        No pet records returned. Connect Neo4j or load sample dataset to show records.
      </div>
    );
  }

  return (
    <div className="pet-grid">
      {pets.map((p, i) => (
        <article className="pet-card" key={p.pet_id || i}>
          <h3>
            <PawPrint size={18} /> {p.name}
          </h3>
          <p>
            <strong>Pet ID:</strong> {p.pet_id}
          </p>
          <p>
            <strong>Breed:</strong> {p.breed || '—'}
          </p>
          <p>
            <strong>Age:</strong> {p.age !== undefined && p.age !== null ? p.age : '—'}
          </p>
          <p>
            <strong>Gender:</strong> {p.gender || '—'}
          </p>
          <p>
            <strong>Category:</strong> {p.category || '—'}
          </p>
          <p>
            <strong>Shelter:</strong> {p.shelter || '—'}
          </p>
          <span className={`pet-status ${String(p.status || '').toLowerCase()}`}>
            {p.status || '—'}
          </span>
        </article>
      ))}
    </div>
  );
}

const graphStylesheet: any = [
  {
    selector: 'node',
    style: {
      'background-color': '#65967f',
      label: 'data(label)',
      'font-size': '11px',
      'text-wrap': 'wrap',
      'text-max-width': '100px',
      color: '#29453b',
      'text-valign': 'bottom',
      'text-margin-y': '7px',
      width: '38px',
      height: '38px',
    },
  },
  {
    selector: 'node[type="Pet"]',
    style: {
      'background-color': '#efad81',
      width: '48px',
      height: '48px',
    },
  },
  {
    selector: 'node[type="Shelter"]',
    style: {
      'background-color': '#8cb6a4',
      width: '44px',
      height: '44px',
    },
  },
  {
    selector: 'node[type="User"], node[type="Volunteer"]',
    style: {
      'background-color': '#a4a6d0',
      width: '40px',
      height: '40px',
    },
  },
  {
    selector: 'edge',
    style: {
      width: '2px',
      'line-color': '#aebeb2',
      'target-arrow-color': '#799584',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      label: 'data(label)',
      'font-size': '9px',
      color: '#536c5e',
      'text-background-color': '#ffffff',
      'text-background-opacity': 0.85,
      'text-background-padding': '2px',
    },
  },
];

function DataGraph({ data, onSelect }: { data: Row; onSelect: (node: Row) => void }) {
  const elements = [
    ...(data.nodes || []).map((n: Row) => ({
      data: {
        id: n.id,
        label:
          n.properties?.name ||
          n.properties?.shelter_name ||
          n.properties?.category_name ||
          n.properties?.adoption_id ||
          n.properties?.rescue_id ||
          n.properties?.donation_id ||
          n.label,
        type: n.label,
        props: n.properties,
      },
    })),
    ...(data.relationships || []).map((e: Row, i: number) => ({
      data: {
        id: `r${i}`,
        source: e.source,
        target: e.target,
        label: e.label,
      },
    })),
  ];

  if (!elements.length) {
    return (
      <div className="empty">
        Neo4j graph is empty or unavailable.
      </div>
    );
  }

  return (
    <CytoscapeComponent
      elements={elements}
      layout={{ name: 'cose', animate: false, idealEdgeLength: 100 } as any}
      style={{ width: '100%', height: '520px' }}
      stylesheet={graphStylesheet}
      cy={(cy: any) => {
        if (cy) {
          cy.on('tap', 'node', (e: any) => onSelect(e.target.data()));
        }
      }}
    />
  );
}

export default function App() {
  const [page, setPage] = useState<Page>('Home');
  const [health, setHealth] = useState(false);
  const [stats, setStats] = useState<Row>(sampleDashboardStats);
  const [pets, setPets] = useState<Row[]>(samplePets);
  const [shelters, setShelters] = useState<Row[]>(sampleShelters);
  const [apps, setApps] = useState<Row[]>(sampleAdoptions);
  const [volunteers, setVolunteers] = useState<Row[]>(sampleVolunteers);
  const [donations, setDonations] = useState<Row[]>(sampleDonations);
  const [graph, setGraph] = useState<Row>(sampleGraphData);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState('');

  const refresh = async () => {
    try {
      const all = await Promise.allSettled([
        api('/health'),
        api('/dashboard'),
        api('/pets'),
        api('/shelters'),
        api('/adoptions'),
        api('/graph'),
        api('/volunteers'),
        api('/donations'),
      ]);

      const isLive = all[0].status === 'fulfilled' && all[0].value.status === 'ok';
      setHealth(isLive);

      if (isLive) {
        if (all[1].status === 'fulfilled') setStats(all[1].value.stats || {});
        if (all[2].status === 'fulfilled') setPets(all[2].value.map((x: Row) => x.pet));
        if (all[3].status === 'fulfilled') setShelters(all[3].value.map((x: Row) => x.shelter));
        if (all[4].status === 'fulfilled') setApps(all[4].value.map((x: Row) => x.adoption));
        if (all[5].status === 'fulfilled') setGraph(all[5].value);
        if (all[6].status === 'fulfilled') setVolunteers(all[6].value.map((x: Row) => x.volunteer));
        if (all[7].status === 'fulfilled') setDonations(all[7].value.map((x: Row) => x.donation));
      } else {
        // When backend/Neo4j is not connected (e.g. GitHub Pages preview), load full sample dataset (5-8 records per entity)
        setStats(sampleDashboardStats);
        setPets(samplePets);
        setShelters(sampleShelters);
        setApps(sampleAdoptions);
        setVolunteers(sampleVolunteers);
        setDonations(sampleDonations);
        setGraph(sampleGraphData);
      }
    } catch {
      setHealth(false);
      setStats(sampleDashboardStats);
      setPets(samplePets);
      setShelters(sampleShelters);
      setApps(sampleAdoptions);
      setVolunteers(sampleVolunteers);
      setDonations(sampleDonations);
      setGraph(sampleGraphData);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>, endpoint: string) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setBusy(true);
    setNotice('');
    const data = Object.fromEntries(new FormData(formElement));
    try {
      await api(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setNotice('Saved successfully to Neo4j.');
      formElement.reset();
      await refresh();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Could not save record.');
    } finally {
      setBusy(false);
    }
  };

  const form = (
    title: string,
    description: string,
    fields: { name: string; label: string; type?: string; options?: string[]; placeholder?: string }[],
    endpoint: string,
    submitLabel: string
  ) => (
    <section className="white-card form-card">
      <h2>{title}</h2>
      <p className="muted-copy">{description}</p>
      <form onSubmit={(e) => submit(e, endpoint)}>
        {fields.map((f) => (
          <label key={f.name}>
            {f.label}
            {f.options ? (
              <select name={f.name} required defaultValue="">
                <option value="" disabled>
                  {f.placeholder || 'Select an option'}
                </option>
                {f.options.map((o) => (
                  <option key={o} value={o.includes(' — ') ? o.split(' — ')[0] : o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input name={f.name} type={f.type || 'text'} required />
            )}
          </label>
        ))}
        <button className="submit-button" disabled={busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
      </form>
      {notice && <p className="notice-line">{notice}</p>}
    </section>
  );

  const statsBlock = (
    <section className="white-card">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <Tile label="Total Pets" value={stats.pets} />
        <Tile label="Available Pets" value={stats.available} />
        <Tile label="Adoption Requests" value={stats.applications} />
        <Tile label="Total Donations" value={stats.donation_total} />
        <Tile label="Volunteers" value={stats.volunteers} />
        <Tile label="Rescue Events" value={stats.rescues} />
        <Tile label="Pending Applications" value={stats.pending} />
        <Tile label="Shelters" value={stats.shelters} />
      </div>
      <p className="live-note">
        <Activity size={15} />{' '}
        {health
          ? 'Statistics are loaded live from the Neo4j database.'
          : 'Displaying coursework sample dataset (5 to 8 records per entity). Connect Neo4j backend for live database queries.'}
      </p>
    </section>
  );

  return (
    <div className="site">
      <header className="site-head">
        <div className="head-inner">
          <div className="site-title">
            <span>🐾</span>
            <div>
              <h1>Pet Adoption &amp; Rescue</h1>
              <p>Give rescued animals a safe home and a second chance.</p>
            </div>
          </div>
          <span className={`connection ${health ? 'connected' : 'disconnected'}`}>
            <i />
            {health ? 'Neo4j Connected' : 'Sample Dataset Mode'}
          </span>
        </div>
        <nav className="site-nav">
          {pages.map((p) => (
            <button
              key={p}
              className={page === p ? 'current' : ''}
              onClick={() => {
                setPage(p);
                setNotice('');
              }}
            >
              {p}
            </button>
          ))}
        </nav>
      </header>

      <main className="site-main">
        {page === 'Home' && (
          <>
            <section className="white-card welcome">
              <h2>Welcome to Pet Adoption &amp; Rescue</h2>
              <p>
                Find pets looking for loving homes, report animals in need, support shelters
                through donations, and join rescue activities.
              </p>
            </section>

            {statsBlock}

            <section className="white-card">
              <div className="card-heading">
                <div>
                  <h2>Pets Looking for Homes</h2>
                  <p className="muted-copy">
                    {health
                      ? 'Pet information is loaded from the Neo4j database.'
                      : 'Pet information loaded from the DA3 sample dataset.'}
                  </p>
                </div>
                <button className="link-button" onClick={() => setPage('Pets')}>
                  View all pets →
                </button>
              </div>
              <PetCards pets={pets.filter((p) => p.status === 'Available').slice(0, 8)} />
            </section>
          </>
        )}

        {page === 'Dashboard' && statsBlock}

        {page === 'Pets' && (
          <section className="white-card">
            <h2>Pets Looking for Homes</h2>
            <p className="muted-copy">
              {health
                ? 'Pet information is loaded from the Neo4j database.'
                : 'Pet information loaded from the DA3 sample dataset.'}
            </p>
            <PetCards pets={pets} />
          </section>
        )}

        {page === 'Adopt' &&
          form(
            'Request to Adopt a Pet',
            'Submit an adoption request for an available pet.',
            [
              { name: 'name', label: 'Your Name' },
              { name: 'email', label: 'Email', type: 'email' },
              {
                name: 'pet_id',
                label: 'Select Pet',
                placeholder: 'Select an available pet',
                options: pets
                  .filter((p) => p.status === 'Available')
                  .map((p) => `${p.pet_id} — ${p.name}`),
              },
            ],
            '/adoptions',
            'Submit Adoption Request'
          )}

        {page === 'Report Rescue' &&
          form(
            'Report a Rescued Pet',
            'Add a rescued pet and record its rescue event. The pet will be connected to the default shelter (ID 1).',
            [
              { name: 'name', label: 'Pet Name' },
              { name: 'breed', label: 'Breed' },
              { name: 'age', label: 'Age', type: 'number' },
              {
                name: 'gender',
                label: 'Gender',
                options: ['Male', 'Female', 'Unknown'],
              },
              {
                name: 'category_id',
                label: 'Category',
                options: [
                  '1 — Dog',
                  '2 — Cat',
                  '3 — Rabbit',
                  '4 — Bird',
                  '5 — Small Mammal',
                  '6 — Reptile',
                ],
              },
              { name: 'rescue_location', label: 'Rescue Location' },
            ],
            '/rescues',
            'Record Rescued Pet'
          )}

        {page === 'Donate' && (
          <>
            {form(
              'Support a Shelter',
              'Record a donation for a shelter. Academic prototype; this application does not process payments.',
              [
                { name: 'name', label: 'Your Name' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'amount', label: 'Donation Amount (₹)', type: 'number' },
                {
                  name: 'shelter_id',
                  label: 'Select Shelter',
                  placeholder: 'Select a shelter',
                  options: shelters.map((s) => `${s.shelter_id} — ${s.shelter_name}`),
                },
              ],
              '/donations',
              'Record Donation'
            )}

            <section className="white-card">
              <h2>Recent Donations ({donations.length})</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Donation ID</th>
                      <th>Donor</th>
                      <th>Shelter</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((d, i) => (
                      <tr key={d.donation_id || i}>
                        <td>{d.donation_id}</td>
                        <td>{d.donor}</td>
                        <td>{d.shelter}</td>
                        <td>₹{Number(d.amount).toLocaleString('en-IN')}</td>
                        <td>{d.donation_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {page === 'Volunteer' && (
          <section className="white-card">
            <h2>Registered Volunteers ({volunteers.length})</h2>
            <p className="muted-copy">
              Volunteers participate in rescue events and support partner shelters.
            </p>
            <div className="shelter-grid">
              {volunteers.map((v, i) => (
                <article className="shelter-card" key={v.volunteer_id || i}>
                  <h3>
                    <Users size={16} /> {v.name}
                  </h3>
                  <p>
                    <strong>ID:</strong> {v.volunteer_id}
                  </p>
                  <p>
                    <strong>Phone:</strong> {v.phone}
                  </p>
                  <b>Experience: {v.experience}</b>
                </article>
              ))}
            </div>
            <div className="info-callout" style={{ marginTop: '20px' }}>
              Open the Neo4j Graph page to explore how volunteers connect to rescue events, pets,
              and shelters.
            </div>
            <button className="submit-button" onClick={() => setPage('Neo4j Graph')}>
              Explore volunteer relationships in graph
            </button>
          </section>
        )}

        {page === 'Records' && (
          <section className="white-card">
            <h2>Adoption Applications ({apps.length})</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Adopter</th>
                    <th>Pet</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((a, i) => (
                    <tr key={a.adoption_id || i}>
                      <td>{a.adoption_id}</td>
                      <td>{a.adopter}</td>
                      <td>{a.pet}</td>
                      <td>{a.application_date}</td>
                      <td>
                        <span className={`pet-status ${String(a.status).toLowerCase()}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {page === 'Shelters' && (
          <section className="white-card">
            <h2>Partner Shelters ({shelters.length})</h2>
            <div className="shelter-grid">
              {shelters.map((s, i) => (
                <article className="shelter-card" key={s.shelter_id || i}>
                  <h3>⌂ {s.shelter_name}</h3>
                  <p>{s.location}</p>
                  <p>Contact: {s.contact}</p>
                  <p>{s.pets?.length || 0} pets currently connected</p>
                  <b>Donation total: ₹{Number(s.donation_total || 0).toLocaleString('en-IN')}</b>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === 'About' && (
          <section className="white-card">
            <h2>About the Project</h2>
            <p>
              Pet Adoption and Rescue Management System · BACSE202 Database Systems · DA3 Modern
              Database Technology Extension.
            </p>
            <p>
              This project preserves the pet adoption and rescue domain and integrates Neo4j graph
              relationships for exploring adoption, shelter, rescue, volunteer, and donation
              connections.
            </p>
            <div className="info-callout">
              <ShieldCheck size={18} /> Academic coursework project. Includes 5 to 8 records for
              every core entity (Users, Pets, Pet Categories, Shelters, Adoption Applications,
              Volunteers, Rescue Events, and Donations). Neo4j credentials remain securely on the
              backend; public write access is restricted by default.
            </div>
          </section>
        )}

        {page === 'Neo4j Graph' && (
          <section className="white-card">
            <div className="card-heading">
              <div>
                <h2>Neo4j Relationship Graph</h2>
                <p className="muted-copy">
                  {health
                    ? 'Live nodes and directed relationships read from Neo4j.'
                    : 'Interactive graph visualization of the DA3 dataset nodes and directed relationships.'}{' '}
                  Drag, zoom, pan, and select a node to inspect its properties.
                </p>
              </div>
              <span className={`connection ${health ? 'connected' : 'disconnected'}`}>
                <i /> {health ? 'Live Neo4j' : 'Sample Dataset'}
              </span>
            </div>
            <div className="graph-wrap">
              <DataGraph
                data={graph}
                onSelect={(n) =>
                  setSelected(JSON.stringify({ label: n.type, properties: n.props }, null, 2))
                }
              />
            </div>
            <div className="graph-legend">
              <span>
                <i className="pet-dot" />
                Pets (8)
              </span>
              <span>
                <i className="shelter-dot" />
                Shelters (6)
              </span>
              <span>
                <i className="people-dot" />
                Users (8) / Volunteers (6)
              </span>
              <span>
                <i className="other-dot" />
                Categories (6) / Events (7) / Donations (8) / Adoptions (7)
              </span>
            </div>
            <pre className="node-inspector">
              {selected || 'Select a graph node to inspect its properties.'}
            </pre>
          </section>
        )}
      </main>

      <footer className="site-foot">
        Pet Adoption &amp; Rescue <span>·</span> BACSE202 DA3 <span>·</span> <Cat size={14} />
      </footer>
    </div>
  );
}
