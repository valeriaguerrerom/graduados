# 🚀 INICIO RÁPIDO - 3 Pasos Simples

## ¿Primera vez? Sigue estos pasos:

### 📥 Paso 1: Instalar MySQL (Solo la primera vez)

1. **Descarga MySQL:**
   - Ve a: https://dev.mysql.com/downloads/installer/
   - Descarga "MySQL Installer for Windows"
   - Haz clic en "No thanks, just start my download"

2. **Instala MySQL:**
   - Ejecuta el instalador
   - Selecciona "Developer Default"
   - Sigue el asistente (Next, Next, Execute)
   - **¡IMPORTANTE!** Cuando te pida crear una contraseña para "root", anótala
   - Ejemplo: `root123`

3. **Verifica la instalación:**
   - Abre CMD (Símbolo del sistema)
   - Escribe: `mysql --version`
   - Deberías ver: `mysql Ver 8.0.xx`

### ⚙️ Paso 2: Configurar Todo Automáticamente

**Opción Fácil (Recomendada):**

1. Haz doble clic en: `CONFIGURAR_TODO.bat`
2. Ingresa tu contraseña de MySQL cuando te la pida
3. ¡Espera a que termine!
4. Los servicios se iniciarán automáticamente

**Opción Manual:**

Si prefieres hacerlo paso a paso, sigue la guía en `INSTALAR_MYSQL.md`

### 🎉 Paso 3: ¡Usar la Aplicación!

1. **Abre tu navegador en:** http://localhost:5173

2. **Haz clic en "Iniciar Sesión"**

3. **Usa cualquiera de estos usuarios:**
   ```
   Cédula: 11004343198
   Contraseña: 11004343198
   ```
   
   O cualquier otro de los 66 usuarios en `LISTA_USUARIOS.txt`

4. **Completa tu perfil** con tus datos

5. **¡Explora la plataforma!**
   - Ver empleos
   - Recursos
   - Eventos de networking

---

## 🔄 Para Iniciar Después (Ya Configurado)

Si ya configuraste todo y solo quieres iniciar la aplicación:

### Opción 1: Script Automático
```bash
INICIAR.bat
```
Selecciona opción 4 (Iniciar TODO)

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📊 Ver la Base de Datos

### Opción 1: MySQL Workbench (Visual)
1. Abre "MySQL Workbench"
2. Conecta a "Local instance MySQL80"
3. Ingresa tu contraseña
4. En el panel izquierdo: Schemas → red_egresados → Tables → usuarios
5. Clic derecho en "usuarios" → "Select Rows"
6. ¡Verás todos los usuarios!

### Opción 2: Línea de Comandos
```bash
mysql -u root -p
# Ingresa tu contraseña

USE red_egresados;
SELECT * FROM usuarios;
```

---

## ❓ Problemas Comunes

### "mysql no se reconoce como comando"
**Solución:** MySQL no está en el PATH de Windows
- Busca: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
- Agrégalo a las variables de entorno PATH
- Reinicia CMD

### "Access denied for user 'root'"
**Solución:** Contraseña incorrecta
- Verifica el archivo `server/.env`
- Asegúrate que `DB_PASSWORD` sea tu contraseña correcta

### "Cannot connect to MySQL server"
**Solución:** MySQL no está corriendo
- Abre "Servicios" de Windows (services.msc)
- Busca "MySQL80"
- Clic derecho → Iniciar

### Los puertos 3001 o 5173 están ocupados
**Solución:** Cierra otras aplicaciones que usen esos puertos
- O cambia los puertos en `.env` y `vite.config.ts`

---

## 📞 ¿Necesitas Ayuda?

1. Lee `INSTALAR_MYSQL.md` para guía detallada
2. Revisa `README_MYSQL.md` para configuración avanzada
3. Consulta `RESUMEN_IMPLEMENTACION.md` para detalles técnicos

---

## ✅ Checklist de Verificación

- [ ] MySQL instalado y corriendo
- [ ] Base de datos creada (red_egresados)
- [ ] 66 usuarios cargados
- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 5173
- [ ] Puedo hacer login con una cédula
- [ ] Los datos se guardan en MySQL

---

## 🎯 Usuarios de Prueba Rápidos

```
11004343198 | LISBETH MRCELA ACOSTA USCATEGUI
11085288058 | ANDREA MARGARITA ARCINIEGAS PAZ
11130641294 | FABIAN ANCIZAR BASTIDAS BENAVIDES
11193470035 | CHRISTIAN CAMILO BELALCAZAR SARASTY
1234567890  | Juan Pérez (Usuario de prueba)
```

**Todos usan su cédula como contraseña**

---

¡Eso es todo! 🎉
