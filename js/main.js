document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});


/* ---------- lineage graph ---------- */
const TYPES = {
  root: { ic: 'AR', label: 'profile' },
  hard: { ic: 'HS', label: 'hard skill' },
  tech: { ic: 'TS', label: 'tech stack' },
  soft: { ic: 'SS', label: 'soft skill' },
  expo: { ic: 'EX', label: 'experience' },
  edu: { ic: '✓', label: 'certification & education' }
};
const svg = d => `<svg viewBox="0 0 24 24">${d}</svg>`;
const ICONS = {
  job: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
  cert: svg('<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.500-8"/>'),
  degree: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.500 9 2.500 12 0v-5"/>')
};
// [id, type, title, subtitle, description, parent]
const D = [
  ['me', 'root', 'Aniqa Riasat', 'Data Engineer', 'Data Engineer with 9+ years across ETL, analytics and lakehouse platforms. Click a branch to expand it.', null],

  ['hard', 'hard', 'Hard Skills', 'What I do', 'The languages, platforms and tools I work with.', 'me'],
  ['tech', 'tech', 'Tech Stack', 'How it fits together', 'The tech stack grouped by what it is used for.', 'me'],
  ['soft', 'soft', 'Soft Skills', 'How I work', 'How I collaborate with business and engineering teams.', 'me'],
  ['exp', 'expo', 'Experience', '4 organisations · 2016 – now', 'Where the pipelines run in production.', 'me'],
  ['edu', 'edu', 'Certification & Education', '7 certifications · 2 degrees', 'Validated credentials and the academic foundation.', 'me'],

  ['h-py', 'hard', 'Python', 'Hard skill', 'Primary language for data pipelines, automation and machine learning.', 'hard'],
  ['h-spark', 'hard', 'PySpark', 'Hard skill', 'Distributed data processing with Spark in Python.', 'hard'],
  ['h-fabric', 'hard', 'Microsoft Fabric', 'Hard skill', 'Medallion lakehouse, Fabric notebooks, OneLake and warehouse orchestration.', 'hard'],
  ['h-azure', 'hard', 'Azure', 'Hard skill', 'Cloud data services on Microsoft Azure.', 'hard'],
  ['h-aws', 'hard', 'AWS', 'Hard skill', 'Amazon Web Services, including S3 archiving.', 'hard'],
  ['h-dbx', 'hard', 'Databricks', 'Hard skill', 'Validating and transforming complex pipelines at scale.', 'hard'],
  ['h-sql', 'hard', 'SQL', 'Hard skill', 'Complex queries, optimization and relational design used daily.', 'hard'],
  ['h-mysql', 'hard', 'MySQL', 'Hard skill', 'Relational database design and querying.', 'hard'],
  ['h-elastic', 'hard', 'Elastic', 'Hard skill', 'Elasticsearch search data and validation against source systems.', 'hard'],
  ['h-ssis', 'hard', 'SSIS & SSAS', 'Hard skill', 'SQL Server Integration and Analysis Services for ETL and analytics.', 'hard'],
  ['h-dyn', 'hard', 'Dynamics CRM', 'Hard skill', 'Automating sales operations on Microsoft Dynamics CRM.', 'hard'],

  ['ts-etl', 'tech', 'ETL & Orchestration', 'Tech stack', 'Building and orchestrating data pipelines.', 'tech'],
  ['ts-plat', 'tech', 'Data Platforms & Monitoring', 'Tech stack', 'Lakehouse and cloud platforms with pipeline monitoring.', 'tech'],
  ['ts-stream', 'tech', 'Streaming & Real-Time Analytics', 'Tech stack', 'Real-time data ingestion and analytics.', 'tech'],
  ['ts-bi', 'tech', 'Business Intelligence', 'Tech stack', 'Dashboards and reporting on curated datasets.', 'tech'],
  ['ts-db', 'tech', 'Databases & API', 'Tech stack', 'Relational and search data stores.', 'tech'],

  ['ts-etl-fabric', 'tech', 'Microsoft Fabric', 'ETL & Orchestration', 'Fabric notebooks and pipelines across Medallion layers.', 'ts-etl'],
  ['ts-etl-dbx', 'tech', 'Databricks', 'ETL & Orchestration', 'Databricks pipelines and transformations.', 'ts-etl'],
  ['ts-plat-fabric', 'tech', 'Microsoft Fabric', 'Data Platforms & Monitoring', 'Lakehouse, OneLake and warehouse.', 'ts-plat'],
  ['ts-plat-dbx', 'tech', 'Databricks', 'Data Platforms & Monitoring', 'Databricks workspace and pipeline validation.', 'ts-plat'],
  ['ts-plat-azure', 'tech', 'Microsoft Azure', 'Data Platforms & Monitoring', 'Azure cloud data services.', 'ts-plat'],
  ['ts-stream-fabric', 'tech', 'Microsoft Fabric', 'Streaming & Real-Time', 'Real-time analytics in Fabric.', 'ts-stream'],
  ['ts-stream-dbx', 'tech', 'Databricks', 'Streaming & Real-Time', 'Streaming workloads on Databricks.', 'ts-stream'],
  ['ts-bi-pbi', 'tech', 'Power BI', 'Business Intelligence', 'Dashboards and reports on curated Gold-layer datasets.', 'ts-bi'],
  ['ts-bi-tab', 'tech', 'Tableau', 'Business Intelligence', 'Visual analytics and dashboards.', 'ts-bi'],
  ['ts-db-sql', 'tech', 'SQL', 'Databases & API', 'Relational querying and optimization.', 'ts-db'],
  ['ts-db-mysql', 'tech', 'MySQL', 'Databases & API', 'Relational database.', 'ts-db'],
  ['ts-db-sqlite', 'tech', 'SQLite', 'Databases & API', 'Lightweight embedded database.', 'ts-db'],
  ['ts-db-elastic', 'tech', 'Elastic', 'Databases & API', 'Search and analytics engine.', 'ts-db'],

  ['s-open', 'soft', 'Open Minded', 'Soft skill', 'Welcoming new ideas and perspectives.', 'soft'],
  ['s-adapt', 'soft', 'Adaptability', 'Soft skill', 'Comfortable switching tools, teams and domains.', 'soft'],
  ['s-curious', 'soft', 'Curiosity', 'Soft skill', 'Always digging into how and why things work.', 'soft'],
  ['s-hard', 'soft', 'Hard Working', 'Soft skill', 'Committed to delivering quality results.', 'soft'],
  ['s-fast', 'soft', 'Fast Learner', 'Soft skill', 'Quickly picks up new technologies.', 'soft'],
  ['s-own', 'soft', 'Ownership', 'Soft skill', 'Takes responsibility for outcomes end to end.', 'soft'],

  ['e-del', 'expo', 'Data Engineer', 'Deloitte', 'Microsoft Fabric lakehouse, Medallion pipelines across 20+ tables and Gold datasets for Power BI.', 'exp'],
  ['e-mr', 'expo', 'Data Integrity Specialist', 'MediaRadar', 'Data quality coordination and automated validation across Databricks, SQL Server, PostgreSQL and Elasticsearch.', 'exp'],
  ['e-unb', 'expo', 'Research Assistant', 'UNB · NRC Canada', 'Human activity recognition from 3D skeleton data using LSTM, GCN and Random Forest models.', 'exp'],
  ['e-sse', 'expo', 'Software & Data Engineer', 'Global Rescue', 'SQL, ETL and reporting optimization, S3 archiving and sales automation.', 'exp'],
  ['e-se', 'expo', 'Software Engineer', 'Global Rescue', 'Commission and sales workflow automation with .NET, SQL Server and Dynamics CRM.', 'exp'],
  ['e-ase', 'expo', 'Associate Software Engineer', 'Global Rescue', 'SSIS ETL pipelines and Power BI / SSRS reporting.', 'exp'],

  ['c-dbx', 'edu', 'Databricks Data Engineer Associate', 'Databricks', 'Certification validating Databricks data engineering skills.', 'edu'],
  ['c-fabric', 'edu', 'Fabric Data Engineer Associate', 'Microsoft', 'Certification validating Microsoft Fabric data engineering skills.', 'edu'],
  ['c-azai', 'edu', 'Azure AI Fundamentals', 'Microsoft', 'Certification validating Azure and AI knowledge.', 'edu'],
  ['c-pbi', 'edu', 'Power BI Data Analyst Associate', 'Microsoft', 'Certification validating Power BI skills.', 'edu'],
  ['c-azdata', 'edu', 'Azure Data Fundamentals', 'Microsoft', 'Certification validating core Azure data concepts.', 'edu'],
  ['c-d365', 'edu', 'Dynamics 365 Fundamentals', 'Microsoft', 'Certification validating Dynamics 365 CRM knowledge.', 'edu'],
  ['c-aws', 'edu', 'AWS Cloud Practitioner', 'AWS', 'Certification validating AWS cloud fundamentals.', 'edu'],
  ['c-msc', 'edu', 'M.Sc. Computer Science', 'University of New Brunswick, Canada', 'Graduate degree with research in spatial-temporal machine learning and databases.', 'edu'],
  ['c-beng', 'edu', 'B.Eng. Computer Engineering', 'NUST, Pakistan', 'Undergraduate foundation in engineering, programming and databases.', 'edu']
];

