-- Tabla para el tablero de networking entre egresados
-- Ejecutar en MySQL

USE red_egresados;

CREATE TABLE IF NOT EXISTS tablero_networking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL,
    rol_profesional VARCHAR(150) NOT NULL,
    que_ofrece TEXT NOT NULL,
    que_necesita TEXT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cedula) REFERENCES usuarios(cedula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
