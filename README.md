# PLATAFORMA WEB DE SEGUIMIENTO A EGRESADOS
## Especialización en Sistemas Integrados de Gestión - Universidad Mariana

---

## 📁 ESTRUCTURA DEL PROYECTO

```
graduados-master/
├── frontend/          ← Aplicación React + TypeScript + Vite
├── backend/           ← Servidor Node.js + Express
└── documentacion/     ← Documentación y scripts SQL
    └── database/      ← Scripts SQL de la base de datos
```

---

## 🚀 INSTALACIÓN Y EJECUCIÓN

### **Requisitos Previos:**
- Node.js v18 o superior
- MySQL 8.0 o superior
- npm o yarn

### **1. Configurar Base de Datos**

```bash
# Ejecutar en MySQL Workbench o desde terminal:
mysql -u root -p < documentacion/database/database_completa.sql
```

### **2. Configurar Backend**

```bash
cd backend
npm install

# Configurar variables de entorno
# Editar el archivo .env con tus credenciales de MySQL

# Iniciar servidor
node server.js
```

El backend correrá en: **http://localhost:3001**

### **3. Configurar Frontend**

```bash
cd frontend
npm install

# Iniciar aplicación
npm run dev
```

El frontend correrá en: **http://localhost:5173**

---

## 🔧 TECNOLOGÍAS UTILIZADAS

### **Frontend:**
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Lucide React (iconos)
- xlsx, jspdf, jspdf-autotable (exportación)

### **Backend:**
- Node.js
- Express
- MySQL2
- CORS
- dotenv

### **Base de Datos:**
- MySQL 8.0

---

## 📚 DOCUMENTACIÓN

Toda la documentación del proyecto se encuentra en la carpeta `documentacion/`:

- `DOCUMENTO_ACADEMICO_INGENIERIA_SOFTWARE.md` - Documento académico completo
- `REQUISITOS_E_HISTORIAS_USUARIO.md` - Requisitos funcionales y no funcionales
- `ESTIMACION_COSTOS_PROYECTO.md` - Estimación de costos y tiempos
- `ESCENARIOS_CASOS_PRUEBA_10HU.md` - Casos de prueba
- Y más...

---

## 👥 USUARIOS DE PRUEBA

Ver archivo: `documentacion/LISTA_USUARIOS.txt`

**Usuario de prueba:**
- Cédula: `1234567890`
- Contraseña: `1234567890`

**Usuario líder:**
- Usuario: `lider01`
- Contraseña: `lider123`

---

## 📝 LICENCIA

Universidad Mariana - Proyecto Académico 2026

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026
