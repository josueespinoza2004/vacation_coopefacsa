<?php
// create_admin.php
// One-time script to create an admin user without manually running SQL.
// USAGE:
// 1) Set 'setup_token' in server/db_config.php (temporary secret).
// 2) Upload this file to the server (e.g. server/create_admin.php inside public_html).
// 3) Call it once with POST JSON: { "email": "admin@demo", "password": "demo" }
//    Include the token as ?token=YOUR_TOKEN or header X-SETUP-TOKEN: YOUR_TOKEN
// 4) After success, DELETE this file from the server.

header('Content-Type: application/json; charset=utf-8');
// load config
$cfg = require __DIR__ . '/db_config.php';
if(empty($cfg['setup_token'])){
  http_response_code(403);
  echo json_encode(['error'=>'setup_token_not_configured','hint'=>'Set "setup_token" in server/db_config.php before using this script.']);
  exit;
}

$token = $_GET['token'] ?? ($_SERVER['HTTP_X_SETUP_TOKEN'] ?? null);
if(!$token || !hash_equals($cfg['setup_token'], $token)){
  http_response_code(403);
  echo json_encode(['error'=>'invalid_token']);
  exit;
}

// require DB connection (db_connect will require db_config again but that's fine)
require_once __DIR__ . '/db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['email']) || !isset($input['password'])){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_input','hint'=>'POST JSON {"email":"...","password":"..."}']);
  exit;
}

$email = trim($input['email']);
$password = $input['password'];
$role = $input['role'] ?? 'admin';

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_email']);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
try{
  $stmt = $pdo->prepare('INSERT INTO users (email, password_hash, role) VALUES (:email, :hash, :role) RETURNING id');
  $stmt->execute([':email'=>$email, ':hash'=>$hash, ':role'=>$role]);
  $row = $stmt->fetch();
  echo json_encode(['ok'=>true,'id'=>$row['id'] ?? null]);
} catch (Exception $e){
  http_response_code(500);
  // don't leak full DB error unless debug
  if(!empty($cfg['debug'])){
    echo json_encode(['error'=>'insert_failed','detail'=>$e->getMessage()]);
  } else {
    echo json_encode(['error'=>'insert_failed']);
  }
}
