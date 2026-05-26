# 🗄️ Guía Completa: Instalar y Configurar MySQL en Windows

## Paso 1: Descargar MySQL

1. Ve a: https://dev.mysql.com/downloads/installer/
2. Descarga **MySQL Installer for Windows** (el archivo más grande, ~400MB)
3. Haz clic en "No thanks, just start my download"

## Paso 2: Instalar MySQL

1. **Ejecuta el instalador** que descargaste
2. Selecciona **"Developer Default"** (instalación completa)
3. Haz clic en **"Next"** → **"Execute"** (descargará componentes)
4. Espera a que termine y haz clic en **"Next"**

## Paso 3: Configuración del Servidor

### Type and Networking
- Deja todo por defecto
- Puerto: **3306**
- Haz clic en **"Next"**

### Authentication Method
- Selecciona: **"Use Strong Password Encryption"**
- Haz clic en **"Next"**

### Accounts and Roles
- **¡MUY IMPORTANTE!** Crea una contraseña para el usuario **root**
- Ejemplo: `root123` (anota esta contraseña, la necesitarás)
- Haz clic en **"Next"**

### Windows Service
- Deja todo por defecto
- Asegúrate que esté marcado: **"Start the MySQL Server at System Startup"**
- Haz clic en **"Next"**

### Apply Configuration
- Haz clic en **"Execute"**
- Espera a que termine
- Haz clic en **"Finish"**

## Paso 4: Instalar MySQL Workbench

- El instalador continuará con MySQL Workbench
- Haz clic en **"Next"** → **"Execute"** → **"Finish"**
- Cierra el instalador

## Paso 5: Verificar la Instalación

1. Abre el **Símbolo del sistema** (CMD)
2. Escribe:
```bash
mysql --version
```
3. Deberías ver algo como: `mysql Ver 8.0.xx`

## Paso 6: Crear la Base de Datos

### Opción A: Usando MySQL Workbench (Recomendado - Más Fácil)

1. **Abre MySQL Workbench** (búscalo en el menú inicio)
2. Haz clic en la conexión **"Local instance MySQL80"**
3. Ingresa la contraseña de root que creaste
4. En el editor SQL, copia y pega TODO el contenido del archivo `server/database.sql`
5. Haz clic en el **rayo amarillo** ⚡ (Execute)
6. ¡Listo! La base de datos está creada con los 66 usuarios

### Opción B: Usando la Terminal (CMD)

1. Abre el **Símbolo del sistema** (CMD)
2. Navega a la carpeta del proyecto:
```bash
cd C:\Users\VALERIA\Downloads\graduados-master
```

3. Ejecuta:
```bash
mysql -u root -p < server\database.sql
```

4. Ingresa tu contraseña de root
5. ¡Listo!

## Paso 7: Verificar que la Base de Datos Existe

En MySQL Workbench o CMD:

```sql
SHOW DATABASES;
```

Deberías ver `red_egresados` en la lista.

Para ver los usuarios:
```sql
USE red_egresados;
SELECT cedula, nombre, apellido FROM usuarios LIMIT 10;
```

## Paso 8: Configurar el Backend

1. Ve a la carpeta `server`:
```bash
cd server
```

2. Crea el archivo `.env` copiando el ejemplo:
```bash
copy .env.example .env
```

3. Abre el archivo `.env` con el Bloc de notas y edítalo:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=red_egresados
DB_PORT=3306
PORT=3001
```

**¡IMPORTANTE!** Cambia `root123` por la contraseña que creaste en el Paso 3.

4. Instala las dependencias:
```bash
npm install
```

5. Inicia el servidor:
```bash
npm start
```

Deberías ver:
```
✅ Conexión exitosa a MySQL
🚀 Servidor corriendo en http://localhost:3001
```

## Paso 9: Iniciar el Frontend

1. Abre OTRA terminal (CMD)
2. Ve a la carpeta principal:
```bash
cd C:\Users\VALERIA\Downloads\graduados-master
```

3. Instala dependencias (si no lo has hecho):
```bash
npm install
```

4. Inicia el frontend:
```bash
npm run dev
```

## Paso 10: ¡Probar la Aplicación!

1. Abre tu navegador en: http://localhost:5173
2. Haz clic en **"Iniciar Sesión"**
3. Usa cualquiera de estos usuarios:
   - Cédula: `11004343198`
   - Contraseña: `11004343198`

## 🔧 Solución de Problemas

### Error: "mysql no se reconoce como comando"

**Solución:** Agregar MySQL al PATH de Windows

1. Busca la carpeta de instalación de MySQL (usualmente: `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
2. Copia la ruta completa
3. Ve a: Panel de Control → Sistema → Configuración avanzada del sistema
4. Haz clic en "Variables de entorno"
5. En "Variables del sistema", busca "Path" y haz clic en "Editar"
6. Haz clic en "Nuevo" y pega la ruta de MySQL
7. Haz clic en "Aceptar" en todas las ventanas
8. Cierra y vuelve a abrir CMD

### Error: "Access denied for user 'root'"

**Solución:** Verifica tu contraseña en el archivo `.env`

### Error: "Cannot connect to MySQL server"

**Solución:** 
1. Verifica que MySQL esté corriendo:
   - Abre "Servicios" de Windows (busca "services.msc")
   - Busca "MySQL80"
   - Debe estar en estado "En ejecución"
   - Si no, haz clic derecho → "Iniciar"

### Error: "Database does not exist"

**Solución:** Ejecuta el script `database.sql` nuevamente

## 📊 Ver los Datos en MySQL Workbench

1. Abre MySQL Workbench
2. Conéctate a tu servidor local
3. En el panel izquierdo, expande "Schemas"
4. Expande "red_egresados"
5. Expande "Tables"
6. Haz clic derecho en "usuarios" → "Select Rows - Limit 1000"
7. ¡Verás todos los 66 usuarios!

## 🎯 Comandos Útiles de MySQL

```sql
-- Ver todas las bases de datos
SHOW DATABASES;

-- Usar la base de datos
USE red_egresados;

-- Ver todas las tablas
SHOW TABLES;

-- Ver estructura de la tabla
DESCRIBE usuarios;

-- Ver todos los usuarios
SELECT * FROM usuarios;

-- Buscar un usuario específico
SELECT * FROM usuarios WHERE cedula = '11004343198';

-- Contar usuarios
SELECT COUNT(*) FROM usuarios;

-- Ver usuarios que completaron perfil
SELECT cedula, nombre, apellido, email 
FROM usuarios 
WHERE has_completed_profile = TRUE;
```

## ✅ Checklist Final

- [ ] MySQL instalado y corriendo
- [ ] Base de datos `red_egresados` creada
- [ ] 66 usuarios cargados en la tabla
- [ ] Archivo `server/.env` configurado con tu contraseña
- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 5173
- [ ] Login funciona con cédula y contraseña

## 🎉 ¡Listo!

Ahora tienes MySQL completamente configurado y funcionando con tu aplicación.

**Próximos pasos:**
- Prueba hacer login con diferentes usuarios
- Completa el perfil de un usuario
- Verifica en MySQL Workbench que los datos se guardaron
