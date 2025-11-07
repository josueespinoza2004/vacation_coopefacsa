<?php
// db_config.php - template. Fill with your cPanel PostgreSQL credentials.
// IMPORTANT: move this file outside public_html in production if possible.
return [
  'host' => 'localhost',
  'port' => 5432,
  'dbname' => 'your_db_name',
  'user' => 'your_db_user',
  'pass' => 'your_db_password',
  // optional: set to false to disable debug errors
  'debug' => false,
  // One-time setup token used by server/create_admin.php.
  // Set to a random value (string) before running create_admin.php, then remove or set to null afterwards.
  // Example:
  // 'setup_token' => 'mi-secreto-temporal-ABC123',
  // After creating the admin user, delete or unset this key to prevent reuse.
  // 'setup_token' => null,
];
