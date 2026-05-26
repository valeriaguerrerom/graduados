-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS red_egresados CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE red_egresados;

-- Tabla de usuarios/egresados con TODOS los campos del formulario
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    -- DATOS BÁSICOS
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(20),
    
    -- DATOS SOCIOECONÓMICOS Y DEMOGRÁFICOS
    fecha_nacimiento DATE,
    sexo ENUM('Femenino', 'Masculino'),
    estado_civil ENUM('Soltero', 'Casado/unión libre'),
    pais VARCHAR(100),
    departamento VARCHAR(100),
    municipio VARCHAR(100),
    direccion_correspondencia VARCHAR(255),
    
    -- INFORMACIÓN ACADÉMICA
    programa VARCHAR(150),
    año_graduacion VARCHAR(4),
    fec_grado DATE,
    modalidad ENUM('Presencial', 'Virtual', 'Mixta'),
    
    -- ESTUDIOS ADICIONALES
    postgrados_salud BOOLEAN DEFAULT FALSE,
    diplomados_actualizacion BOOLEAN DEFAULT FALSE,
    cursos_sena BOOLEAN DEFAULT FALSE,
    ningun_estudio_adicional BOOLEAN DEFAULT FALSE,
    
    -- IDIOMAS
    habla_otro_idioma BOOLEAN DEFAULT FALSE,
    cual_idioma VARCHAR(100),
    
    -- SITUACIÓN LABORAL ACTUAL
    condicion_laboral ENUM('Empleado', 'Desempleado', 'Independiente', 'Empleado e independiente'),
    ciudad_trabajo VARCHAR(100),
    tiempo_experiencia ENUM('Menos de un año', 'Entre 1 año y 3', 'Más de 4 años', 'No he tenido experiencia laboral'),
    
    -- PRIMER EMPLEO
    lugar_residencia_primer_empleo VARCHAR(100),
    acceso_primer_empleo ENUM(
        'Estaba trabajando antes de graduarme',
        'Inmediatamente al graduarse',
        'Al mes de graduarse',
        'A los tres meses después de graduarse',
        'A los 6 meses después de graduarse',
        'A los 12 meses después de graduarse',
        'No está laborando en el campo de formación profesional'
    ),
    medio_obtencion_empleo ENUM(
        'Bolsa de trabajo',
        'Contactos personales, familiares o conocidos',
        'Bolsa de empleo de la UNIMAR',
        'Convocatorias de las Empresas sociales del estado',
        'Portal web',
        'Redes sociales( Linkedln, Facebook, Twitter )'
    ),
    
    -- EMPLEO ACTUAL
    labora_actualmente_en ENUM(
        'Empresas sociales del estado',
        'Entidades asistenciales privadas',
        'Empresas promotoras de salud',
        'Es independiente, el trabajo está relacionado con el área de formación',
        'Es independiente',
        'Consultorio medico',
        'ONG'
    ),
    ingreso_mensual ENUM('1 SMLV', '2 SMLV', '3 SMLV', '4 SMLV', '5 o Más SMLV'),
    
    -- DIFICULTADES LABORALES
    dificultad_conseguir_trabajo ENUM(
        'Carece de la experiencia necesaria',
        'No hay oportunidades de trabajo',
        'El salario que le ofrecen es muy bajo',
        'No encuentra trabajo en su campo de estudio',
        'No sabe cómo buscarlo',
        'Otro'
    ),
    otra_dificultad VARCHAR(255),
    
    -- ÁREA DE DESEMPEÑO
    area_desempeno ENUM(
        'Dirección o gerencia',
        'Adminsitratva',
        'Profesional de apoyo (instituto de salud)',
        'Docencia',
        'Capacitaciones a personal de salud',
        'Consultor y asesor en temas de salud',
        'Coordinador(a) de área o red',
        'Nutrición normal o clínica',
        'Agroalimentaría e industrial',
        'Nutrición comunitaria',
        'Servicios de alimentación'
    ),
    
    -- TRAYECTORIA PROFESIONAL
    cantidad_empleos ENUM(
        'Uno',
        'Más de tres empleos en diferentes áreas',
        'Solo me he desempeñado en el campo que inicie',
        'No me he desempeñado',
        'Estoy desempleado'
    ),
    
    -- RECONOCIMIENTO PROFESIONAL
    ha_recibido_reconocimiento BOOLEAN DEFAULT FALSE,
    tipo_reconocimiento ENUM('Académico', 'Político', 'Laboral', 'Social', 'Relación docencia servicio', 'Cultural', 'Otro'),
    otro_reconocimiento VARCHAR(255),
    
    -- PARTICIPACIÓN EN REDES
    participa_redes ENUM('Regional', 'Nacional', 'Internacional'),
    tipo_red ENUM('Académica/científica', 'Asociación de profesionales', 'Agremiación profesional (COLNUD, ACODIN)', 'Culturales', 'Ninguna'),
    
    -- PRODUCCIÓN ACADÉMICA
    libros_publicados BOOLEAN DEFAULT FALSE,
    capitulos_libros BOOLEAN DEFAULT FALSE,
    patentes BOOLEAN DEFAULT FALSE,
    politicas_publicas BOOLEAN DEFAULT FALSE,
    ninguna_produccion BOOLEAN DEFAULT FALSE,
    
    -- EXPERIENCIA INTERNACIONAL - ESTUDIO
    estuvo_exterior_estudio BOOLEAN DEFAULT FALSE,
    pais_estudio VARCHAR(100),
    
    -- EXPERIENCIA INTERNACIONAL - TRABAJO
    estuvo_exterior_trabajo BOOLEAN DEFAULT FALSE,
    pais_trabajo VARCHAR(100),
    tiempo_exterior_trabajo ENUM('Menos de un mes', 'Más de 2 meses', 'Más de 6 meses', 'Más de un año', 'No he estado en el exterior'),
    area_desempeno_exterior ENUM('Dirección de procesos', 'Administrativa', 'Profesional de apoyo', 'Docencia', 'Otro'),
    otra_area_exterior VARCHAR(255),
    
    -- CURSOS Y SEMINARIOS
    donde_realizar_estudios ENUM('Colombia', 'Exterior'),
    cursaria_estudios_unimar ENUM('Si me gustaría', 'No me gustaría', 'Ya estoy cursando otros estudios en la institución'),
    tipo_formacion_futura ENUM(
        'Estudios en idiomas',
        'Seminarios/cursos/diplomados',
        'Programa técnico y tecnológico',
        'Programa universitario',
        'Especialización',
        'Maestría',
        'Doctorado'
    ),
    
    -- ASPECTOS A MEJORAR
    aspecto_mejorar TEXT,
    
    -- CONTROL
    rol ENUM('egresado', 'coordinador') DEFAULT 'egresado',
    ha_completado_encuesta BOOLEAN DEFAULT FALSE,
    has_completed_profile BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar los usuarios iniciales (la cédula es también la contraseña inicial)
