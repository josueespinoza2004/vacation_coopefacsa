<?php
// Accepts a JSON payload with keys: team (array), requests (array). Protected by session check.
require_once __DIR__ . '/auth/check_session.php';
// check_session.php will echo json; but here we need session info
session_start();
if(!isset($_SESSION['user'])){
  http_response_code(401);
  echo json_encode(['error'=>'unauthenticated']);
  exit;
}
require_once __DIR__ . '/db_connect.php';
$input = json_decode(file_get_contents('php://input'), true);
if(!$input) { http_response_code(400); echo json_encode(['error'=>'no_input']); exit; }

try{
  // Import team
  if(isset($input['team']) && is_array($input['team'])){
    foreach($input['team'] as $t){
      if(isset($t['id'])){
        $stmt = $pdo->prepare('INSERT INTO team (id,name,role,dept,acumulados,usados,pendientes,status) VALUES (:id,:name,:role,:dept,:ac,:us,:pe,:st) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, dept = EXCLUDED.dept, acumulados = EXCLUDED.acumulados, usados = EXCLUDED.usados, pendientes = EXCLUDED.pendientes, status = EXCLUDED.status');
        $stmt->execute([':id'=>$t['id'],':name'=>$t['name']??null,':role'=>$t['role']??null,':dept'=>$t['dept']??null,':ac'=>$t['acumulados']??40,':us'=>$t['usados']??0,':pe'=>$t['pendientes']??0,':st'=>$t['status']??'Activo']);
      } else {
        $stmt = $pdo->prepare('INSERT INTO team (name,role,dept,acumulados,usados,pendientes,status) VALUES (:name,:role,:dept,:ac,:us,:pe,:st)');
        $stmt->execute([':name'=>$t['name']??null,':role'=>$t['role']??null,':dept'=>$t['dept']??null,':ac'=>$t['acumulados']??40,':us'=>$t['usados']??0,':pe'=>$t['pendientes']??0,':st'=>$t['status']??'Activo']);
      }
    }
  }

  // Import requests
  if(isset($input['requests']) && is_array($input['requests'])){
    foreach($input['requests'] as $r){
      if(isset($r['id'])){
        $stmt = $pdo->prepare('INSERT INTO requests (id,user_id,name,initials,start,"end",days,accumulated,status,created_at) VALUES (:id,:user_id,:name,:initials,:start,:end,:days,:accumulated,:status,:created_at) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, initials=EXCLUDED.initials, start=EXCLUDED.start, "end"=EXCLUDED."end", days=EXCLUDED.days, accumulated=EXCLUDED.accumulated, status=EXCLUDED.status');
        $stmt->execute([':id'=>$r['id'],':user_id'=>$r['user_id']??null,':name'=>$r['name']??null,':initials'=>$r['initials']??null,':start'=>$r['start']??null,':end'=>$r['end']??null,':days'=>$r['days']??null,':accumulated'=>$r['accumulated']??0,':status'=>$r['status']??'pending',':created_at'=>$r['created_at']??date('c')]);
      } else {
        $stmt = $pdo->prepare('INSERT INTO requests (user_id,name,initials,start,"end",days,accumulated,status,created_at) VALUES (:user_id,:name,:initials,:start,:end,:days,:accumulated,:status,:created_at)');
        $stmt->execute([':user_id'=>$r['user_id']??null,':name'=>$r['name']??null,':initials'=>$r['initials']??null,':start'=>$r['start']??null,':end'=>$r['end']??null,':days'=>$r['days']??null,':accumulated'=>$r['accumulated']??0,':status'=>$r['status']??'pending',':created_at'=>$r['created_at']??date('c')]);
      }
    }
  }

  echo json_encode(['ok'=>true]);
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'import_failed','detail'=>$e->getMessage()]);
}
