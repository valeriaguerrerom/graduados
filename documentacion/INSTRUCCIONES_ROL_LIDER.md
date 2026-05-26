# 🎯 INSTRUCCIONES PARA IMPLEMENTAR ROL LÍDER

## ✅ LO QUE YA HICE POR TI:

1. ✅ Creé la página de Dashboard del Líder (`LeaderDashboardPage.tsx`)
2. ✅ Creé la página para ver detalle de egresados (`LeaderViewProfilePage.tsx`)
3. ✅ Creé la página de login para líderes (`LeaderLoginPage.tsx`)
4. ✅ Agregué las rutas en `App.tsx`
5. ✅ Creé el SQL para la base de datos (`ROL_LIDER_SQL.sql`)
6. ✅ Creé los endpoints del servidor (`AGREGAR_AL_SERVER.js`)

---

## 📋 LO QUE TIENES QUE HACER:

### **PASO 1: Ejecutar el SQL en MySQL Workbench**

1. Abre MySQL Workbench
2. Conecta a tu servidor
3. Abre el archivo `ROL_LIDER_SQL.sql` o copia este código:

```sql
USE red_egresados;

ALTER TABLE usuarios 
ADD COLUMN rol ENUM('egresado', 'lider', 'admin') DEFAULT 'egresado';

CREATE TABLE IF NOT EXISTS lideres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('lider', 'admin') DEFAULT 'lider',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO lideres (cedula, nombre, apellido, email, password, rol) 
VALUES ('lider', 'Coordinador', 'ESIG', 'coordinador@unimar.edu.co', 'lider123', 'lider');
```

4. Click en el rayo ⚡ para ejecutar

---

### **PASO 2: Agregar los endpoints al servidor**

1. Abre el archivo `graduados-master/server/server.js`
2. Busca la línea que dice `app.listen(PORT, () => {`
3. ANTES de esa línea, copia y pega todo el contenido del archivo `AGREGAR_AL_SERVER.js`

---

### **PASO 3: Reiniciar el servidor**

1. Detén el servidor si está corriendo (Ctrl+C)
2. Vuelve a iniciarlo:
```cmd
cd graduados-master\server
node server.js
```

---

### **PASO 4: Probar el sistema**

1. Ve a: `http://localhost:5173/leader/login`
2. Usa estas credenciales:
   - **Usuario:** `lider`
   - **Contraseña:** `lider123`
3. Deberías ver el Dashboard con estadísticas
4. Puedes buscar egresados y ver sus perfiles

---

## 🎨 FUNCIONALIDADES IMPLEMENTADAS:

### **Dashboard del Líder:**
- ✅ Estadísticas generales (total egresados, perfiles completados, encuestas, satisfacción)
- ✅ Tabla de egresados con búsqueda en tiempo real
- ✅ Filtros por nombre, cédula o email
- ✅ Indicadores visuales de estado (perfil completado, encuesta completada)
- ✅ Botón para ver detalle de cada egresado

### **Vista de Detalle:**
- ✅ Información personal completa
- ✅ Información académica
- ✅ Situación laboral
- ✅ Solo lectura (no puede editar)

---

## 🔐 CREDENCIALES DE PRUEBA:

**Líder/Coordinador:**
- Usuario: `lider`
- Contraseña: `lider123`

**Egresado (para probar):**
- Cédula: `1234567890`
- Contraseña: `1234567890`

---

## 🚀 PRÓXIMOS PASOS (OPCIONAL):

Si quieres mejorar el sistema, puedes agregar:
- Exportar datos a Excel
- Gráficos con Chart.js
- Filtros avanzados (por año, programa, etc.)
- Rol de Administrador con permisos de edición

---

¿Alguna duda bb? 💙✨