INSERT INTO usuarios (cedula, password, nombre, apellido, has_completed_profile) VALUES
('11004343198', '11004343198', 'LISBETH MRCELA', 'ACOSTA USCATEGUI', FALSE),
('11085288058', '11085288058', 'ANDREA MARGARITA', 'ARCINIEGAS PAZ', FALSE),
('11130641294', '11130641294', 'FABIAN ANCIZAR', 'BASTIDAS BENAVIDES', FALSE),
('11193470035', '11193470035', 'CHRISTIAN CAMILO', 'BELALCAZAR SARASTY', FALSE),
('11085288765', '11085288765', 'MARIA FERNANDA', 'BENAVIDES ENRIQUEZ', FALSE),
('11004540103', '11004540103', 'JOSE ANDRES', 'FAJARDO MARTINEZ', FALSE),
('11085249424', '11085249424', 'NATHALY MARCELA', 'IGUA VEGA', FALSE),
('11085318241', '11085318241', 'KAREN MELISSA', 'LOPEZ TORO', FALSE),
('11087416531', '11087416531', 'YADY ELIZABETH', 'MAYAG TOBAR', FALSE),
('11193470044', '11193470044', 'LAURA SOFIA', 'MORALES SAA', FALSE),
('11088254689', '11088254689', 'DIANA CAROLINA', 'ORDOÑEZ VILLAMARIN', FALSE),
('11085325441', '11085325441', 'DAVID SANTIAGO', 'PULGARIN PAZ', FALSE),
('11085335289', '11085335289', 'DANIEL ALEXANDER', 'RODRIGUEZ TERAN', FALSE),
('11086548851', '11086548851', 'ROBERT DARIO', 'SILVA DELGADO', FALSE),
('115817476', '115817476', 'JAVIER ALFONSO', 'ARCOS INSUASTY', FALSE),
('11086303255', '11086303255', 'ELIANA MARCELA', 'CHAVEZ CHAVEZ', FALSE),
('11085274545', '11085274545', 'LADY MARY', 'CUNDAR YELA', FALSE),
('11004508558', '11004508558', 'ANDREA CAMILA', 'DELGADO BUCHELI', FALSE),
('11061783728', '11061783728', 'YESICA ALEXANDRA', 'ROSERO BURBANO', FALSE),
('11085323962', '11085323962', 'CARLOS HERNAN', 'ACOSTA MOZO', FALSE),
('11085947167', '11085947167', 'NEIDER MATEO', 'ATIS MORALES', FALSE),
('11085341999', '11085341999', 'DIEGO FERNANDO', 'CORAL MORA', FALSE),
('127282356', '127282356', 'MARTHA YOHANA', 'DELGADO CORDOBA', FALSE),
('11193474796', '11193474796', 'PABLO ANDRES', 'MORA MORALES', FALSE),
('11003815276', '11003815276', 'JUAN JOSE', 'PEDROZA GENOY', FALSE),
('11085324101', '11085324101', 'MARIA CAMILA', 'SOLARTE SARRALDE', FALSE),
('11085346317', '11085346317', 'BRAYAN CAMILO', 'UNIGARRO ENRIQUEZ', FALSE),
('11234192453', '11234192453', 'DANIELA', 'YEPEZ PATIÑO', FALSE),
('21088594815', '21088594815', 'EDINSON EDUARDO', 'ALPALA VALENZUELA', FALSE),
('21086983091', '21086983091', 'CRISTIAN FERNANDO', 'DELGADO CORAL', FALSE),
('21061712786', '21061712786', 'YURY GABRIELA', 'DURAN RAMIREZ', FALSE),
('21085339806', '21085339806', 'RICARDO FELIPE', 'ESCOBAR FAJARDO', FALSE),
('21059600971', '21059600971', 'YARI MAGALLY', 'GOMEZ CHALACA', FALSE),
('21088654436', '21088654436', 'LEIDY ANDREA', 'NOVOA REINA', FALSE),
('237121160', '237121160', 'NURI LUGARDA', 'PAZMIÑO VILLOTA', FALSE),
('21233192200', '21233192200', 'OSCAR MATEO', 'PAZOS MERA', FALSE),
('21085334634', '21085334634', 'JAVIER MATEO', 'PORTILLO DIAZ', FALSE),
('21086105522', '21086105522', 'DIANA PATRICIA', 'ROSERO ZAMBRANO', FALSE),
('21085342695', '21085342695', 'VALERY NATHALIE', 'TABLA ORTEGA', FALSE),
('21085342868', '21085342868', 'LUISA NATALIA', 'BASTIDAS RODRIGUEZ', FALSE),
('21085325409', '21085325409', 'CINDY MILENA', 'CHAVES ZAMBRANO', FALSE),
('259788939', '259788939', 'YASMIN MARCELA', 'CORDOBA TOVAR', FALSE),
('21087426011', '21087426011', 'DANILO GUILLERMO', 'CUCAS MELO', FALSE),
('21004535332', '21004535332', 'HEVELIN DAYANA', 'ERASO VALENCIA', FALSE),
('21085295445', '21085295445', 'MICHAEL GABRIEL', 'GOMEZ LENIS', FALSE),
('21004235167', '21004235167', 'SEBASTIAN ALEJANDRO', 'MORENO VALENCIA', FALSE),
('21085913273', '21085913273', 'JUAN DAVID', 'NARVAEZ CHAMORRO', FALSE),
('259815811', '259815811', 'MARIA COSTANZA', 'ORTIZ ARTURO', FALSE),
('21085325845', '21085325845', 'HUGO FERNANDO', 'PANTOJA BARONA', FALSE),
('21193139642', '21193139642', 'JUAN SEBASTIAN', 'RIASCOS RODRIGUEZ', FALSE),
('21193035800', '21193035800', 'DIEGO ALEJANDRO', 'ROSALES ORTEGA', FALSE),
('227087542', '227087542', 'ADRIANA MARCELA', 'VALENZUELA', FALSE),
('11086137858', '11086137858', 'TANIA ELISA', 'BARCO NOGUERA', FALSE),
('11053869833', '11053869833', 'MARIA ALEJANDRA', 'CHECA BRAVO', FALSE),
('11004563900', '11004563900', 'PAULA ANDREA', 'BASTIDAS ESPAÑA', FALSE),
('11004215077', '11004215077', 'JUAN ESTEBAN', 'CARMONA RIVAS', FALSE),
('11233191588', '11233191588', 'DARIO FERNANDO', 'CORTEZ BENAVIDES', FALSE),
('11086756205', '11086756205', 'MAYER MILEYSA', 'MENDOZA BASTIDAS', FALSE),
('11085344867', '11085344867', 'MARIA FERNANDA', 'MUESES ROSERO', FALSE),
('11085339480', '11085339480', 'ANGIE CAROLINA', 'POLO DELGADO', FALSE),
('11233189021', '11233189021', 'LEIDY CAROLINA', 'PORTILLA NASTUL', FALSE),
('11233191706', '11233191706', 'LEYDI KATERINE', 'RIVERA RAMOS', FALSE),
('11085317785', '11085317785', 'JESSICA ALEJANDRA', 'ROMO CAICEDO', FALSE),
('11085331140', '11085331140', 'MARIA ALEJANDRA', 'SALAZAR PAZ', FALSE),
('11085261589', '11085261589', 'JENNIFER DAYAN', 'TORRES NARANJO', FALSE);

