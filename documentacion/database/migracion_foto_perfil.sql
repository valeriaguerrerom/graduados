-- Migración: Agregar foto de perfil a usuarios
-- Ejecutar este script en MySQL

USE red_egresados;

ALTER TABLE usuarios ADD COLUMN foto_url VARCHAR(500) DEFAULT NULL;
