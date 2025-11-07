// Auth (demo): store a flag in localStorage
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value;

  // Demo validation (replace with real check)
  if(email === '' || pass === ''){
    alert('Por favor complete los campos');
    return;
  }

  // Simple demo credential: admin@demo / demo
  if(email === 'admin@demo' && pass === 'demo'){
    localStorage.setItem('loggedIn','true');
    // redirect to index
    window.location.href = './index.html';
    return;
  }

  // Accept any email/password for demo (optional). Uncomment to allow any credentials:
  // localStorage.setItem('loggedIn','true'); window.location.href = './index.html';

  // For now, accept any email ending with @coopefacsa.coop.ni OR admin@demo
  if(email.endsWith('@coopefacsa.coop.ni')){
    localStorage.setItem('loggedIn','true');
    window.location.href = './index.html';
    return;
  }

  alert('Credenciales inválidas (demo). Usa admin@demo / demo o cualquier cuenta @coopefacsa.coop.ni');
});

// expose logout function for pages
function logout(){
  localStorage.removeItem('loggedIn');
  window.location.href = './login.html';
}

// Allow calling logout() from other pages via onclick if needed
window.logout = logout;