-- Usuario de prueba adicional
INSERT INTO usuarios (cedula, password, nombre, apellido, email, telefono, programa, año_graduacion, has_completed_profile) 
VALUES ('1234567890', '1234567890', 'Juan', 'Pérez', 'juan.perez@example.com', '3001234567', 'Nutrición y Dietética', '2020', FALSE)
ON DUPLICATE KEY UPDATE cedula=cedula;

-- Índices para mejorar el rendimiento
CREATE INDEX idx_cedula ON usuarios(cedula);
CREATE INDEX idx_email ON usuarios(email);
CREATE INDEX idx_has_completed_profile ON usuarios(has_completed_profile);
CREATE INDEX idx_año_graduacion ON usuarios(año_graduacion);
CREATE INDEX idx_condicion_laboral ON usuarios(condicion_laboral);

-- ============================================
-- Tabla de encuestas institucionales (HU017)
-- ============================================

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

-- Datos iniciales de encuestas institucionales
INSERT INTO encuestas_institucionales (titulo, descripcion, tiempo_estimado) VALUES
('Encuesta de Satisfacción Laboral 2026', 'Ayúdanos a entender mejor la situación laboral actual de nuestros egresados.', '10 minutos'),
('Evaluación de Programas Académicos 2026', 'Tu opinión es importante para mejorar nuestros programas académicos.', '15 minutos');
