-- schema.sql
-- Ejecutar en la herramienta PostgreSQL de cPanel

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  dept VARCHAR(255),
  acumulados INTEGER DEFAULT 40,
  usados INTEGER DEFAULT 0,
  pendientes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  initials VARCHAR(10),
  start TIMESTAMPTZ,
  "end" TIMESTAMPTZ,
  days INTEGER,
  accumulated INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- sample data: insert a demo user (password: demo)
-- Para generar el hash en PHP: password_hash('demo', PASSWORD_DEFAULT)
-- Reemplaza el hash por uno generado en tu servidor
-- INSERT INTO users (email, password_hash, role) VALUES ('admin@demo', '<PASSWORD_HASH>', 'admin');
