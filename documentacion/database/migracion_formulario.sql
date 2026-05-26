-- Migración: Cambios en el formulario de perfil de egresados
-- Ejecutar en MySQL — Si una columna ya existe, ignorar el error y continuar

USE red_egresados;

-- 1. Año de graduación: cambiar a período
ALTER TABLE usuarios MODIFY COLUMN año_graduacion VARCHAR(10);

-- 2. Modalidad: solo Presencial y Virtual
ALTER TABLE usuarios MODIFY COLUMN modalidad ENUM('Presencial', 'Virtual');

-- 3. Estudios adicionales: campo de texto libre
-- Si da error "Duplicate column name" es porque ya existe, ignorar
ALTER TABLE usuarios ADD COLUMN estudios_adicionales TEXT AFTER ningun_estudio_adicional;

-- 4. Labora actualmente en: texto libre + otro
ALTER TABLE usuarios MODIFY COLUMN labora_actualmente_en VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN otra_labor VARCHAR(255) AFTER labora_actualmente_en;

-- 5. Ingreso mensual: agregar opciones
ALTER TABLE usuarios MODIFY COLUMN ingreso_mensual ENUM('Desempleado', 'Menos de 1 SMLV', '1 SMLV', '2 SMLV', '3 SMLV', '4 SMLV', '5 o Más SMLV');

-- 6. Área de desempeño: texto libre + otro
ALTER TABLE usuarios MODIFY COLUMN area_desempeno VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN otra_area_desempeno VARCHAR(255) AFTER area_desempeno;

-- 7. Dificultad para conseguir trabajo: texto libre
ALTER TABLE usuarios MODIFY COLUMN dificultad_conseguir_trabajo VARCHAR(255);

-- 8. Medio de obtención de empleo: texto libre + otro
ALTER TABLE usuarios MODIFY COLUMN medio_obtencion_empleo VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN otro_medio_empleo VARCHAR(255) AFTER medio_obtencion_empleo;

-- 9. Participación en redes
ALTER TABLE usuarios MODIFY COLUMN participa_redes VARCHAR(100);

-- 10. Tipo de red + otra
ALTER TABLE usuarios MODIFY COLUMN tipo_red VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN otra_red VARCHAR(255) AFTER tipo_red;

-- 11. Producción académica: otra
ALTER TABLE usuarios ADD COLUMN otra_produccion TEXT AFTER ninguna_produccion;

-- 12. Tiempo exterior trabajo: sin "No he estado"
ALTER TABLE usuarios MODIFY COLUMN tiempo_exterior_trabajo ENUM('Menos de un mes', 'Más de 2 meses', 'Más de 6 meses', 'Más de un año');
