-- Tablas para empleos y eventos editables desde admin
USE red_egresados;

CREATE TABLE IF NOT EXISTS ofertas_empleo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    empresa VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(200),
    tipo VARCHAR(100) DEFAULT 'Tiempo completo',
    salario VARCHAR(100),
    descripcion TEXT,
    contacto VARCHAR(255),
    contacto_tipo ENUM('email', 'link') DEFAULT 'email',
    imagen_url VARCHAR(500),
    es_imagen BOOLEAN DEFAULT FALSE,
    fijada BOOLEAN DEFAULT FALSE,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(100) DEFAULT 'Evento',
    tipo_color VARCHAR(100) DEFAULT 'bg-blue-100 text-blue-800',
    fecha VARCHAR(200),
    duracion VARCHAR(100),
    modalidad VARCHAR(100),
    certificado VARCHAR(200),
    costo VARCHAR(100) DEFAULT 'Por confirmar',
    imagen_url VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar la bolsa publica de empleo como fijada
INSERT INTO ofertas_empleo (titulo, empresa, ubicacion, tipo, salario, descripcion, contacto, contacto_tipo, fijada, imagen_url)
VALUES ('Bolsa Publica de Empleo', 'Ministerio del Trabajo / Universidad Mariana', 'Colombia', 'Portal de empleo', 'Variado', 'Registra tu hoja de vida en el Servicio Publico de Empleo y accede a miles de vacantes.', 'https://personas.serviciodeempleo.gov.co/login.aspx', 'link', TRUE, 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insertar eventos iniciales
INSERT INTO eventos (titulo, descripcion, tipo, tipo_color, fecha, duracion, modalidad, certificado, costo, imagen_url) VALUES
('Simposio: Sistemas Integrados de Gestion', 'Espacio academico para analizar tendencias e innovaciones en SIG.', 'Simposio', 'bg-purple-100 text-purple-800', '15 y 16 de Octubre, 2026', 'Jornada completa', 'Universidad Mariana — Presencial', 'Universidad Mariana', 'Por confirmar', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Curso Virtual: Power BI desde Cero', 'Aprende a crear dashboards y visualizar datos. Curso 100% practico.', 'Curso', 'bg-green-100 text-green-800', 'Mayo 2026', '24 horas', 'Virtual', 'Universidad Mariana', 'Gratuito', 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Diplomado en Seguridad de Procesos', 'Formacion en identificacion, evaluacion y control de riesgos industriales.', 'Diplomado', 'bg-orange-100 text-orange-800', 'Segundo semestre 2026', '120 horas', 'Por confirmar', 'Universidad Mariana', 'Por confirmar', 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800');
