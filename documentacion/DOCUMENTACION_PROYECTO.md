# Red de Egresados - Especialización en Sistemas Integrados de Gestión
## Universidad Mariana

---

## 📋 Descripción del Proyecto

La **Red de Egresados de la Especialización en Sistemas Integrados de Gestión** es una plataforma web diseñada para mantener el vínculo entre la Universidad Mariana y sus egresados, facilitando el seguimiento profesional, la conexión entre graduados y el acceso a recursos exclusivos.

### Propósito

- **Seguimiento a Egresados**: Recopilar información actualizada sobre la situación laboral, académica y profesional de los graduados
- **Networking Profesional**: Facilitar la conexión entre egresados para oportunidades de colaboración
- **Bolsa de Empleo**: Ofrecer oportunidades laborales exclusivas para la comunidad de egresados
- **Recursos y Desarrollo**: Proporcionar herramientas, capacitaciones y recursos para el crecimiento profesional
- **Encuestas Institucionales**: Realizar seguimiento mediante encuestas estructuradas

---

## 👥 Usuarios del Sistema

El sistema cuenta actualmente con **66 egresados registrados** en la base de datos, cada uno con:
- Número de cédula (usuario de acceso)
- Contraseña inicial (igual a su cédula)
- Datos básicos (nombre y apellido)

---

## 🎯 Requerimientos Funcionales

### 1. Sistema de Autenticación
- Login con cédula y contraseña
- Sesión persistente con Context API de React
- Rutas protegidas que requieren autenticación
- Cierre de sesión seguro

### 2. Gestión de Perfiles
- Formulario de actualización de datos personales
- Información demográfica y socioeconómica
- Historial académico y estudios adicionales
- Situación laboral actual y trayectoria profesional
- Experiencia internacional
- Reconocimientos y participación en redes
- Producción académica
- Intereses de formación futura

### 3. Módulos Principales
- **Inicio**: Página principal con información institucional
- **Networking**: Eventos y oportunidades de conexión (requiere perfil completo)
- **Recursos**: Herramientas y materiales de desarrollo profesional (requiere perfil completo)
- **Empleos**: Bolsa de trabajo exclusiva para egresados (requiere perfil completo)
- **Encuestas**: Sistema de seguimiento institucional (requiere perfil completo)
- **Perfil**: Visualización y edición de información personal

### 4. Restricciones de Acceso
- Los módulos principales requieren que el usuario haya completado su perfil
- No hay registro público (usuarios gestionados manualmente por la institución)
- Acceso exclusivo para egresados registrados

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** como build tool y dev server
- **React Router DOM** para navegación
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Context API** para gestión de estado global

### Backend
- **Node.js** con Express
- **MySQL 8.0** como base de datos
- **mysql2** para conexión con la BD
- **CORS** para comunicación frontend-backend
- **dotenv** para variables de entorno

