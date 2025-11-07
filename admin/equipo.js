// team loaded from server
let team = [];
const teamList = document.getElementById('teamList');
const searchEl = document.getElementById('search');
const deptFilter = document.getElementById('departmentFilter');
const addBtn = document.getElementById('addBtn');

function uniqueDepts(items){
  const set = new Set(items.map(i=>i.dept));
  return Array.from(set).sort();
}

function renderFilters(){
  const depts = uniqueDepts(team);
  deptFilter.innerHTML = '<option value="all">Todos</option>' + depts.map(d=>`<option value="${d}">${d}</option>`).join('');
}

function renderList(){
  const q = searchEl.value.trim().toLowerCase();
  const dept = deptFilter.value;
  teamList.innerHTML = '';
  const items = team.filter(t => {
    const matchQ = (t.name + ' ' + t.role + ' ' + t.dept).toLowerCase().includes(q);
    const matchDept = dept === 'all' ? true : t.dept === dept;
    return matchQ && matchDept;
  });

  items.forEach(t => {
    const row = document.createElement('div');
    row.className = 'team-row';

    const left = document.createElement('div');
    left.className = 'team-left';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    const initials = t.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
    avatar.textContent = initials;

    const meta = document.createElement('div');
    meta.innerHTML = `<div style="font-weight:700">${t.name}</div><div style="font-size:13px;color:var(--muted)">${t.role}</div>`;

    left.appendChild(avatar);
    left.appendChild(meta);

    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '12px';

    const badges = document.createElement('div');
    badges.className = 'badges';
    badges.innerHTML = `
      <div class="badge">${t.acumulados} días<br><small style="color:var(--muted);font-weight:600">Acumulados</small></div>
      <div class="badge">${t.usados} días<br><small style="color:var(--muted);font-weight:600">Usados</small></div>
      <div class="badge">${t.pendientes} días<br><small style="color:var(--muted);font-weight:600">Pendientes</small></div>
    `;

    const status = document.createElement('div');
    status.textContent = t.status;
    status.style.padding = '6px 8px';
    status.style.borderRadius = '8px';
    status.style.background = t.status === 'Activo' ? '#27b36a' : '#ddd';
    status.style.color = '#fff';
    status.style.fontWeight = '700';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', ()=>{
      alert('Editar: ' + t.name + ' (ejemplo)');
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-del';
    delBtn.textContent = 'Eliminar';
    delBtn.addEventListener('click', ()=>{
      if(confirm('Eliminar colaborador: ' + t.name + '?')){
        // call server API to delete
        API.deleteTeam({ id: t.id }).then(res => {
          team = team.filter(x=>x.id!==t.id);
          renderFilters();
          renderList();
        }).catch(()=>{
          // fallback local
          team = team.filter(x=>x.id!==t.id);
          renderFilters();
          renderList();
        });
      }
    });

    right.appendChild(badges);
    right.appendChild(status);
    right.appendChild(editBtn);
    right.appendChild(delBtn);

    row.appendChild(left);
    row.appendChild(right);

    teamList.appendChild(row);
  });
}

searchEl.addEventListener('input', renderList);
deptFilter.addEventListener('change', renderList);
addBtn.addEventListener('click', ()=>{
  const name = prompt('Nombre completo del colaborador:');
  if(!name) return;
  const role = prompt('Cargo:','');
  const dept = prompt('Departamento:','');
  const payload = { name, role, dept: dept||'Sin asignar', acumulados:40, usados:0, pendientes:0, status:'Activo' };
  API.addTeam(payload).then(res => {
    // res should contain the created row with id
    const created = res || payload;
    team.push(created);
    renderFilters();
    renderList();
  }).catch(()=>{
    // fallback: local creation
    const id = Math.max(0,...team.map(t=>t.id)) + 1;
    payload.id = id;
    team.push(payload);
    renderFilters();
    renderList();
  });
});

// Inicializar: cargar desde server
API.getTeam().then(arr => {
  team = Array.isArray(arr) ? arr : [];
  renderFilters();
  renderList();
}).catch(()=>{
  team = [];
  renderFilters();
  renderList();
});
