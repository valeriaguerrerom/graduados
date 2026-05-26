# 🗄️ Configuración de MySQL para Red de Egresados

## Requisitos Previos

- MySQL Server 8.0 o superior instalado
- Node.js 18 o superior

## 📋 Pasos de Instalación

### 1. Instalar MySQL (si no lo tienes)

**Windows:**

- Descarga MySQL desde: https://dev.mysql.com/downloads/installer/
- Ejecuta el instalador y sigue las instrucciones
- Anota la contraseña del usuario root

**Linux:**

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS:**

```bash
brew install mysql
brew services start mysql
```

### 2. Crear la Base de Datos

1. Abre MySQL Workbench o la terminal de MySQL:

```bash
mysql -u root -p
```

2. Ejecuta el script SQL ubicado en `server/database.sql`:

```bash
mysql -u root -p < server/database.sql
```

O copia y pega el contenido del archivo en MySQL Workbench.

### 3. Configurar el Backend

1. Navega a la carpeta del servidor:

```bash
cd server
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

4. Edita el archivo `.env` con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=red_egresados
DB_PORT=3306
PORT=3001
```

### 4. Iniciar el Servidor Backend

```bash
npm start
```

O para desarrollo con auto-reload:

```bash
npm run dev
```

El servidor estará corriendo en: http://localhost:3001

### 5. Iniciar el Frontend

En otra terminal, desde la raíz del proyecto:

```bash
npm install
npm run dev
```

El frontend estará corriendo en: http://localhost:5173

## 🔐 Usuarios Precargados

La base de datos viene con 66 usuarios precargados. Todos tienen como contraseña inicial su número de cédula.

**Ejemplos de usuarios:**

- Cédula: `11004343198` / Contraseña: `11004343198` (LISBETH MRCELA ACOSTA USCATEGUI)
- Cédula: `11085288058` / Contraseña: `11085288058` (ANDREA MARGARITA ARCINIEGAS PAZ)
- Cédula: `1234567890` / Contraseña: `1234567890` (Usuario de prueba)

## 📊 Estructura de la Base de Datos

### Tabla: usuarios

| Campo                 | Tipo         | Descripción                          |
| --------------------- | ------------ | ------------------------------------ |
| id                    | INT          | ID único (auto-increment)            |
| cedula                | VARCHAR(20)  | Número de cédula (único)             |
| password              | VARCHAR(255) | Contraseña (por ahora sin encriptar) |
| nombre                | VARCHAR(100) | Nombre del egresado                  |
| apellido              | VARCHAR(100) | Apellido del egresado                |
| email                 | VARCHAR(150) | Correo electrónico                   |
| telefono              | VARCHAR(20)  | Número de teléfono                   |
| ciudad                | VARCHAR(100) | Ciudad de residencia                 |
| direccion             | VARCHAR(255) | Dirección                            |
| programa              | VARCHAR(150) | Programa académico                   |
| año_graduacion        | VARCHAR(4)   | Año de graduación                    |
| empresa               | VARCHAR(150) | Empresa actual                       |
| cargo                 | VARCHAR(100) | Cargo actual                         |
| linkedin              | VARCHAR(255) | URL de LinkedIn                      |
| has_completed_profile | BOOLEAN      | Si completó el perfil                |
| created_at            | TIMESTAMP    | Fecha de creación                    |
| updated_at            | TIMESTAMP    | Fecha de actualización               |

## 🔌 API Endpoints

### POST /api/login

Autenticar usuario

```json
{
  "cedula": "11004343198",
  "password": "11004343198"
}
```

### GET /api/user/:cedula

Obtener información de un usuario

### PUT /api/user/:cedula

Actualizar perfil de usuario

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "3001234567",
  "ciudad": "Pasto",
  "direccion": "Calle 18 #34-104",
  "programa": "Ingeniería de Sistemas",
  "añoGraduacion": "2020",
  "empresa": "Tech Company",
  "cargo": "Desarrollador",
  "linkedin": "https://linkedin.com/in/juanperez"
}
```

### GET /api/users

Listar todos los usuarios (para administración)

## 🔧 Solución de Problemas

### Error: "Access denied for user"

- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el usuario tenga permisos en la base de datos

### Error: "Cannot connect to MySQL"

- Verifica que MySQL esté corriendo: `sudo service mysql status`
- Verifica el puerto en `.env` (por defecto 3306)

### Error: "Database does not exist"

- Ejecuta el script `database.sql` para crear la base de datos

### Error de CORS

- Asegúrate de que el backend esté corriendo en el puerto 3001
- Verifica que el frontend esté configurado para hacer proxy a `/api`

## 🚀 Próximos Pasos

1. **Encriptar contraseñas**: Implementar bcrypt para hashear las contraseñas
2. **JWT Tokens**: Agregar autenticación con tokens JWT
3. **Validaciones**: Agregar validaciones más robustas en el backend
4. **Roles**: Implementar sistema de roles (admin, egresado, empresa)
5. **Recuperación de contraseña**: Sistema de reset de contraseña por email

## 📝 Notas de Seguridad

⚠️ **IMPORTANTE**: Esta es una versión de desarrollo. Para producción:

- Encripta todas las contraseñas con bcrypt
- Usa variables de entorno seguras
- Implementa rate limiting
- Usa HTTPS
- Implementa JWT para sesiones
- Valida y sanitiza todas las entradas
