<?php
require_once __DIR__ . '/../server/db_connect.php';
$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['id'])){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_input']);
  exit;
}
try{
  $stmt = $pdo->prepare('DELETE FROM team WHERE id = :id');
  $stmt->execute([':id' => (int)$input['id']]);
  echo json_encode(['deleted' => true]);
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'delete_failed']);
}
