# BACKEND - API REST

Servidor Node.js + Express para la plataforma de egresados

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crear archivo `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=red_egresados
DB_PORT=3306
PORT=3001
```

## 🏃 Ejecutar servidor

```bash
node server.js
```

El servidor estará disponible en: **http://localhost:3001**

## 📡 Endpoints Principales

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/register` - Registrar usuario

### Encuestas
- `POST /api/satisfaction-survey` - Guardar encuesta de satisfacción
- `GET /api/check-survey/:cedula` - Verificar si completó encuesta

### Perfil
- `GET /api/profile/:cedula` - Obtener perfil
- `POST /api/profile` - Guardar perfil completo
- `PUT /api/profile/:cedula` - Actualizar perfil

### Dashboard Líder
- `POST /api/leader/login` - Login de líder
- `GET /api/leader/stats` - Estadísticas generales
- `GET /api/leader/egresados` - Lista de egresados
- `GET /api/leader/egresado/:cedula` - Detalle de egresado

## 📁 Estructura

```
backend/
├── server.js          ← Servidor principal
├── db.js              ← Configuración de base de datos
├── .env               ← Variables de entorno
└── package.json       ← Dependencias
```
