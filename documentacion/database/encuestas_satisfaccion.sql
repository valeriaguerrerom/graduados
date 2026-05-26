-- Tabla para Encuestas de Satisfacción
CREATE TABLE IF NOT EXISTS encuestas_satisfaccion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) NOT NULL,
  
  -- Preguntas con escala 1-5
  calidad_academica INT NOT NULL CHECK (calidad_academica BETWEEN 1 AND 5),
  pertinencia_contenidos INT NOT NULL CHECK (pertinencia_contenidos BETWEEN 1 AND 5),
  nivel_docentes INT NOT NULL CHECK (nivel_docentes BETWEEN 1 AND 5),
  aplicabilidad_conocimientos INT NOT NULL CHECK (aplicabilidad_conocimientos BETWEEN 1 AND 5),
  acompanamiento_institucional INT NOT NULL CHECK (acompanamiento_institucional BETWEEN 1 AND 5),
  cumplimiento_expectativas INT NOT NULL CHECK (cumplimiento_expectativas BETWEEN 1 AND 5),
  satisfaccion_general INT NOT NULL CHECK (satisfaccion_general BETWEEN 1 AND 5),
  
  -- Preguntas cortas
  aspecto_mas_valorado TEXT NOT NULL,
  aspecto_mejorar TEXT NOT NULL,
  recomendaria ENUM('Sí', 'No', 'Tal vez') NOT NULL,
  
  -- Metadata
  fecha_completada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Relación con usuarios
  FOREIGN KEY (cedula) REFERENCES usuarios(cedula) ON DELETE CASCADE,
  UNIQUE KEY unique_cedula (cedula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Agregar campo a usuarios para saber si completó la encuesta
ALTER TABLE usuarios 
ADD COLUMN ha_completado_encuesta BOOLEAN DEFAULT FALSE AFTER hasCompletedProfile;
