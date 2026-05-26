-- Tabla para contabilizar clicks en recursos
-- Ejecutar en MySQL

USE red_egresados;

CREATE TABLE IF NOT EXISTS recursos_clicks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recurso_id VARCHAR(100) NOT NULL,
    tipo ENUM('descarga', 'enlace') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_recurso_id ON recursos_clicks(recurso_id);
CREATE INDEX idx_tipo ON recursos_clicks(tipo);
