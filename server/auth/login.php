<?php
// Simple login that sets a PHP session. Expects JSON {email, password}
require_once __DIR__ . '/../server/db_connect.php';
session_start();
$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['email']) || !isset($input['password'])){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_input']); exit;
}
try{
  $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
  $stmt->execute([':email'=>$input['email']]);
  $user = $stmt->fetch();
  if($user && password_verify($input['password'], $user['password_hash'])){
    // store minimal info in session
    $_SESSION['user'] = ['id'=>$user['id'],'email'=>$user['email'],'role'=>$user['role']];
    echo json_encode(['ok'=>true,'user'=>$_SESSION['user']]);
  } else {
    http_response_code(401);
    echo json_encode(['error'=>'invalid_credentials']);
  }
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'login_failed']);
}
