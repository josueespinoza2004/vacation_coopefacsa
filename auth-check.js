// Simple auth-check: redirect to login.html if no loggedIn flag
(function(){
  try{
    const isLogged = localStorage.getItem('loggedIn') === 'true';
    if(!isLogged){
      // compute relative path to login.html depending on current path
      const loc = window.location.pathname;
      // If we're inside /admin/ pages, go up one level
      const pathParts = loc.split('/');
      // simple heuristic: if path contains /admin/ then use ../login.html else ./login.html
      const target = loc.includes('/admin/') ? '../login.html' : './login.html';
      if(window.location.href.indexOf('login.html') === -1){
        window.location.href = target;
      }
    }
  }catch(e){
    console.error('auth-check error', e);
  }
})();