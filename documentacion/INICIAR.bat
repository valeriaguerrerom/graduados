@echo off
title Red de Egresados - Universidad Mariana
color 0A

echo ========================================
echo   RED DE EGRESADOS - UNIVERSIDAD MARIANA
echo ========================================
echo.

:menu
echo Selecciona una opcion:
echo.
echo 1. Instalar dependencias (primera vez)
echo 2. Iniciar Backend (servidor MySQL)
echo 3. Iniciar Frontend (aplicacion web)
echo 4. Iniciar TODO (Backend + Frontend)
echo 5. Ver usuarios precargados
echo 6. Salir
echo.
set /p opcion="Ingresa el numero de opcion: "

if "%opcion%"=="1" goto instalar
if "%opcion%"=="2" goto backend
if "%opcion%"=="3" goto frontend
if "%opcion%"=="4" goto todo
if "%opcion%"=="5" goto usuarios
if "%opcion%"=="6" goto salir

echo Opcion invalida. Intenta de nuevo.
echo.
goto menu

:instalar
echo.
echo [1/2] Instalando dependencias del Frontend...
call npm install
echo.
echo [2/2] Instalando dependencias del Backend...
cd server
call npm install
cd ..
echo.
echo Instalacion completada!
echo.
echo IMPORTANTE: No olvides:
echo 1. Crear la base de datos: mysql -u root -p ^< server/database.sql
echo 2. Configurar server/.env con tus credenciales de MySQL
echo.
pause
goto menu

:backend
echo.
echo Iniciando Backend en http://localhost:3001...
echo.
cd server
start cmd /k "npm start"
cd ..
echo Backend iniciado en una nueva ventana.
echo.
pause
goto menu

:frontend
echo.
echo Iniciando Frontend en http://localhost:5173...
echo.
start cmd /k "npm run dev"
echo Frontend iniciado en una nueva ventana.
echo.
pause
goto menu

:todo
echo.
echo Iniciando Backend y Frontend...
echo.
cd server
start cmd /k "title Backend - Puerto 3001 && npm start"
cd ..
timeout /t 3 /nobreak >nul
start cmd /k "title Frontend - Puerto 5173 && npm run dev"
echo.
echo Ambos servicios iniciados!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause
goto menu

:usuarios
echo.
type LISTA_USUARIOS.txt
echo.
echo Todos los usuarios tienen como contrasena su numero de cedula.
echo.
pause
goto menu

:salir
echo.
echo Gracias por usar Red de Egresados!
echo.
exit

