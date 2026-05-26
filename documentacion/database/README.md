# BASE DE DATOS - MySQL

Scripts SQL para la base de datos de la plataforma de egresados

## 📄 Archivos

- `database_completa.sql` - Script completo con estructura y datos iniciales (USAR ESTE)
- `database.sql` - Script básico de estructura
- `encuestas_satisfaccion.sql` - Tabla de encuestas
- `EJECUTAR_ESTO_EN_MYSQL.sql` - Script de configuración adicional
- `ROL_LIDER_SQL.sql` - Configuración de rol líder

## 🚀 Instalación

### Opción 1: MySQL Workbench
1. Abrir MySQL Workbench
2. Conectarse al servidor MySQL
3. Abrir el archivo `database_completa.sql`
4. Ejecutar el script completo

### Opción 2: Terminal/CMD
```bash
mysql -u root -p < database_completa.sql
```

## 📊 Estructura de la Base de Datos

### Base de datos: `red_egresados`

### Tabla principal: `usuarios`
Contiene toda la información de los egresados:
- Datos personales (nombre, apellido, cédula, email, etc.)
- Datos socioeconómicos y demográficos
- Información académica
- Situación laboral actual
- Información del primer empleo
- Trayectoria profesional
- Reconocimientos y participación en redes
- Experiencia internacional
- Planes de formación futura

**Total de campos:** 70+ campos

### Tabla: `encuestas_satisfaccion`
Almacena las respuestas de la encuesta de satisfacción:
- 7 preguntas con escala Likert (1-5)
- 2 preguntas abiertas
- 1 pregunta de selección múltiple

### Tabla: `lideres`
Usuarios con rol de coordinador/líder para acceso al dashboard

## 👥 Usuarios Iniciales

El script carga 65 egresados de prueba con sus cédulas como contraseña inicial.

**Usuario de prueba adicional:**
- Cédula: `1234567890`
- Password: `1234567890`

Ver lista completa en: `../documentacion/LISTA_USUARIOS.txt`
