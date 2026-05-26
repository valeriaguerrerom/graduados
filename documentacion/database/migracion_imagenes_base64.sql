-- Migración: Cambiar columnas de imagen a LONGTEXT para almacenar Base64
-- Ejecutar este script en MySQL

USE red_egresados;

-- Foto de perfil de usuarios
ALTER TABLE usuarios MODIFY COLUMN foto_url LONGTEXT DEFAULT NULL;

-- Imágenes de ofertas laborales
ALTER TABLE ofertas_empleo MODIFY COLUMN imagen_url LONGTEXT DEFAULT NULL;

-- Imágenes de eventos
ALTER TABLE eventos MODIFY COLUMN imagen_url LONGTEXT DEFAULT NULL;
