# Panel de Administración - UI de ejemplo

Este pequeño proyecto contiene una página estática que replica la pantalla del panel de administración (tarjetas resumen, lista de cumpleaños y calendario) mostrada en la imagen.

Archivos generados:

# Panel de Administración - UI de ejemplo

Este pequeño proyecto contiene páginas estáticas que replican las vistas del panel de administración (tarjetas resumen, lista de cumpleaños, calendario, solicitudes y equipo).

Estructura de archivos creada:
- `index.html` - Página de inicio (panel principal con calendario)
- `styles.css` - Estilos compartidos
- `script.js` - JS del calendario y lista de cumpleaños
- `admin/panel.html` - Vista "Panel de Vacaciones" (lista de colaboradores)
- `admin/panel.js` - Lógica para renderizar la tabla de colaboradores
- `admin/solicitudes.html` - Vista "Solicitudes de Vacaciones" con pestañas
- `admin/solicitudes.js` - Lógica para pestañas y acciones aprobar/rechazar
- `admin/equipo.html` - Vista "Equipo" con búsqueda y filtro por departamento
- `admin/equipo.js` - Lógica para renderizar el equipo y manejar búsqueda/filtrado

Cómo probarlo
1. Abrir el archivo `index.html` en tu navegador (doble clic o "Abrir con" -> navegador).
2. Usar la barra lateral para navegar entre "Inicio", "Panel de Vacaciones", "Solicitudes" y "Equipo".

Notas
- Los datos son de ejemplo y están embebidos en los archivos JS. Reemplázalos por llamadas a tu API si lo integras en la aplicación real.
- Las rutas usan enlaces relativos para que funcionen abriendo archivos localmente.

 Siguientes pasos recomendados
 - Integrar datos desde un endpoint (fetch).
 - Mejorar accesibilidad (roles ARIA, focus states) y añadir tests.

 Login/Autenticación (comportamiento por defecto)
 - He añadido una página de login: `login.html`. Todas las páginas principales incluyen un chequeo simple (`auth-check.js`) que redirige a `login.html` si no hay una sesión activa (flag `localStorage.loggedIn`).
 - Para iniciar sesión en la demo puedes usar `admin@demo` / `demo`, o cualquier correo que termine en `@coopefacsa.coop.ni`.
 - Para cerrar sesión, llama a `logout()` (la función está disponible en `auth.js`), o elimina `localStorage.loggedIn` desde la consola del navegador.

 Recomendación de uso
 - Abrir el proyecto empezando por `login.html` para iniciar sesión, o abre `index.html` y serás redirigido automáticamente a `login.html` si no estás autenticado.
