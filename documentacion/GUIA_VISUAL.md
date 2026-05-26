# 📸 Guía Visual - Instalación de MySQL

## 🎯 Paso a Paso con Imágenes Descriptivas

### 1️⃣ Descargar MySQL

**Página de descarga:**
```
┌─────────────────────────────────────────────────┐
│  MySQL Community Downloads                      │
│  ─────────────────────────────────────────────  │
│                                                 │
│  MySQL Installer for Windows                   │
│                                                 │
│  [Download] mysql-installer-community-8.0.xx   │
│             (400 MB)                            │
│                                                 │
│  [No thanks, just start my download] ← CLIC    │
└─────────────────────────────────────────────────┘
```

### 2️⃣ Instalador de MySQL - Tipo de Instalación

```
┌─────────────────────────────────────────────────┐
│  MySQL Installer                                │
│  ─────────────────────────────────────────────  │
│                                                 │
│  Choosing a Setup Type                          │
│                                                 │
│  ○ Developer Default        ← SELECCIONA ESTE  │
│  ○ Server only                                  │
│  ○ Client only                                  │
│  ○ Full                                         │
│  ○ Custom                                       │
│                                                 │
│              [Cancel]  [Next >]                 │
└─────────────────────────────────────────────────┘
```

### 3️⃣ Configuración de Contraseña

```
┌─────────────────────────────────────────────────┐
│  MySQL Installer - Accounts and Roles           │
│  ─────────────────────────────────────────────  │
│                                                 │
│  MySQL Root Password:                           │
│  ┌─────────────────────────────────────────┐   │
│  │ ●●●●●●●●                                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Repeat Password:                               │
│  ┌─────────────────────────────────────────┐   │
│  │ ●●●●●●●●                                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ⚠️ ANOTA ESTA CONTRASEÑA! La necesitarás     │
│                                                 │
│              [< Back]  [Next >]                 │
└─────────────────────────────────────────────────┘
```

### 4️⃣ MySQL Workbench - Conectar

