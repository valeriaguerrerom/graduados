-- ============================================
-- SQL PARA ROL LÍDER - EJECUTA ESTO EN MYSQL
-- ============================================

USE red_egresados;

-- 1. Agregar campo de rol a usuarios
ALTER TABLE usuarios 
ADD COLUMN rol ENUM('egresado', 'lider', 'admin') DEFAULT 'egresado';

-- 2. Crear tabla de líderes/administradores
CREATE TABLE IF NOT EXISTS lideres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('lider', 'admin') DEFAULT 'lider',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Insertar un líder de prueba
-- Usuario: lider / Contraseña: lider123
INSERT INTO lideres (cedula, nombre, apellido, email, password, rol) 
VALUES ('lider', 'Coordinador', 'ESIG', 'coordinador@unimar.edu.co', 'lider123', 'lider');

-- 4. Verificar que se creó correctamente
SELECT * FROM lideres;
SELECT 'Tabla lideres creada exitosamente ✅' AS resultado;
