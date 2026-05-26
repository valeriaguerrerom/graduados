# 🖥️ Guía Completa: MySQL Workbench (Interfaz Gráfica)

## ¿Qué es MySQL Workbench?

MySQL Workbench es la **interfaz gráfica oficial de MySQL**. Es mucho más fácil que usar comandos en la consola. ¡Todo con clics!

---

## 📥 Paso 1: Abrir MySQL Workbench

1. Busca en el menú inicio de Windows: **"MySQL Workbench"**
2. Ábrelo (puede tardar unos segundos)

Verás una ventana como esta:

```
┌─────────────────────────────────────────────────┐
│  MySQL Workbench                                │
│  ─────────────────────────────────────────────  │
│                                                 │
│  MySQL Connections                              │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │  🗄️  Local instance MySQL80              │ │
│  │      root@localhost:3306                  │ │
│  │                                           │ │
│  │      [Doble clic aquí para conectar]     │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Paso 2: Conectar al Servidor

1. **Haz doble clic** en "Local instance MySQL80"
2. Te pedirá la **contraseña** que creaste al instalar MySQL
3. Ingrésala y haz clic en **"OK"**

💡 **Tip:** Marca la casilla "Save password in vault" para no tener que ingresarla cada vez.

---

## 📊 Paso 3: Crear la Base de Datos (Método Visual)

### Opción A: Copiar y Pegar el Script (MÁS FÁCIL) ⭐

1. **Abre el archivo** `server/database.sql` con el Bloc de notas
2. **Selecciona TODO** el contenido (Ctrl + A)
3. **Cópialo** (Ctrl + C)
4. Vuelve a **MySQL Workbench**
5. En el área grande de texto (Query Editor), **pega** el contenido (Ctrl + V)
6. Haz clic en el **rayo amarillo** ⚡ (o presiona Ctrl + Shift + Enter)
7. ¡Espera unos segundos y listo!

**Verás algo como:**
```
┌─────────────────────────────────────────────────┐
│  Action Output                                  │
│  ─────────────────────────────────────────────  │
│  ✅ CREATE DATABASE red_egresados completed    │
│  ✅ CREATE TABLE usuarios completed            │
│  ✅ INSERT INTO usuarios... 66 rows affected   │
│  ✅ CREATE INDEX... completed                  │
│                                                 │
│  Duration: 2.5 sec                              │
└─────────────────────────────────────────────────┘
```

### Opción B: Abrir el Archivo Directamente

1. En MySQL Workbench, ve a: **File → Open SQL Script**
2. Navega a: `C:\Users\VALERIA\Downloads\graduados-master\server\database.sql`
3. Haz clic en **"Open"**
4. Haz clic en el **rayo amarillo** ⚡
5. ¡Listo!

---

## ✅ Paso 4: Verificar que la Base de Datos se Creó

### Ver la Base de Datos:

1. En el panel izquierdo, busca **"Schemas"** (o "SCHEMAS")
2. Haz clic en el **icono de refrescar** 🔄 (dos flechas circulares)
3. Deberías ver **"red_egresados"** en la lista

```
┌─────────────────────────────────┐
│  SCHEMAS                        │
│  ─────────────────────────────  │
│  📁 red_egresados              │ ← ¡AQUÍ ESTÁ!
│  📁 information_schema          │
│  📁 mysql                       │
│  📁 performance_schema          │
│  📁 sys                         │
└─────────────────────────────────┘
```

### Ver la Tabla de Usuarios:

1. Haz clic en la **flechita** ▶ junto a "red_egresados" para expandir
2. Haz clic en la **flechita** ▶ junto a "Tables"
3. Verás la tabla **"usuarios"**

```
┌─────────────────────────────────┐
│  SCHEMAS                        │
│  ─────────────────────────────  │
│  📁 red_egresados              │
│    ├─ 📋 Tables                │
│    │   └─ 👥 usuarios          │ ← ¡66 USUARIOS!
│    ├─ 👁️ Views                 │
│    └─ ⚙️ Stored Procedures     │
└─────────────────────────────────┘
```

---

## 👥 Paso 5: Ver los 66 Usuarios

1. **Haz clic derecho** en la tabla "usuarios"
2. Selecciona: **"Select Rows - Limit 1000"**
3. ¡Verás todos los usuarios en una tabla!

**Resultado:**
```
┌────┬──────────────┬─────────────────┬──────────────────────┬─────────────────┐
│ id │ cedula       │ nombre          │ apellido             │ email           │
├────┼──────────────┼─────────────────┼──────────────────────┼─────────────────┤
│ 1  │ 11004343198  │ LISBETH MRCELA  │ ACOSTA USCATEGUI     │ NULL            │
│ 2  │ 11085288058  │ ANDREA MARGARITA│ ARCINIEGAS PAZ       │ NULL            │
│ 3  │ 11130641294  │ FABIAN ANCIZAR  │ BASTIDAS BENAVIDES   │ NULL            │
│ 4  │ 11193470035  │ CHRISTIAN CAMILO│ BELALCAZAR SARASTY   │ NULL            │
│ 5  │ 11085288765  │ MARIA FERNANDA  │ BENAVIDES ENRIQUEZ   │ NULL            │
│ ...│ ...          │ ...             │ ...                  │ ...             │
└────┴──────────────┴─────────────────┴──────────────────────┴─────────────────┘

