// Datos de ejemplo (puedes reemplazarlos desde server)
const birthdays = [
  { name: 'Carlos Rocha', role: 'Encargado de Informática', date: '2025-11-04' },
  { name: 'Josué David Espinoza', role: 'Auxiliar de Informática', date: '2025-11-05' },
  { name: 'David Espinoza', role: 'Auxiliar de Informática', date: '2025-11-03' }
];

// Estado actual del calendario
let current = new Date(2025, 10, 1); // noviembre 2025 (mes base 0)

const monthLabel = document.getElementById('monthLabel');
const calendarGrid = document.getElementById('calendarGrid');
const birthdayList = document.getElementById('birthdayList');

function renderBirthdayList(){
  birthdayList.innerHTML = '';
  // Orden por día
  const month = current.getMonth();
  const year = current.getFullYear();
  const items = birthdays.filter(b => {
    const d = new Date(b.date);
    return d.getMonth() === month && d.getFullYear() === year;
  }).sort((a,b)=> new Date(a.date)-new Date(b.date));

  items.forEach(b => {
    const d = new Date(b.date);
    const day = d.getDate();
    const el = document.createElement('div');
    el.className = 'bday-item';
    el.innerHTML = `
      <div class="bday-left">
        <div class="bday-avatar">🎉</div>
        <div>
          <div class="bday-name">${b.name}</div>
          <div class="bday-role">${b.role}</div>
        </div>
      </div>
      <div class="bday-meta">
        <div class="muted">${day}/` + (month+1) + `/${year}</div>
        <button class="btn">Asignar Libre</button>
      </div>
    `;
    birthdayList.appendChild(el);
  });
}

function renderCalendar(){
  calendarGrid.innerHTML = '';
  const month = current.getMonth();
  const year = current.getFullYear();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay(); // 0=dom
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // month label
  const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  monthLabel.textContent = `${monthNames[month]} ${year}`;

  // headers (dom-lun-mar...)
  const dayNames = ['dom','lun','mar','mié','jue','vie','sáb'];
  dayNames.forEach(dn => {
    const dnEl = document.createElement('div');
    dnEl.className = 'day-name';
    dnEl.textContent = dn;
    calendarGrid.appendChild(dnEl);
  });

  // blank cells before first day
  for(let i=0;i<startWeekday;i++){
    const blank = document.createElement('div');
    blank.className = 'day-cell';
    blank.style.opacity = '0.6';
    calendarGrid.appendChild(blank);
  }

  // populate days
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    const num = document.createElement('div');
    num.className = 'day-number';
    num.textContent = d;
    cell.appendChild(num);

    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const bday = birthdays.find(b => b.date === dateStr);
    if(bday){
      cell.classList.add('birthday');
      const pill = document.createElement('div');
      pill.className = 'bday-pill';
      // show short name
      const short = bday.name.split(' ')[0];
      pill.textContent = short;
      cell.appendChild(pill);
    }

    calendarGrid.appendChild(cell);
  }
}

// Prev / Next
document.getElementById('prevMonth').addEventListener('click', ()=>{
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
  renderBirthdayList();
});

document.getElementById('nextMonth').addEventListener('click', ()=>{
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
  renderBirthdayList();
});

// Inicialización
renderCalendar();
renderBirthdayList();
