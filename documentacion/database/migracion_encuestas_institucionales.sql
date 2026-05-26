-- Migración: Encuestas Institucionales (HU017)
-- Ejecutar este script en MySQL para crear las tablas necesarias

USE red_egresados;

CREATE TABLE IF NOT EXISTS encuestas_institucionales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  tiempo_estimado VARCHAR(50),
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS respuestas_encuestas_institucionales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  encuesta_id INT NOT NULL,
  cedula VARCHAR(20) NOT NULL,
  respuestas JSON NOT NULL,
  fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (encuesta_id) REFERENCES encuestas_institucionales(id) ON DELETE CASCADE,
  FOREIGN KEY (cedula) REFERENCES usuarios(cedula) ON DELETE CASCADE,
  UNIQUE KEY unique_respuesta (encuesta_id, cedula)
);

-- Datos iniciales
INSERT INTO encuestas_institucionales (titulo, descripcion, tiempo_estimado) VALUES
('Encuesta de Satisfacción Laboral 2026', 'Ayúdanos a entender mejor la situación laboral actual de nuestros egresados.', '10 minutos'),
('Evaluación de Programas Académicos 2026', 'Tu opinión es importante para mejorar nuestros programas académicos.', '15 minutos');
