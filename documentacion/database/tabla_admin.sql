-- Agregar rol admin a la tabla lideres
-- Ejecutar en MySQL

USE red_egresados;

-- Insertar admin de prueba (usuario: admin / password: admin123)
INSERT INTO lideres (cedula, nombre, apellido, email, password, rol) 
VALUES ('admin', 'Administrador', 'Sistema', 'admin@umariana.edu.co', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE rol = 'admin';
