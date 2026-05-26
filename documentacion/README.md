# 🎓 Red de Egresados - Universidad Mariana

Plataforma web institucional para la gestión y conexión de egresados de la Universidad Mariana.

![Universidad Mariana](https://img.shields.io/badge/Universidad-Mariana-003B7A?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

## 🌟 Características

- ✅ **Diseño Institucional** con colores oficiales de la Universidad Mariana
- ✅ **Autenticación con MySQL** - 66 usuarios precargados
- ✅ **Gestión de Perfiles** - Actualización completa de datos
- ✅ **Rutas Protegidas** - Acceso controlado a recursos
- ✅ **Responsive Design** - Funciona en móviles, tablets y desktop
- ✅ **API REST** - Backend completo con Node.js + Express

## 🚀 Inicio Rápido

### 🆕 ¿Primera vez? Lee esto primero:

👉 **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Guía en 3 pasos simples

👉 **[INSTALAR_MYSQL.md](INSTALAR_MYSQL.md)** - Cómo instalar MySQL paso a paso

### ⚡ Configuración Automática (Recomendado)

Ejecuta este script y sigue las instrucciones:
```bash
CONFIGURAR_TODO.bat
```

Este script hará TODO por ti:
- ✅ Verificar MySQL
- ✅ Crear la base de datos
- ✅ Configurar el backend
- ✅ Instalar dependencias
- ✅ Iniciar los servicios

### 🔧 Configuración Manual

Si prefieres hacerlo manualmente:

#### 1. Instalar MySQL
- Descarga desde: https://dev.mysql.com/downloads/installer/
- Sigue la guía en `INSTALAR_MYSQL.md`

#### 2. Crear la Base de Datos
```bash
mysql -u root -p < server/database.sql
```

#### 3. Configurar el Backend
```bash
cd server
npm install
copy .env.example .env
# Edita .env con tu contraseña de MySQL
npm start
```

#### 4. Iniciar el Frontend
```bash
npm install
npm run dev
```

## 🔐 Usuarios de Prueba

**Usuario de prueba:**
- Cédula: `1234567890`
- Contraseña: `1234567890`

**Usuarios reales (66 precargados):**
- Cédula: `11004343198` / Contraseña: `11004343198`
- Cédula: `11085288058` / Contraseña: `11085288058`
- Ver `LISTA_USUARIOS.txt` para la lista completa

## 📚 Documentación

### 🌟 Para Principiantes (Recomendado):
- 🚀 [Inicio Rápido](INICIO_RAPIDO.md) - 3 pasos simples
- 🖥️ [MySQL Workbench](MYSQL_WORKBENCH_GUIA.md) - Interfaz gráfica (SIN comandos)
- 📸 [Guía Visual](WORKBENCH_RAPIDO.txt) - Guía rápida con diagramas

### 📖 Documentación Completa:
- 📥 [Instalar MySQL](INSTALAR_MYSQL.md) - Guía paso a paso
- 🗄️ [Configuración MySQL](README_MYSQL.md) - Guía técnica completa
- 📋 [Resumen de Implementación](RESUMEN_IMPLEMENTACION.md) - Detalles técnicos
- 👥 [Lista de Usuarios](LISTA_USUARIOS.txt) - 66 usuarios precargados
- 📝 [Instrucciones](INSTRUCCIONES.md) - Guía de uso del sistema

## 🛠️ Tecnologías

### Frontend
- React 18 + TypeScript
- React Router v6
- Tailwind CSS
- Lucide React
- Vite

### Backend
- Node.js + Express
- MySQL 8.0
- CORS
- dotenv

## 📁 Estructura del Proyecto

```
graduados-master/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes React
│   ├── contexts/          # Context API (Auth)
│   ├── pages/             # Páginas de la aplicación
│   └── App.tsx            # Componente principal
├── server/                # Backend Node.js
│   ├── server.js          # API REST
│   ├── db.js              # Conexión MySQL
│   ├── database.sql       # Script de BD
│   └── package.json       # Dependencias backend
├── public/                # Archivos estáticos
└── package.json           # Dependencias frontend
```

## 🎨 Colores Institucionales

- **Azul Marino** (#003B7A) - Color primario
- **Dorado** (#FDB913) - Color secundario
- **Verde** (#82bb08) - Color de acento

## 🔌 API Endpoints

- `POST /api/login` - Autenticación de usuario
- `GET /api/user/:cedula` - Obtener perfil de usuario
- `PUT /api/user/:cedula` - Actualizar perfil
- `GET /api/users` - Listar todos los usuarios

## 📊 Base de Datos

### Tabla: usuarios
- 66 usuarios precargados
- Contraseña inicial = cédula
- Campos completos de perfil personal, académico y laboral

## 🔄 Flujo de Usuario

1. Usuario visita la página → Ve información institucional
2. Hace clic en "Iniciar Sesión" → Ingresa cédula y contraseña
3. Login exitoso → Redirige a completar perfil
4. Completa su perfil → Datos guardados en MySQL
5. Accede a contenido protegido → Empleos, recursos, networking

## 🚧 Próximos Pasos

- [ ] Encriptar contraseñas con bcrypt
- [ ] Implementar JWT tokens
- [ ] Sistema de recuperación de contraseña
- [ ] Panel de administración
- [ ] Sistema de roles
- [ ] Notificaciones por email
- [ ] Chat entre egresados

## 📞 Soporte

Para problemas o preguntas:
- Revisa la [Guía Rápida](GUIA_RAPIDA.md)
- Consulta [README_MYSQL.md](README_MYSQL.md) para problemas de base de datos
- Verifica que MySQL esté corriendo
- Asegúrate de que los puertos 3001 y 5173 estén disponibles

## 📄 Licencia

Este proyecto es propiedad de la Universidad Mariana.

## 👥 Créditos

Desarrollado para la Universidad Mariana - Red de Egresados

---

**Universidad Mariana** | Pasto, Nariño, Colombia
