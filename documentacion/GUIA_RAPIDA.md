# 🚀 Guía Rápida de Instalación

## Instalación en 5 Pasos

### 1️⃣ Instalar MySQL
Si no tienes MySQL instalado, descárgalo desde: https://dev.mysql.com/downloads/installer/

### 2️⃣ Crear la Base de Datos
Abre MySQL Workbench o la terminal de MySQL y ejecuta:
```bash
mysql -u root -p < server/database.sql
```

### 3️⃣ Configurar el Backend
```bash
cd server
npm install
copy .env.example .env
```

Edita el archivo `.env` con tus credenciales de MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=red_egresados
DB_PORT=3306
PORT=3001
```

### 4️⃣ Iniciar el Backend
```bash
npm start
```

### 5️⃣ Iniciar el Frontend
En otra terminal, desde la raíz del proyecto:
```bash
npm install
npm run dev
```

## ✅ Probar la Aplicación

1. Abre tu navegador en: http://localhost:5173
2. Haz clic en "Iniciar Sesión"
3. Usa cualquiera de estas credenciales:

**Usuario de prueba:**
- Cédula: `1234567890`
- Contraseña: `1234567890`

**Usuarios reales (66 precargados):**
- Cédula: `11004343198` / Contraseña: `11004343198`
- Cédula: `11085288058` / Contraseña: `11085288058`
- Cédula: `11130641294` / Contraseña: `11130641294`
- ... (todos usan su cédula como contraseña)

4. Completa tu perfil
5. Explora las secciones protegidas (Empleos, Recursos, Networking)

## 🎯 Características Implementadas

✅ Sistema de autenticación con MySQL
✅ 66 usuarios precargados
✅ Login con cédula y contraseña
✅ Actualización de perfil en base de datos
✅ Rutas protegidas
✅ Diseño institucional Universidad Mariana
✅ Responsive design

## 📞 Soporte

Si tienes problemas, revisa el archivo `README_MYSQL.md` para más detalles.
