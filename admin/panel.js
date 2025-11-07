// collaborators loaded from server
let collaborators = [];
const collabBody = document.getElementById('collabBody');
const countEl = document.getElementById('count');

function renderTable(items){
  collabBody.innerHTML = '';
  items.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5">
        <div style="font-weight:700">${c.name}</div>
        <div style="font-size:13px;color:var(--muted)">${c.role}</div>
      </td>
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5">
        <span style="background:#fff;border:1px solid #f0f0f3;padding:6px 8px;border-radius:12px;font-size:13px">${c.dept || c.department || ''}</span>
      </td>
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5;font-weight:700;color:${(c.acumulados||c.acumulados===0)? (c.acumulados>=40? '#27b36a':'#333') : '#333'}">${c.acumulados || 0}</td>
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5">${c.usados || c.utilizados || 0}</td>
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5">
        <span style="display:inline-block;padding:6px 10px;border-radius:12px;background:${(c.pendientes||0)>20? '#27b36a':'#f0b429'};color:#fff;font-weight:700">${c.pendientes || 0} días</span>
      </td>
      <td style="padding:16px 12px;border-top:1px solid #f3f3f5;color:var(--muted)">${c.tasa}</td>
    `;
    collabBody.appendChild(tr);
  });
  countEl.textContent = items.length;
}

// Filtro de búsqueda
const search = document.getElementById('search');
search.addEventListener('input', ()=>{
  const q = search.value.trim().toLowerCase();
  if(!q){ renderTable(collaborators); return; }
  const filtered = collaborators.filter(c => (c.name + ' ' + (c.role||'') + ' ' + (c.dept||c.department||'')).toLowerCase().includes(q));
  renderTable(filtered);
});

// Inicializar: cargar desde server API
API.getTeam().then(arr => {
  collaborators = Array.isArray(arr) ? arr : [];
  renderTable(collaborators);
}).catch(()=>{
  // fallback: empty
  collaborators = [];
  renderTable(collaborators);
});