const NW = 280, NH = 52, PITCH = 64, GAP_X = 130, GROUP_GAP = 22;
const N = {};
D.forEach(([id, type, title, sub, desc, parent]) => { N[id] = { id, type, title, sub, desc, parent, children: [], x: 0, y: 0 }; });
Object.values(N).forEach(n => { if (n.parent) N[n.parent].children.push(n.id); });
N.me.depth = 0;
Object.values(N).forEach(n => { n.depth = n.parent ? N[n.parent].depth + 1 : 0; });
Object.values(N).forEach(n => { if (n.depth > 1 && ['hard', 'soft', 'tech'].includes(n.type)) n.sub = ''; });

const graph = document.getElementById('graph');
const viewport = document.getElementById('viewport');
const nodesEl = document.getElementById('nodes');
const edgesEl = document.getElementById('edges');
const detail = document.getElementById('detail');
const NS = 'http://www.w3.org/2000/svg';

Object.values(N).forEach(n => {
  const b = document.createElement('button');
  b.className = `gnode n-${n.type}`;
  b.innerHTML = `<span class="ic">${ICONS[n.id.startsWith('e-') ? 'job' : n.id.startsWith('c-') ? (/msc|beng/.test(n.id) ? 'degree' : 'cert') : ''] || TYPES[n.type].ic}</span><span class="tx"><b></b><small></small></span>`;
  b.querySelector('b').textContent = n.title;
  b.querySelector('small').textContent = n.sub;
  b.dataset.id = n.id;
  n.el = b;
  nodesEl.appendChild(b);
  if (n.parent) {
    n.edge = document.createElementNS(NS, 'path');
    n.edge.setAttribute('class', 'edge hide');
    edgesEl.appendChild(n.edge);
  }
});