66 rows returned
```

---

## 🔍 Paso 6: Buscar un Usuario Específico

### Método Visual (Sin escribir código):

1. En la tabla de resultados, busca el **icono de filtro** 🔍
2. En la columna "cedula", escribe: `11004343198`
3. Presiona Enter
4. ¡Verás solo ese usuario!

### Método con Query (Más flexible):

1. En el Query Editor, escribe:
```sql
SELECT * FROM usuarios WHERE cedula = '11004343198';
```
2. Haz clic en el **rayo** ⚡
3. ¡Verás el usuario!

---

## ✏️ Paso 7: Editar un Usuario (Opcional)

1. Haz doble clic en cualquier celda de la tabla
2. Edita el valor (por ejemplo, agrega un email)
3. Presiona **Enter**
4. Haz clic en **"Apply"** (botón azul abajo)
5. Confirma los cambios
6. ¡Listo!

---

## 🔄 Paso 8: Ver Cambios en Tiempo Real

Cuando uses la aplicación web y actualices un perfil:

1. En MySQL Workbench, vuelve a ejecutar:
```sql
SELECT * FROM usuarios WHERE cedula = '11004343198';
```
2. ¡Verás los datos actualizados!

---

## 📝 Queries Útiles (Copia y Pega)

### Ver todos los usuarios:
```sql
SELECT * FROM usuarios;
```

### Ver solo nombres y cédulas:
```sql
SELECT cedula, nombre, apellido FROM usuarios;
```

### Buscar por nombre:
```sql
SELECT * FROM usuarios WHERE nombre LIKE '%LISBETH%';
```

### Ver usuarios que completaron perfil:
```sql
SELECT cedula, nombre, apellido, email 
FROM usuarios 
WHERE has_completed_profile = TRUE;
```

### Contar total de usuarios:
```sql
SELECT COUNT(*) as total FROM usuarios;
```

### Ver usuarios con email:
```sql
SELECT cedula, nombre, apellido, email 
FROM usuarios 
WHERE email IS NOT NULL;
```

### Ver últimos usuarios actualizados:
```sql
SELECT cedula, nombre, apellido, updated_at 
FROM usuarios 
ORDER BY updated_at DESC 
LIMIT 10;
```

---

## 🎨 Personalizar MySQL Workbench

### Cambiar el Tema:
1. Ve a: **Edit → Preferences**
2. Selecciona: **Appearance**
3. Elige tu tema favorito (Dark, Light, etc.)

### Aumentar el Tamaño de Letra:
1. Ve a: **Edit → Preferences**
2. Selecciona: **Fonts & Colors**
3. Ajusta el tamaño

---

## 🔧 Funciones Útiles de MySQL Workbench

### 1. Exportar Datos a Excel:
1. Ejecuta tu query
2. En los resultados, haz clic derecho
3. Selecciona: **"Export Recordset to External File"**
4. Elige formato (CSV, JSON, etc.)

### 2. Ver Estructura de la Tabla:
1. Haz clic derecho en "usuarios"
2. Selecciona: **"Table Inspector"**
3. Verás columnas, índices, etc.

### 3. Crear Respaldo (Backup):
1. Ve a: **Server → Data Export**
2. Selecciona "red_egresados"
3. Elige carpeta de destino
4. Haz clic en **"Start Export"**

### 4. Restaurar Respaldo:
1. Ve a: **Server → Data Import**
2. Selecciona el archivo de respaldo
3. Haz clic en **"Start Import"**

---

## 🎯 Atajos de Teclado Útiles

| Atajo | Acción |
|-------|--------|
| `Ctrl + Enter` | Ejecutar query actual |
| `Ctrl + Shift + Enter` | Ejecutar todo el script |
| `Ctrl + T` | Nueva pestaña de query |
| `Ctrl + W` | Cerrar pestaña |
| `Ctrl + /` | Comentar/descomentar línea |
| `F5` | Refrescar schemas |

---

## ❓ Problemas Comunes

### No veo "red_egresados" en Schemas
**Solución:**
1. Haz clic en el icono de refrescar 🔄
2. O presiona F5
3. Si aún no aparece, ejecuta el script database.sql de nuevo

### "Error Code: 1062. Duplicate entry"
**Solución:**
- Los usuarios ya están cargados
- No hay problema, puedes continuar

### No puedo editar datos
**Solución:**
1. Asegúrate de hacer clic en "Apply" después de editar
2. Verifica que tengas permisos de escritura

### La conexión se desconecta
**Solución:**
1. Ve a: **Edit → Preferences → SQL Editor**
2. Aumenta "DBMS connection read time out"
3. Aumenta "DBMS connection time out interval"

---

## 🎓 Tutorial Rápido en Video (Simulado)

### Paso a Paso Visual:

```
1. [Abrir MySQL Workbench]
   └─ Buscar en menú inicio → MySQL Workbench

