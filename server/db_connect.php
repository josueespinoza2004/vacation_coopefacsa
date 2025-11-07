<?php
// db_connect.php - create $pdo
header('Content-Type: application/json; charset=utf-8');
try{
  $config = require __DIR__ . '/db_config.php';
  $dsn = sprintf('pgsql:host=%s;port=%d;dbname=%s', $config['host'], $config['port'], $config['dbname']);
  $pdo = new PDO($dsn, $config['user'], $config['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
} catch (Exception $e){
  http_response_code(500);
  if(isset($config['debug']) && $config['debug']){
    echo json_encode(['error' => 'DB connection failed', 'detail' => $e->getMessage()]);
  } else {
    echo json_encode(['error' => 'DB connection failed']);
  }
  exit;
}
