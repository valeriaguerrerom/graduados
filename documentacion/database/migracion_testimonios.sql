-- Migración: Tabla de testimonios/videos de egresados
-- Ejecutar este script en MySQL

USE red_egresados;

CREATE TABLE IF NOT EXISTS testimonios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  youtube_url VARCHAR(500) NOT NULL,
  nombre_egresado VARCHAR(200),
  cargo VARCHAR(200),
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO testimonios (titulo, descripcion, youtube_url, nombre_egresado, cargo) VALUES
('Mi experiencia en la Especialización ESIG', 'Testimonio sobre cómo la especialización impulsó mi carrera profesional.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Egresado Destacado', 'Consultor en SIG');