```
┌─────────────────────────────────────────────────┐
│  MySQL Workbench                                │
│  ─────────────────────────────────────────────  │
│                                                 │
│  MySQL Connections                              │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  🗄️  Local instance MySQL80              │ │
│  │      localhost:3306                       │ │
│  │                                           │ │
│  │      [Connect] ← CLIC AQUÍ               │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 5️⃣ MySQL Workbench - Ejecutar Script

```
┌─────────────────────────────────────────────────────────┐
│  MySQL Workbench - Query                               │
│  ─────────────────────────────────────────────────────  │
│  File  Edit  View  Query  Database  Server  Tools      │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  1  CREATE DATABASE IF NOT EXISTS red_egresados...     │
│  2  USE red_egresados;                                 │
│  3  CREATE TABLE IF NOT EXISTS usuarios (              │
│  4    id INT AUTO_INCREMENT PRIMARY KEY,               │
│  5    cedula VARCHAR(20) UNIQUE NOT NULL,              │
│  ...                                                    │
│                                                         │
│  [⚡ Execute] ← CLIC AQUÍ DESPUÉS DE PEGAR EL SCRIPT  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6️⃣ Verificar Usuarios Cargados

```
┌─────────────────────────────────────────────────────────┐
│  MySQL Workbench - Result Grid                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Query: SELECT * FROM usuarios LIMIT 10;               │
│                                                         │
│  ┌────┬──────────────┬─────────────┬──────────────┐   │
│  │ id │ cedula       │ nombre      │ apellido     │   │
│  ├────┼──────────────┼─────────────┼──────────────┤   │
│  │ 1  │ 11004343198  │ LISBETH...  │ ACOSTA...    │   │
│  │ 2  │ 11085288058  │ ANDREA...   │ ARCINIEGAS...│   │
│  │ 3  │ 11130641294  │ FABIAN...   │ BASTIDAS...  │   │
│  │ 4  │ 11193470035  │ CHRISTIAN...│ BELALCAZAR...│   │
│  │ ...│ ...          │ ...         │ ...          │   │
│  └────┴──────────────┴─────────────┴──────────────┘   │
│                                                         │
│  66 rows returned                                       │
└─────────────────────────────────────────────────────────┘
```

### 7️⃣ Configurar Backend - Archivo .env

```
┌─────────────────────────────────────────────────┐
│  Bloc de notas - server\.env                    │
│  ─────────────────────────────────────────────  │
│  Archivo  Edición  Formato  Ver  Ayuda          │
│  ─────────────────────────────────────────────  │
│                                                 │
│  DB_HOST=localhost                              │
│  DB_USER=root                                   │
│  DB_PASSWORD=root123    ← TU CONTRASEÑA AQUÍ   │
│  DB_NAME=red_egresados                          │
│  DB_PORT=3306                                   │
│  PORT=3001                                      │
│                                                 │
│  [Guardar]                                      │
└─────────────────────────────────────────────────┘
```

### 8️⃣ Iniciar Backend

```
┌─────────────────────────────────────────────────┐
│  C:\...\graduados-master\server> npm start      │
│  ─────────────────────────────────────────────  │
│                                                 │
│  > graduados-server@1.0.0 start                │
│  > node server.js                               │
│                                                 │
│  ✅ Conexión exitosa a MySQL                   │
│  🚀 Servidor corriendo en http://localhost:3001│
│  📊 API disponible en http://localhost:3001/api│
│                                                 │
│  ← SI VES ESTO, ¡ESTÁ FUNCIONANDO!            │
└─────────────────────────────────────────────────┘
```

### 9️⃣ Iniciar Frontend

```
┌─────────────────────────────────────────────────┐
│  C:\...\graduados-master> npm run dev           │
│  ─────────────────────────────────────────────  │
│                                                 │
│  VITE v5.4.19  ready in 1234 ms                │
│                                                 │
│  ➜  Local:   http://localhost:5173/            │
│  ➜  Network: use --host to expose              │
│                                                 │
│  ← ABRE ESTE LINK EN TU NAVEGADOR             │
└─────────────────────────────────────────────────┘
```

### 🔟 Página de Login

```
┌─────────────────────────────────────────────────────────┐
│  🌐 http://localhost:5173/login                        │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│              🎓 Universidad Mariana                     │
│                 Red de Egresados                        │
│                                                         │
│         Inicia sesión para acceder a todos los recursos │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Número de Cédula                               │   │
│  │  ┌───────────────────────────────────────────┐  │   │
│  │  │ 11004343198                               │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │  Contraseña                                     │   │
│  │  ┌───────────────────────────────────────────┐  │   │
│  │  │ ●●●●●●●●●●●                               │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │         [Iniciar Sesión]                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  💡 Credenciales de prueba:                            │
│     Cédula: 1234567890                                 │
│     Contraseña: 1234567890                             │
└─────────────────────────────────────────────────────────┘
```

## ✅ Verificación Final

Si ves esto en tu navegador, ¡TODO ESTÁ FUNCIONANDO! 🎉

```
┌─────────────────────────────────────────────────────────┐
│  🌐 http://localhost:5173                              │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│         Universidad Mariana - Red de Egresados         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ¡Bienvenido de nuevo, LISBETH! 👋             │   │
│  │                                                 │   │
│  │  Tu Red Profesional te Espera                  │   │
│  │                                                 │   │
│  │  [Ver Empleos]  [Explorar Eventos]            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  📊 Nuestra Comunidad en Números                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                 │
│  │5,000+│ │ 250+ │ │ 50+  │ │ 100+ │                 │
│  │Egres.│ │Empleo│ │Event.│ │Empre.│                 │
│  └──────┘ └──────┘ └──────┘ └──────┘                 │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Resumen de Puertos

```
┌─────────────────────────────────────────┐
│  Servicio          Puerto    URL        │
│  ─────────────────────────────────────  │
│  MySQL             3306      -          │
│  Backend (API)     3001      /api       │
│  Frontend (Web)    5173      /          │
└─────────────────────────────────────────┘
```

## 🔍 Comandos de Verificación

```bash
# Verificar MySQL instalado
mysql --version

# Verificar MySQL corriendo
mysql -u root -p -e "SHOW DATABASES;"

# Verificar usuarios en la BD
mysql -u root -p -e "USE red_egresados; SELECT COUNT(*) FROM usuarios;"

# Verificar Backend corriendo
curl http://localhost:3001/api/health

# Verificar Frontend corriendo
curl http://localhost:5173
```

---

¡Con esta guía visual deberías poder configurar todo sin problemas! 🚀
