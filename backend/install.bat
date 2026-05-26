@echo off
echo ========================================
echo Instalacion del Backend - Red de Egresados
echo ========================================
echo.

echo [1/3] Instalando dependencias de Node.js...
call npm install

echo.
echo [2/3] Creando archivo .env...
if not exist .env (
    copy .env.example .env
    echo Archivo .env creado. Por favor, edita el archivo .env con tus credenciales de MySQL.
) else (
    echo El archivo .env ya existe.
)

echo.
echo [3/3] Configuracion de MySQL...
echo Por favor, ejecuta el siguiente comando en MySQL:
echo mysql -u root -p ^< database.sql
echo.

echo ========================================
echo Instalacion completada!
echo ========================================
echo.
echo Pasos siguientes:
echo 1. Edita el archivo .env con tus credenciales de MySQL
echo 2. Ejecuta: mysql -u root -p ^< database.sql
echo 3. Inicia el servidor con: npm start
echo.
pause