2. [Conectar]
   └─ Doble clic en "Local instance MySQL80"
   └─ Ingresar contraseña

3. [Abrir Script]
   └─ File → Open SQL Script
   └─ Seleccionar: server/database.sql

4. [Ejecutar]
   └─ Clic en rayo amarillo ⚡

5. [Verificar]
   └─ Panel izquierdo → Schemas → Refrescar
   └─ Expandir red_egresados → Tables → usuarios

6. [Ver Datos]
   └─ Clic derecho en usuarios
   └─ "Select Rows - Limit 1000"

¡LISTO! 🎉
```

---

## 📊 Ejemplo Completo: Verificar un Login

Cuando un usuario hace login en la aplicación, puedes verificarlo así:

1. **En MySQL Workbench, ejecuta:**
```sql
SELECT * FROM usuarios WHERE cedula = '11004343198';
```

2. **Verás:**
```
cedula: 11004343198
nombre: LISBETH MRCELA
apellido: ACOSTA USCATEGUI
password: 11004343198
has_completed_profile: FALSE
```

3. **Después de que complete su perfil, ejecuta de nuevo:**
```sql
SELECT * FROM usuarios WHERE cedula = '11004343198';
```

4. **Ahora verás:**
```
cedula: 11004343198
nombre: LISBETH MRCELA
apellido: ACOSTA USCATEGUI
email: lisbeth@example.com
telefono: 3001234567
ciudad: Pasto
has_completed_profile: TRUE ← ¡CAMBIÓ!
updated_at: 2024-11-21 15:30:45 ← ¡ACTUALIZADO!
```

---

## ✅ Checklist de Verificación

- [ ] MySQL Workbench abierto
- [ ] Conectado a "Local instance MySQL80"
- [ ] Script database.sql ejecutado
- [ ] Base de datos "red_egresados" visible en Schemas
- [ ] Tabla "usuarios" con 66 registros
- [ ] Puedo ver los datos en la tabla
- [ ] Puedo ejecutar queries personalizadas

---

## 🎉 ¡Felicidades!

Ahora sabes usar MySQL Workbench como un profesional. Es mucho más fácil que la consola, ¿verdad? 😊

**Próximos pasos:**
1. Configura el backend (server/.env)
2. Inicia el servidor (npm start)
3. Prueba la aplicación
4. Vuelve a MySQL Workbench para ver los cambios en tiempo real

---

**¿Necesitas ayuda?** Revisa las otras guías:
- INICIO_RAPIDO.md
- INSTALAR_MYSQL.md
- README_MYSQL.md