let expanded = new Set(), selected = null;

const visibleNode = n => !n.parent || (visibleNode(N[n.parent]) && expanded.has(n.parent));
const ancestors = id => { const out = []; for (let p = N[id].parent; p; p = N[p].parent) out.push(p); return out; };
const descendants = id => N[id].children.flatMap(c => [c, ...descendants(c)]);

/* tidy left-to-right tree: every visible subtree gets the vertical space it needs */
const span = n => {
  const kids = expanded.has(n.id) ? n.children : [];
  if (!kids.length) return PITCH;
  const total = kids.reduce((s, c) => s + span(N[c]), 0);
  return Math.max(PITCH, total + (n.depth === 0 ? GROUP_GAP * (kids.length - 1) : 0));
};
const layout = () => {
  const place = (n, top) => {
    const h = span(n), kids = expanded.has(n.id) ? n.children : [];
    n.x = n.depth * (NW + GAP_X);
    n.y = top + (h - NH) / 2;
    let y = top;
    kids.forEach(c => { place(N[c], y); y += span(N[c]) + (n.depth === 0 ? GROUP_GAP : 0); });
  };
  place(N.me, 0);
  Object.values(N).forEach(n => {
    if (visibleNode(n)) return;
    const a = N[ancestors(n.id).find(p => visibleNode(N[p]))];
    n.x = a.x; n.y = a.y;
  });
};

const render = () => {
  layout();
  const lin = selected ? new Set([selected, ...ancestors(selected), ...descendants(selected)]) : null;
  Object.values(N).forEach(n => {
    const vis = visibleNode(n);
    n.el.style.left = n.x + 'px';
    n.el.style.top = n.y + 'px';
    n.el.classList.toggle('hide', !vis);
    n.el.classList.toggle('sel', n.id === selected);
    n.el.classList.toggle('open', expanded.has(n.id));
    n.el.classList.toggle('dim', !!lin && vis && !lin.has(n.id));
    n.el.tabIndex = vis ? 0 : -1;
    let badge = n.el.querySelector('.more');
    if (vis && n.children.length && !expanded.has(n.id)) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'more'; n.el.appendChild(badge); }
      badge.textContent = '+' + n.children.length;
    } else if (badge) badge.remove();
    if (n.edge) {
      const p = N[n.parent], x1 = p.x + NW, y1 = p.y + NH / 2, x2 = n.x, y2 = n.y + NH / 2, m = (x1 + x2) / 2;
      n.edge.setAttribute('d', `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`);
      const hi = vis && lin && lin.has(n.id) && lin.has(n.parent);
      n.edge.classList.toggle('hide', !vis);
      n.edge.classList.toggle('hi', !!hi);
      n.edge.classList.toggle('dim', vis && !!lin && !hi);
    }
  });
};

