@echo off
title Configuracion Completa - Red de Egresados
color 0B

echo ============================================================
echo   CONFIGURACION COMPLETA - RED DE EGRESADOS
echo   Universidad Mariana
echo ============================================================
echo.

echo Este script te ayudara a configurar todo el proyecto.
echo.
pause

:verificar_mysql
echo.
echo [Paso 1/5] Verificando MySQL...
echo.
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] MySQL NO esta instalado o no esta en el PATH
    echo.
    echo Por favor:
    echo 1. Descarga MySQL desde: https://dev.mysql.com/downloads/installer/
    echo 2. Instalalo siguiendo la guia en INSTALAR_MYSQL.md
    echo 3. Vuelve a ejecutar este script
    echo.
    pause
    exit
) else (
    echo [OK] MySQL esta instalado
)

:crear_bd
echo.
echo [Paso 2/5] Crear Base de Datos
echo.
echo Ahora vamos a crear la base de datos con los 66 usuarios.
echo.
set /p mysql_password="Ingresa la contrasena de MySQL root: "
echo.
echo Creando base de datos...
mysql -u root -p%mysql_password% < server\database.sql
if %errorlevel% neq 0 (
    echo [X] Error al crear la base de datos
    echo Verifica que la contrasena sea correcta
    pause
    exit
) else (
    echo [OK] Base de datos creada exitosamente
)

:configurar_backend
echo.
echo [Paso 3/5] Configurar Backend
echo.
cd server

if not exist .env (
    echo Creando archivo .env...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASSWORD=%mysql_password%
        echo DB_NAME=red_egresados
        echo DB_PORT=3306
        echo PORT=3001
    ) > .env
    echo [OK] Archivo .env creado
) else (
    echo [!] El archivo .env ya existe
)

echo.
echo Instalando dependencias del backend...
call npm install
if %errorlevel% neq 0 (
    echo [X] Error al instalar dependencias del backend
    pause
    exit
) else (
    echo [OK] Dependencias del backend instaladas
)

cd ..

:configurar_frontend
echo.
echo [Paso 4/5] Configurar Frontend
echo.
echo Instalando dependencias del frontend...
call npm install
if %errorlevel% neq 0 (
    echo [X] Error al instalar dependencias del frontend
    pause
    exit
) else (
    echo [OK] Dependencias del frontend instaladas
)

:verificar
echo.
echo [Paso 5/5] Verificacion Final
echo.
echo Verificando conexion a MySQL...
mysql -u root -p%mysql_password% -e "USE red_egresados; SELECT COUNT(*) as total_usuarios FROM usuarios;" 2>nul
if %errorlevel% neq 0 (
    echo [X] Error al conectar con la base de datos
    pause
    exit
) else (
    echo [OK] Conexion exitosa a la base de datos
)

:finalizar
echo.
echo ============================================================
echo   CONFIGURACION COMPLETADA EXITOSAMENTE!
echo ============================================================
echo.
echo Todo esta listo para usar. Ahora puedes:
echo.
echo 1. Iniciar el Backend:
echo    cd server
echo    npm start
echo.
echo 2. Iniciar el Frontend (en otra terminal):
echo    npm run dev
echo.
echo 3. Abrir en el navegador:
echo    http://localhost:5173
echo.
echo 4. Iniciar sesion con cualquier cedula de LISTA_USUARIOS.txt
echo    Ejemplo: Cedula: 11004343198 / Contrasena: 11004343198
echo.
echo ============================================================
echo.
echo Presiona cualquier tecla para iniciar los servicios...
pause >nul

:iniciar_servicios
echo.
echo Iniciando servicios...
echo.
cd server
start cmd /k "title Backend - Puerto 3001 && color 0A && npm start"
cd ..
timeout /t 3 /nobreak >nul
start cmd /k "title Frontend - Puerto 5173 && color 0B && npm run dev"

echo.
echo [OK] Servicios iniciados!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Abriendo navegador en 5 segundos...
timeout /t 5 /nobreak >nul
start http://localhost:5173

echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
exit
