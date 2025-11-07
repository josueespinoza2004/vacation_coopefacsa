<?php
require_once __DIR__ . '/../server/db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['name'])){
  http_response_code(400);
  echo json_encode(['error'=>'invalid_input']);
  exit;
}

try{
  $stmt = $pdo->prepare('INSERT INTO team (name, role, dept, acumulados, usados, pendientes, status) VALUES (:name,:role,:dept,:ac,:us,:pe,:st) RETURNING *');
  $stmt->execute([
    ':name'=>$input['name'],
    ':role'=>$input['role'] ?? null,
    ':dept'=>$input['dept'] ?? null,
    ':ac'=>$input['acumulados'] ?? 40,
    ':us'=>$input['usados'] ?? 0,
    ':pe'=>$input['pendientes'] ?? 0,
    ':st'=>$input['status'] ?? 'Activo'
  ]);
  $row = $stmt->fetch();
  echo json_encode($row ?: []);
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'insert_failed']);
}
