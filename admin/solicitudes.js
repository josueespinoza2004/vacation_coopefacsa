// Datos de ejemplo de solicitudes
const requests = [
  { id:1, name:'Carlos Rocha', initials:'CR', start:'2025-11-04T06:00:00.000Z', end:'2025-11-05T06:00:00.000Z', days:1, accumulated:0, status:'pending' },
  { id:2, name:'Josué David Espinoza Salgado', initials:'JD', start:'2025-11-04T06:00:00.000Z', end:'2025-11-04T06:00:00.000Z', days:1, accumulated:0, status:'approved' },
  { id:3, name:'David Espinoza', initials:'DE', start:'2025-11-10T06:00:00.000Z', end:'2025-11-12T06:00:00.000Z', days:1, accumulated:0, status:'rejected' }
];

const container = document.getElementById('requestsContainer');
const tabs = Array.from(document.querySelectorAll('.tab'));
const countPending = document.getElementById('count-pending');
const countApproved = document.getElementById('count-approved');
const countRejected = document.getElementById('count-rejected');

function formatDateRange(s,e){
  // simple date formatting
  const a = new Date(s).toISOString().split('T')[0];
  const b = new Date(e).toISOString().split('T')[0];
  return `${a} - ${b}`;
}

function renderCounts(){
  countPending.textContent = requests.filter(r=>r.status==='pending').length;
  countApproved.textContent = requests.filter(r=>r.status==='approved').length;
  countRejected.textContent = requests.filter(r=>r.status==='rejected').length;
}

function renderList(status){
  container.innerHTML = '';
  const items = requests.filter(r=>r.status===status);
  if(items.length===0){
    const empty = document.createElement('div');
    empty.className = 'panel';
    empty.textContent = 'No hay solicitudes en esta categoría.';
    container.appendChild(empty);
    return;
  }

  items.forEach(r => {
    const card = document.createElement('div');
    card.className = 'request-card';

    const avatar = document.createElement('div');
    avatar.className = 'avatar-circle';
    avatar.textContent = r.initials;

    const content = document.createElement('div');
    content.style.flex = '1';

    const header = document.createElement('div');
    const nameEl = document.createElement('div');
    nameEl.style.fontWeight = '700';
    nameEl.textContent = r.name + ' ';

    const statusSpan = document.createElement('span');
    statusSpan.className = 'status-pill ' + (r.status==='pending' ? 'status-pending' : r.status==='approved' ? 'status-approved' : 'status-rejected');
    statusSpan.textContent = r.status==='pending' ? 'Pendiente' : r.status==='approved' ? 'Aprobada' : 'Rechazada';

    header.appendChild(nameEl);
    header.appendChild(statusSpan);

    const meta = document.createElement('div');
    meta.className = 'muted';
    meta.style.marginTop = '8px';
    meta.innerHTML = `
      <div style="font-size:14px">📅 ${formatDateRange(r.start,r.end)} &nbsp; • &nbsp; ${r.days} días solicitados</div>
      <div style="margin-top:6px">Días acumulados: <strong>${r.accumulated} días</strong></div>
    `;

    content.appendChild(header);
    content.appendChild(meta);

    card.appendChild(avatar);
    card.appendChild(content);

    // actions for pending
    if(r.status==='pending'){
      const actions = document.createElement('div');
      actions.className = 'actions';
      const btnA = document.createElement('button');
      btnA.className = 'btn-approve';
      btnA.textContent = 'Aprobar';
      btnA.addEventListener('click', ()=>{
        updateStatus(r.id,'approved');
      });
      const btnR = document.createElement('button');
      btnR.className = 'btn-reject';
      btnR.textContent = 'Rechazar';
      btnR.addEventListener('click', ()=>{
        updateStatus(r.id,'rejected');
      });
      content.appendChild(actions);
      actions.appendChild(btnA);
      actions.appendChild(btnR);
    }

    container.appendChild(card);
  });
}

function updateStatus(id, newStatus){
  const idx = requests.findIndex(r=>r.id===id);
  if(idx===-1) return;
  requests[idx].status = newStatus;
  // re-render current active tab
  const active = tabs.find(t=>t.classList.contains('active'));
  renderCounts();
  renderList(active ? active.dataset.status : 'pending');
}

// tab switching
tabs.forEach(t=>{
  t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    renderList(t.dataset.status);
  });
});

// init
renderCounts();
renderList('pending');
