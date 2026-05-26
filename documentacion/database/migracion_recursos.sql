-- Migración: Tabla de recursos profesionales (CRUD desde admin)
-- Ejecutar este script en MySQL

USE red_egresados;

CREATE TABLE IF NOT EXISTS recursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(100) DEFAULT 'General',
  tipo ENUM('enlace', 'descarga') DEFAULT 'enlace',
  url VARCHAR(500) NOT NULL,
  imagen_url LONGTEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales
INSERT INTO recursos (titulo, descripcion, categoria, tipo, url, imagen_url) VALUES
('Biblioteca Universidad Mariana', 'Acceso al catálogo bibliográfico, bases de datos y recursos académicos de la universidad.', 'Biblioteca', 'enlace', 'https://www.umariana.edu.co/Biblioteca.html', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Normativa ISO', 'Material de referencia sobre normas ISO para Sistemas Integrados de Gestión.', 'Normas ISO', 'enlace', 'https://drive.google.com/drive/folders/TU_ENLACE_AQUI', 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Plantillas SIG', 'Plantillas profesionales para documentación de Sistemas Integrados de Gestión.', 'Plantillas', 'descarga', 'https://drive.google.com/drive/folders/TU_ENLACE_AQUI', 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800');
