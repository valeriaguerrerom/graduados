-- ============================================
-- EJECUTA ESTE SQL EN MYSQL WORKBENCH
-- ============================================
-- Instrucciones:
-- 1. Abre MySQL Workbench
-- 2. Conecta a tu servidor (localhost)
-- 3. Selecciona la base de datos: USE red_egresados;
-- 4. Copia y pega TODO este código
-- 5. Click en el rayo ⚡ para ejecutar
-- ============================================

USE red_egresados;

-- Crear tabla de encuestas de satisfacción
CREATE TABLE IF NOT EXISTS encuestas_satisfaccion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) NOT NULL,
  
  -- Preguntas con escala 1-5
  calidad_academica INT NOT NULL,
  pertinencia_contenidos INT NOT NULL,
  nivel_docentes INT NOT NULL,
  aplicabilidad_conocimientos INT NOT NULL,
  acompanamiento_institucional INT NOT NULL,
  cumplimiento_expectativas INT NOT NULL,
  satisfaccion_general INT NOT NULL,
  
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
ADD COLUMN IF NOT EXISTS ha_completado_encuesta BOOLEAN DEFAULT FALSE;

-- Verificar que se creó correctamente
SELECT 'Tabla encuestas_satisfaccion creada exitosamente ✅' AS resultado;
SELECT 'Campo ha_completado_encuesta agregado a usuarios ✅' AS resultado;
