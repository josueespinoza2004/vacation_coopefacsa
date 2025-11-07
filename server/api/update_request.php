<?php
require_once __DIR__ . '/../server/db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['id']) || !isset($input['status'])){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_input']);
  exit;
}

try{
  $stmt = $pdo->prepare('UPDATE requests SET status = :status WHERE id = :id RETURNING *');
  $stmt->execute([':status'=>$input['status'], ':id'=> (int)$input['id']]);
  $row = $stmt->fetch();
  echo json_encode($row ?: []);
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'update_failed']);
}
