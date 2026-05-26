-- Migración: Agregar campo enlace_inscripcion a eventos
-- Ejecutar este script en MySQL

USE red_egresados;

-- Agregar columna de enlace de inscripción
ALTER TABLE eventos ADD COLUMN enlace_inscripcion VARCHAR(500) DEFAULT NULL;

-- Actualizar el evento de Power BI con el enlace de inscripción
UPDATE eventos 
SET enlace_inscripcion = 'https://forms.gle/4RkY6WpUHh5DSPn28',
    titulo = 'Introducción a Power BI para el Análisis y Visualización de Datos',
    descripcion = 'Curso gratuito certificado. Dirigido a estudiantes, egresados y profesionales. Modalidad virtual asincrónica (Plataforma Brader). Intensidad: 24 horas.',
    costo = 'Gratuito',
    imagen_url = 'https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE titulo LIKE '%Power BI%';