const renderDetail = () => {
  if (!selected) { detail.hidden = true; return; }
  const n = N[selected];
  const path = [...ancestors(selected).reverse(), selected].map(k => N[k].title).join(' → ');
  const kids = n.children.map(k => N[k].title);
  detail.hidden = false;
  detail.className = `detail glass n-${n.type}`;
  detail.innerHTML = `<button class="close" aria-label="Close details">×</button><span class="type">${TYPES[n.type].label}</span><h4></h4><p></p><dl><dt>Lineage</dt><dd class="path"></dd>${kids.length ? '<dt>Contains</dt><dd class="kids"></dd>' : ''}</dl>`;
  detail.querySelector('.close').addEventListener('click', () => { selected = null; render(); renderDetail(); });
  detail.querySelector('h4').textContent = n.title;
  detail.querySelector('p').textContent = n.desc;
  detail.querySelector('.path').textContent = path;
  if (kids.length) detail.querySelector('.kids').textContent = kids.join(' · ');
};

/* pan / zoom */
let view = { x: 0, y: 0, k: 1 };
const apply = () => { viewport.style.transform = `translate(${view.x}px,${view.y}px) scale(${view.k})`; };
const fit = () => {
  const vs = Object.values(N).filter(visibleNode);
  const x0 = Math.min(...vs.map(n => n.x)), x1 = Math.max(...vs.map(n => n.x + NW));
  const y0 = Math.min(...vs.map(n => n.y)), y1 = Math.max(...vs.map(n => n.y + NH));
  const w = graph.clientWidth, h = graph.clientHeight, padX = 30, padTop = 56, padBot = 50;
  const k = Math.min((w - padX * 2) / (x1 - x0), (h - padTop - padBot) / (y1 - y0), 1);
  view = { k, x: (w - (x1 - x0) * k) / 2 - x0 * k, y: padTop + (h - padTop - padBot - (y1 - y0) * k) / 2 - y0 * k };
  apply();
};
const zoomAt = (f, cx = graph.clientWidth / 2, cy = graph.clientHeight / 2) => {
  const k = Math.min(2, Math.max(.2, view.k * f)), r = k / view.k;
  view = { k, x: cx - (cx - view.x) * r, y: cy - (cy - view.y) * r };
  apply();
};

let drag = null, moved = false;
graph.addEventListener('pointerdown', e => {
  if (e.target.closest('.glass, .gbtn')) return;
  drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
  moved = false;
});
window.addEventListener('pointermove', e => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!moved && Math.hypot(dx, dy) > 4) { moved = true; graph.classList.add('dragging'); }
  if (moved) { view.x = drag.vx + dx; view.y = drag.vy + dy; apply(); }
});
window.addEventListener('pointerup', () => { drag = null; graph.classList.remove('dragging'); });
graph.addEventListener('wheel', e => {
  if (!e.ctrlKey && !e.metaKey) return;
  e.preventDefault();
  const r = graph.getBoundingClientRect();
  zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - r.left, e.clientY - r.top);
}, { passive: false });

/* interaction */
const collapse = id => { expanded.delete(id); N[id].children.forEach(collapse); };
const refresh = () => { render(); renderDetail(); fit(); };
nodesEl.addEventListener('click', e => {
  const b = e.target.closest('.gnode');
  if (!b || moved) return;
  const n = N[b.dataset.id];
  if (n.children.length) { if (expanded.has(n.id)) collapse(n.id); else expanded.add(n.id); }
  selected = n.id;
  refresh();
});
const reset = () => {
  expanded = new Set(['me']);
  selected = null;
  refresh();
};
document.getElementById('expandAll').addEventListener('click', () => {
  expanded = new Set(Object.values(N).filter(n => n.children.length).map(n => n.id));
  refresh();
});
document.getElementById('resetGraph').addEventListener('click', reset);
document.getElementById('zoomIn').addEventListener('click', () => zoomAt(1.25));
document.getElementById('zoomOut').addEventListener('click', () => zoomAt(1 / 1.25));
document.getElementById('fitView').addEventListener('click', fit);
window.addEventListener('resize', fit);
reset();

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.job, .card, .cert').forEach(el => { el.classList.add('reveal'); io.observe(el); });
