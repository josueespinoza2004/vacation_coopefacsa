# Crear usuario admin (one-time)

Este documento explica cómo usar el script `create_admin.php` que está en este directorio para crear un usuario administrador en la tabla `users` sin tener que ejecutar SQL manualmente en cPanel.

IMPORTANTE: este script debe usarse una sola vez y luego borrarse del servidor. Además debes configurar un `setup_token` temporal en `server/db_config.php` antes de usarlo y eliminarlo después.

Pasos (resumido)
1. Edita `server/db_config.php` y añade una línea con tu token temporal `setup_token` (string). Ejemplo:

```php
  'debug' => false,
  'setup_token' => 'mi-secreto-temporal-ABC123',
```

2. Sube la carpeta `server/` (incluyendo `create_admin.php`) a tu hosting (por ejemplo `public_html/server/`).

3. Ejecuta la petición POST para crear el admin (ejemplos abajo). Si `create_admin.php` está en `/server/create_admin.php` en tu dominio, usa esa ruta.

4. Verifica en la DB (phpPgAdmin o panel) que el usuario quedó creado:

```sql
SELECT id, email, role, created_at FROM users ORDER BY id DESC LIMIT 5;
```

5. BORRA `server/create_admin.php` del servidor.

6. Remueve `setup_token` de `server/db_config.php` (o ponlo a `null`) y sube los cambios.

---

Ejemplo: crear admin desde la consola del navegador (fetch)

```javascript
fetch('/server/create_admin.php?token=mi-secreto-temporal-ABC123', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@demo', password: 'demo' })
}).then(r => r.json()).then(console.log);
```

Ejemplo: usando PowerShell (Invoke-RestMethod)

```powershell
$body = @{ email = 'admin@demo'; password = 'demo' } | ConvertTo-Json
Invoke-RestMethod -Uri 'https://tu-dominio.com/server/create_admin.php?token=mi-secreto-temporal-ABC123' -Method Post -Body $body -ContentType 'application/json'
```

Ejemplo: usando curl

```bash
curl -X POST 'https://tu-dominio.com/server/create_admin.php?token=mi-secreto-temporal-ABC123' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@demo","password":"demo"}'
```

Respuesta esperada (JSON):

```json
{ "ok": true, "id": 1 }
```

Medidas de seguridad
- Borra `create_admin.php` después de su uso.
- No dejes el `setup_token` configurado en `db_config.php` en producción.
- Usa HTTPS cuando llames al endpoint.
- No compartas el token ni el archivo `db_config.php` con credenciales en repositorios públicos.

Si quieres, puedo crear también una pequeña UI temporal para ejecutar el script desde el navegador; pero siempre recuerda eliminarla luego.
