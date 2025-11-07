<?php
require_once __DIR__ . '/../server/db_connect.php';
try{
  $stmt = $pdo->query('SELECT * FROM team ORDER BY name');
  $rows = $stmt->fetchAll();
  echo json_encode($rows);
} catch (Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'query_failed']);
}
