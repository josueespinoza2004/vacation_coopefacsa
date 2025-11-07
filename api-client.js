// Small client wrapper to call PHP endpoints
const API = (function(){
  const base = '/server/api'; // adjust if you upload to public_html/api

  function getJson(path){
    return fetch(base + path, { credentials: 'include' }).then(r => r.json());
  }

  function postJson(path, body){
    return fetch(base + path, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(r => r.json());
  }

  return { getRequests: () => getJson('/get_requests.php'), updateRequest: (b) => postJson('/update_request.php', b), getTeam: () => getJson('/get_team.php'), addTeam: (b) => postJson('/add_team.php', b), deleteTeam: (b) => postJson('/delete_team.php', b) };
})();

window.API = API;
