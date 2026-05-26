-- Migración: Agregar campo 'rol' y 'ha_completado_encuesta' a la tabla usuarios
-- Ejecutar esto si la base de datos ya existe sin estos campos

USE red_egresados;

-- Agregar columna rol (ignorar error si ya existe)
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'red_egresados' AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'rol');
SET @sql = IF(@col_exists = 0, 
    "ALTER TABLE usuarios ADD COLUMN rol ENUM('egresado', 'coordinador') DEFAULT 'egresado' AFTER aspecto_mejorar", 
    'SELECT "Columna rol ya existe"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Agregar columna ha_completado_encuesta (ignorar error si ya existe)
SET @col_exists2 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'red_egresados' AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'ha_completado_encuesta');
SET @sql2 = IF(@col_exists2 = 0, 
    'ALTER TABLE usuarios ADD COLUMN ha_completado_encuesta BOOLEAN DEFAULT FALSE AFTER rol', 
    'SELECT "Columna ha_completado_encuesta ya existe"');
PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;