### Colores Institucionales
- **Azul Marino** (#003B7A): Color primario
- **Dorado** (#FDB913): Color secundario
- **Verde** (#82bb08): Color accent (destacado en la especialización)

---

## 🗄️ Estructura de la Base de Datos

### Tabla: `usuarios`

La tabla principal contiene **66 campos** organizados en las siguientes categorías:

#### Datos Básicos (7 campos)
- `id`, `cedula`, `password`, `nombre`, `apellido`, `email`, `telefono`

#### Datos Socioeconómicos y Demográficos (7 campos)
- `fecha_nacimiento`, `sexo`, `estado_civil`, `pais`, `departamento`, `municipio`, `direccion_correspondencia`

#### Información Académica (4 campos)
- `programa`, `año_graduacion`, `fec_grado`, `modalidad`

#### Estudios Adicionales (4 campos)
- `postgrados_salud`, `diplomados_actualizacion`, `cursos_sena`, `ningun_estudio_adicional`

#### Idiomas (2 campos)
- `habla_otro_idioma`, `cual_idioma`

#### Situación Laboral Actual (3 campos)
- `condicion_laboral`, `ciudad_trabajo`, `tiempo_experiencia`

#### Primer Empleo (3 campos)
- `lugar_residencia_primer_empleo`, `acceso_primer_empleo`, `medio_obtencion_empleo`

#### Empleo Actual (5 campos)
- `labora_actualmente_en`, `ingreso_mensual`, `dificultad_conseguir_trabajo`, `otra_dificultad`, `area_desempeno`

#### Trayectoria Profesional (1 campo)
- `cantidad_empleos`

#### Reconocimiento Profesional (3 campos)
- `ha_recibido_reconocimiento`, `tipo_reconocimiento`, `otro_reconocimiento`

#### Participación en Redes (2 campos)
- `participa_redes`, `tipo_red`

#### Producción Académica (5 campos)
- `libros_publicados`, `capitulos_libros`, `patentes`, `politicas_publicas`, `ninguna_produccion`

#### Experiencia Internacional - Estudio (2 campos)
- `estuvo_exterior_estudio`, `pais_estudio`

#### Experiencia Internacional - Trabajo (5 campos)
- `estuvo_exterior_trabajo`, `pais_trabajo`, `tiempo_exterior_trabajo`, `area_desempeno_exterior`, `otra_area_exterior`

#### Cursos y Seminarios (3 campos)
- `donde_realizar_estudios`, `cursaria_estudios_unimar`, `tipo_formacion_futura`

#### Aspectos a Mejorar (1 campo)
- `aspecto_mejorar`

#### Control (3 campos)
- `has_completed_profile`, `created_at`, `updated_at`

**Total: 66 campos**

---

## 📊 Características de la Base de Datos

- **Charset**: utf8mb4 con collation unicode_ci (soporte completo de caracteres especiales)
- **66 usuarios precargados** con cédula y contraseña
- **Índices optimizados** en campos clave (cedula, email, has_completed_profile, año_graduacion, condicion_laboral)
- **Timestamps automáticos** para created_at y updated_at
- **Validaciones** mediante ENUM para campos con opciones predefinidas

---

## 🔐 Seguridad

- Contraseñas almacenadas en texto plano (inicial = cédula)
- Sesiones manejadas en el cliente con Context API
- Rutas protegidas que verifican autenticación
- No se expone la contraseña en las respuestas del API
- CORS configurado para permitir comunicación frontend-backend

---

## 📞 Información de Contacto

**Oficina de Egresados - Especialización en Sistemas Integrados de Gestión**
- **Email**: egresadosespsistintegradosg@umariana.edu.co
- **Teléfono**: (+57) 602-7314923 Ext. 293
- **Dirección**: Calle 18 No. 34-104, Pasto, Nariño, Colombia
- **Web**: www.umariana.edu.co

---

## 🚀 Estado Actual del Proyecto

### Implementado ✅
- Sistema de autenticación completo
- Base de datos con 66 usuarios registrados
- Diseño responsive con colores institucionales
- Navegación con rutas protegidas
- Formulario básico de actualización de perfil
- Página de visualización de perfil
- Footer y Navbar institucionales

### Pendiente 🔄
- Formulario completo de 8 pasos con todos los campos de la encuesta
- Módulos de Networking, Recursos, Empleos y Encuestas
- Sistema de gestión de contenido para administradores
- Reportes y estadísticas de egresados
- Sistema de notificaciones por email

---

## 📝 Notas Importantes

1. Los usuarios NO pueden registrarse por sí mismos
2. Todos los registros son gestionados manualmente por la institución
3. La contraseña inicial es igual a la cédula del usuario
4. Se recomienda implementar cambio de contraseña en futuras versiones
5. El sistema está diseñado específicamente para la Especialización en Sistemas Integrados de Gestión

---

**Versión**: 1.0  
**Última actualización**: Noviembre 2024  
**Desarrollado para**: Universidad Mariana - Especialización en Sistemas Integrados de Gestión
