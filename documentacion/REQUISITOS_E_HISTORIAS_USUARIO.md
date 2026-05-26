# REQUISITOS FUNCIONALES, NO FUNCIONALES E HISTORIAS DE USUARIO
## Plataforma Web de Seguimiento a Egresados - Universidad Mariana

---

## TABLA DE CONTENIDO

1. [Requisitos Funcionales (RF)](#requisitos-funcionales)
2. [Requisitos No Funcionales (RNF)](#requisitos-no-funcionales)
3. [Historias de Usuario (HU)](#historias-de-usuario)

---

## REQUISITOS FUNCIONALES

Los requisitos funcionales describen las acciones específicas que el sistema debe realizar para satisfacer las necesidades de los usuarios.

**Proceso de levantamiento:**
1. Análisis de resultados de encuesta a 29 egresados
2. Entrevistas con director del programa y egresados
3. Revisión de requisitos institucionales y de acreditación
4. Identificación de procesos de negocio críticos
5. Definición de criterios de aceptación medibles

---

### RF-01: Gestión de Encuesta de Satisfacción

**Descripción:** El sistema debe permitir a los egresados completar una encuesta de satisfacción sobre el programa académico antes de acceder a la plataforma.

**Criterios de Aceptación:**
- El egresado debe ingresar su número de cédula para iniciar la encuesta
- La encuesta debe incluir 7 preguntas con escala Likert (1-5 estrellas)
- Debe incluir 2 preguntas abiertas de texto
- Debe incluir 1 pregunta de selección múltiple (Sí/No/Tal vez)
- El sistema debe validar que todos los campos estén completos antes de enviar
- Cada egresado solo puede completar la encuesta una vez
- Los datos deben almacenarse en una tabla separada en la base de datos

**Prioridad:** Alta  
**Módulo:** Encuestas

---

### RF-02: Autenticación de Usuarios

**Descripción:** El sistema debe validar la identidad de los usuarios mediante credenciales únicas y verificar que hayan completado la encuesta de satisfacción.

**Criterios de Aceptación:**
- El egresado debe poder iniciar sesión con cédula y contraseña
- El sistema debe verificar si el usuario completó la encuesta de satisfacción
- Si no completó la encuesta, debe mostrar mensaje y redirigir a completarla
- Si completó la encuesta, debe permitir el acceso a la plataforma
- La sesión debe mantenerse activa aunque se cierre el navegador
- Debe mostrar mensajes de error claros en caso de credenciales incorrectas

**Prioridad:** Alta  
**Módulo:** Autenticación

---

### RF-03: Gestión de Perfil del Egresado

**Descripción:** El sistema debe permitir a los egresados completar y actualizar su información personal, académica y profesional mediante un formulario multi-paso.

**Criterios de Aceptación:**
- El formulario debe dividirse en 9 pasos claramente identificados
- Debe incluir más de 60 campos organizados por categorías
- Debe mostrar barra de progreso visual
- Debe validar campos obligatorios antes de avanzar al siguiente paso
- Debe permitir navegación hacia adelante y atrás entre pasos
- Los datos deben guardarse al finalizar todos los pasos
- Debe mostrar confirmación visual al guardar exitosamente

**Prioridad:** Alta  
**Módulo:** Perfil de Egresado

---

### RF-04: Visualización de Perfil

**Descripción:** El sistema debe permitir a los egresados visualizar toda su información registrada de manera organizada y clara.

**Criterios de Aceptación:**
- Debe mostrar toda la información organizada por secciones
- Debe indicar el porcentaje de completitud del perfil
- Debe ser responsive (adaptarse a diferentes dispositivos)
- Debe permitir editar la información desde la vista de perfil

**Prioridad:** Media  
**Módulo:** Perfil de Egresado

---

### RF-05: Dashboard de Coordinadores

**Descripción:** El sistema debe proporcionar a los coordinadores un panel de control con estadísticas generales sobre los egresados.

**Criterios de Aceptación:**
- Debe mostrar total de egresados registrados
- Debe mostrar cantidad y porcentaje de perfiles completados
- Debe mostrar cantidad y porcentaje de encuestas completadas
- Debe mostrar promedio de satisfacción general
- Las estadísticas deben actualizarse en tiempo real
- Debe ser accesible solo para usuarios con rol de líder o administrador

**Prioridad:** Alta  
**Módulo:** Dashboard de Coordinadores

---

### RF-06: Consulta de Egresados

**Descripción:** El sistema debe permitir a los coordinadores buscar, filtrar y visualizar información de los egresados.

**Criterios de Aceptación:**
- Debe mostrar tabla con lista de todos los egresados
- Debe incluir búsqueda en tiempo real por nombre, cédula o email
- Debe mostrar indicadores visuales de estado (perfil completo, encuesta completada)
- Debe permitir ordenar por diferentes columnas
- Debe incluir paginación si hay muchos registros
- Debe permitir ver detalle completo de cada egresado

**Prioridad:** Alta  
**Módulo:** Dashboard de Coordinadores

---

### RF-07: Exportación de Reportes

**Descripción:** El sistema debe permitir a los coordinadores exportar datos de egresados en formatos Excel y PDF.

**Criterios de Aceptación:**
- Debe incluir botón para exportar a Excel (.xlsx)
- Debe incluir botón para exportar a PDF (.pdf)
- El archivo Excel debe incluir todos los campos en formato tabla
- El archivo PDF debe incluir estadísticas generales y tabla de egresados
- Los archivos deben incluir la fecha en el nombre
- Debe respetar los filtros de búsqueda aplicados
- La descarga debe ser automática al hacer clic

**Prioridad:** Media  
**Módulo:** Dashboard de Coordinadores

---

### RF-08: Gestión de Roles de Usuario

**Descripción:** El sistema debe diferenciar entre tres tipos de usuarios: egresados, líderes/coordinadores y administradores.

**Criterios de Aceptación:**
- Los egresados solo pueden ver y editar su propia información
- Los líderes pueden ver información de todos los egresados (solo lectura)
- Los administradores pueden crear, editar y eliminar cualquier información
- El sistema debe validar permisos en cada operación
- Debe existir login separado para líderes/administradores

**Prioridad:** Alta  
**Módulo:** Autenticación y Autorización

---

### RF-09: Página de Inicio Informativa

**Descripción:** El sistema debe mostrar una página de inicio con información general de la plataforma, estadísticas y secciones destacadas.

**Criterios de Aceptación:**
- Debe mostrar hero section con mensaje de bienvenida
- Debe incluir estadísticas generales (total egresados, empresas, eventos)
- Debe mostrar secciones destacadas (networking, recursos, empleos)
- Debe incluir testimonios de egresados
- Debe ser accesible sin autenticación
- Debe incluir llamados a acción para registro/login

**Prioridad:** Media  
**Módulo:** Página Principal

---

### RF-10: Gestión de Eventos y Networking

**Descripción:** El sistema debe permitir a los egresados visualizar y registrarse a eventos académicos y profesionales.

**Criterios de Aceptación:**
- Debe mostrar lista de eventos disponibles (workshops, webinars, networking)
- Cada evento debe mostrar: título, descripción, fecha, hora, ubicación, modalidad
- Debe indicar si el evento es presencial o virtual
- Debe permitir filtrar eventos por tipo
- Debe incluir botón de registro/inscripción
- Solo egresados autenticados con perfil completo pueden registrarse

**Prioridad:** Media  
**Módulo:** Networking y Eventos

---

### RF-11: Gestión de Recursos Profesionales

**Descripción:** El sistema debe permitir a los egresados acceder y descargar recursos profesionales exclusivos.

**Criterios de Aceptación:**
- Debe mostrar catálogo de recursos (guías, ebooks, plantillas, documentos)
- Cada recurso debe mostrar: título, descripción, tipo, imagen, contador de descargas
- Debe permitir descargar recursos en formatos PDF, ZIP, etc.
- Debe incluir opción de vista previa cuando sea posible
- Solo egresados autenticados con perfil completo pueden descargar
- Debe registrar estadísticas de descargas

**Prioridad:** Media  
**Módulo:** Recursos Profesionales

---

### RF-12: Gestión de Ofertas Laborales

**Descripción:** El sistema debe permitir a los egresados visualizar ofertas laborales exclusivas.

**Criterios de Aceptación:**
- Debe mostrar lista de ofertas laborales disponibles
- Cada oferta debe mostrar: título, empresa, ubicación, tipo, salario, requisitos
- Debe permitir filtrar por tipo de empleo (tiempo completo, medio tiempo, remoto)
- Debe mostrar fecha de publicación
- Debe incluir botón para aplicar o ver más detalles
- Solo egresados autenticados con perfil completo pueden ver ofertas

**Prioridad:** Media  
**Módulo:** Bolsa de Empleo

---

### RF-13: Gestión de Encuestas Adicionales

**Descripción:** El sistema debe permitir a los egresados participar en encuestas institucionales adicionales.

**Criterios de Aceptación:**
- Debe mostrar lista de encuestas disponibles
- Cada encuesta debe mostrar: título, descripción, tiempo estimado, fecha límite
- Debe incluir botón para participar que redirija a formulario externo
- Debe indicar estado de participación (completada/pendiente)
- Solo egresados autenticados con perfil completo pueden participar

**Prioridad:** Baja  
**Módulo:** Encuestas Institucionales

---

### RF-14: Directorio de Egresados

**Descripción:** El sistema debe permitir a los egresados buscar y conectar con otros egresados del programa.

**Criterios de Aceptación:**
- Debe mostrar directorio con tarjetas de egresados
- Cada tarjeta debe mostrar: nombre, programa, año graduación, empresa actual, cargo
- Debe incluir búsqueda por nombre, programa, empresa
- Debe permitir filtrar por año de graduación, programa, ubicación
- Debe respetar configuración de privacidad de cada egresado
- Solo egresados autenticados con perfil completo pueden acceder

**Prioridad:** Baja  
**Módulo:** Directorio

---

### RF-15: Directorio de Empresas

**Descripción:** El sistema debe mostrar un directorio de empresas donde trabajan los egresados.

**Criterios de Aceptación:**
- Debe mostrar lista de empresas con tarjetas informativas
- Cada tarjeta debe mostrar: nombre empresa, sector, cantidad de egresados
- Debe incluir búsqueda por nombre de empresa
- Debe permitir filtrar por sector
- Debe mostrar egresados que trabajan en cada empresa
- Solo egresados autenticados con perfil completo pueden acceder

**Prioridad:** Baja  
**Módulo:** Directorio

---

## REQUISITOS NO FUNCIONALES

Los requisitos no funcionales definen las características de calidad del sistema. La norma principal utilizada es la **ISO/IEC 25010**.

**Referencia normativa:** ISO/IEC 25010 - Modelo de calidad del producto software  
**Fuente:** https://iso25000.com/index.php/normas-iso25000/iso-25010

---

### RNF-01: Usabilidad

**Característica ISO/IEC 25010:** Usabilidad - Capacidad del producto software para ser entendido, aprendido, usado y resultar atractivo para el usuario.

**Requisitos:**
- La interfaz debe ser intuitiva y no requerir capacitación previa
- Los formularios deben incluir ayudas contextuales y placeholders
- Los mensajes de error deben ser claros y orientar al usuario
- El sistema debe seguir convenciones estándar de diseño web
- Debe incluir indicadores visuales de progreso en procesos largos

**Métrica:** 
- 90% de usuarios deben poder completar el perfil sin ayuda externa
- Tiempo promedio para completar encuesta: máximo 10 minutos

---

### RNF-02: Eficiencia de Desempeño

**Característica ISO/IEC 25010:** Eficiencia de desempeño - Desempeño relativo a la cantidad de recursos utilizados bajo determinadas condiciones.

**Requisitos:**
- El tiempo de carga de cualquier página no debe exceder 3 segundos
- El sistema debe soportar al menos 50 usuarios concurrentes
- Las consultas a la base de datos deben optimizarse con índices
- Las imágenes y recursos deben estar optimizados

**Métrica:**
- Tiempo de respuesta promedio: < 2 segundos
- Uso de memoria del servidor: < 512 MB

---

### RNF-03: Compatibilidad

**Característica ISO/IEC 25010:** Compatibilidad - Capacidad de dos o más sistemas o componentes para intercambiar información y/o llevar a cabo sus funciones requeridas.

**Requisitos:**
- Debe funcionar en navegadores Chrome, Firefox, Edge y Safari (últimas 2 versiones)
- Debe ser responsive y adaptarse a dispositivos móviles, tablets y desktop
- Debe funcionar en sistemas operativos Windows, macOS, Linux, Android e iOS

**Métrica:**
- Compatibilidad con 95% de navegadores modernos
- Diseño responsive verificado en al menos 5 tamaños de pantalla

---

### RNF-04: Seguridad

**Característica ISO/IEC 25010:** Seguridad - Capacidad de protección de la información y los datos.

**Requisitos:**
- Las contraseñas deben almacenarse encriptadas
- Debe implementar protección contra inyección SQL (prepared statements)
- Debe validar datos tanto en cliente como en servidor
- Debe implementar HTTPS para comunicación segura
- Debe cumplir con la Ley de Protección de Datos Personales (Ley 1581 de 2012)

**Métrica:**
- 0 vulnerabilidades críticas en auditoría de seguridad
- 100% de consultas SQL usando prepared statements

---

### RNF-05: Fiabilidad

**Característica ISO/IEC 25010:** Fiabilidad - Capacidad de un sistema para desempeñar las funciones especificadas.

**Requisitos:**
- El sistema debe tener disponibilidad del 99% durante horario laboral
- Debe implementar manejo de errores para evitar pérdida de datos
- Debe realizar respaldos automáticos de la base de datos
- Debe recuperarse de errores sin pérdida de información del usuario

**Métrica:**
- Disponibilidad: 99% (máximo 7.2 horas de inactividad al mes)
- Tasa de errores: < 0.1% de transacciones

---

### RNF-06: Mantenibilidad

**Característica ISO/IEC 25010:** Mantenibilidad - Capacidad del producto software para ser modificado efectiva y eficientemente.

**Requisitos:**
- El código debe seguir estándares de programación (ESLint, Prettier)
- Debe incluir comentarios en funciones complejas
- Debe usar arquitectura modular y componentes reutilizables
- Debe incluir documentación técnica del sistema
- Debe usar control de versiones (Git)

**Métrica:**
- Cobertura de documentación: 80% de funciones documentadas
- Complejidad ciclomática: < 10 por función

---

### RNF-07: Portabilidad

**Característica ISO/IEC 25010:** Portabilidad - Capacidad del producto de ser transferido de forma efectiva y eficiente.

**Requisitos:**
- Debe usar tecnologías estándar y ampliamente soportadas
- La configuración debe estar centralizada en archivos .env
- Debe incluir scripts de instalación y despliegue
- La base de datos debe ser portable (MySQL estándar)

**Métrica:**
- Tiempo de instalación en nuevo servidor: < 2 horas
- Dependencias externas: mínimas y documentadas

---

## HISTORIAS DE USUARIO

Las historias de usuario describen las funcionalidades del sistema desde la perspectiva de los usuarios finales, siguiendo el formato estándar de desarrollo ágil.

---

### HU-001: Completar Encuesta de Satisfacción

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-001 |
| **Título** | Completar encuesta de satisfacción |
| **Descripción** | Como egresado quiero completar una encuesta de satisfacción sobre el programa académico para proporcionar retroalimentación a la universidad antes de acceder a la plataforma. |
| **Responsable** | Backend Dev / Frontend Dev |

**Criterios de aceptación:**

1. El egresado debe ingresar su número de cédula para iniciar la encuesta.
2. La encuesta incluye 7 preguntas con escala Likert (1-5 estrellas).
3. La encuesta incluye 2 preguntas abiertas de texto.
4. La encuesta incluye 1 pregunta de selección múltiple (Sí/No/Tal vez).
5. El sistema valida que todos los campos estén completos antes de enviar.
6. Cada egresado solo puede completar la encuesta una vez.
7. Los datos se almacenan en tabla separada en la base de datos.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-002: Iniciar Sesión en la Plataforma

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-002 |
| **Título** | Iniciar sesión en la plataforma |
| **Descripción** | Como egresado quiero iniciar sesión con mi cédula y contraseña para acceder a mi perfil y las funcionalidades de la plataforma. |
| **Responsable** | Backend Dev / Frontend Dev |

**Criterios de aceptación:**

1. El egresado puede iniciar sesión con cédula y contraseña.
2. El sistema verifica si completó la encuesta de satisfacción.
3. Si no completó la encuesta, muestra mensaje y redirige a completarla.
4. Si completó la encuesta, permite el acceso a la plataforma.
5. La sesión se mantiene activa aunque se cierre el navegador.
6. Muestra mensajes de error claros en caso de credenciales incorrectas.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-003: Registrar Nuevo Usuario

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-003 |
| **Título** | Registro de nuevos usuarios |
| **Descripción** | Como administrador quiero registrar nuevos usuarios del sistema (docentes, administrativos o estudiantes) para permitir su acceso y gestión en la plataforma. |
| **Responsable** | Backend Dev / Frontend Dev |

**Criterios de aceptación:**

1. El formulario permite ingresar todos los campos obligatorios.
2. Se puede seleccionar el tipo de usuario.
3. La información se almacena correctamente en la base de datos.
4. El sistema valida la duplicación de documentos o correos.
5. El usuario puede iniciar sesión luego de ser creado.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-004: Completar Perfil del Egresado (Paso 1: Datos Personales)

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-004 |
| **Título** | Completar datos personales |
| **Descripción** | Como egresado quiero ingresar mis datos personales y demográficos para mantener actualizada mi información en la plataforma. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. El formulario incluye campos: nombre, apellido, cédula, fecha de nacimiento, género, estado civil, dirección, ciudad, teléfono, email.
2. Valida formato de email y teléfono.
3. Muestra barra de progreso indicando paso 1 de 9.
4. Permite avanzar al siguiente paso solo si campos obligatorios están completos.
5. Los datos se guardan temporalmente para no perderlos.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-005: Completar Perfil del Egresado (Paso 2-9: Información Completa)

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-005 |
| **Título** | Completar información académica y profesional |
| **Descripción** | Como egresado quiero completar toda mi información académica, laboral y profesional mediante un formulario multi-paso para tener mi perfil completo en la plataforma. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. El formulario se divide en 9 pasos claramente identificados.
2. Incluye más de 60 campos organizados por categorías.
3. Muestra barra de progreso visual.
4. Valida campos obligatorios antes de avanzar.
5. Permite navegación hacia adelante y atrás entre pasos.
6. Los datos se guardan al finalizar todos los pasos.
7. Muestra confirmación visual al guardar exitosamente.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-006: Visualizar Perfil Completo

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-006 |
| **Título** | Visualizar perfil completo |
| **Descripción** | Como egresado quiero ver toda mi información registrada de manera organizada para verificar que esté correcta y actualizada. |
| **Responsable** | Frontend Dev |

**Criterios de aceptación:**

1. Muestra toda la información organizada por secciones.
2. Indica el porcentaje de completitud del perfil.
3. Es responsive (se adapta a diferentes dispositivos).
4. Permite editar la información desde la vista de perfil.
5. Muestra indicadores visuales de secciones completas/incompletas.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-007: Editar Información del Perfil

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-007 |
| **Título** | Editar información del perfil |
| **Descripción** | Como egresado quiero editar mi información personal, académica y laboral para mantenerla actualizada en el tiempo. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Puede acceder al formulario de edición desde el perfil.
2. Los campos se cargan con la información actual.
3. Puede modificar cualquier campo editable.
4. El sistema valida los datos antes de guardar.
5. Muestra confirmación al guardar cambios exitosamente.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-008: Iniciar Sesión como Líder/Coordinador

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-008 |
| **Título** | Iniciar sesión como líder/coordinador |
| **Descripción** | Como coordinador del programa quiero iniciar sesión con credenciales especiales para acceder al dashboard de gestión de egresados. |
| **Responsable** | Backend Dev / Frontend Dev |

**Criterios de aceptación:**

1. Existe una página de login separada para líderes.
2. El sistema valida credenciales de usuario tipo "líder".
3. Redirige al dashboard de coordinadores tras login exitoso.
4. Muestra mensajes de error claros si las credenciales son incorrectas.
5. La sesión se mantiene activa.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-009: Visualizar Dashboard de Estadísticas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-009 |
| **Título** | Visualizar dashboard de estadísticas |
| **Descripción** | Como coordinador quiero ver estadísticas generales sobre los egresados para evaluar el impacto del programa y tomar decisiones informadas. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra total de egresados registrados.
2. Muestra cantidad y porcentaje de perfiles completados.
3. Muestra cantidad y porcentaje de encuestas completadas.
4. Muestra promedio de satisfacción general.
5. Las estadísticas se actualizan en tiempo real.
6. Es accesible solo para usuarios con rol de líder o administrador.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-010: Consultar y Buscar Egresados

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-010 |
| **Título** | Consultar y buscar egresados |
| **Descripción** | Como coordinador quiero buscar y filtrar información de los egresados para encontrar datos específicos rápidamente. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra tabla con lista de todos los egresados.
2. Incluye búsqueda en tiempo real por nombre, cédula o email.
3. Muestra indicadores visuales de estado (perfil completo, encuesta completada).
4. Permite ordenar por diferentes columnas.
5. Incluye paginación si hay muchos registros.
6. Permite ver detalle completo de cada egresado.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-011: Ver Detalle de Egresado

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-011 |
| **Título** | Ver detalle completo de egresado |
| **Descripción** | Como coordinador quiero ver toda la información detallada de un egresado específico para conocer su trayectoria profesional y académica. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra toda la información del egresado organizada por secciones.
2. Incluye datos personales, académicos, laborales y de satisfacción.
3. Es de solo lectura (no permite editar).
4. Tiene diseño claro y profesional.
5. Permite regresar a la lista de egresados.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-012: Exportar Reportes a Excel y PDF

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-012 |
| **Título** | Exportar reportes a Excel y PDF |
| **Descripción** | Como coordinador quiero exportar datos de egresados en formatos Excel y PDF para generar reportes y presentaciones para procesos de acreditación. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Incluye botón para exportar a Excel (.xlsx).
2. Incluye botón para exportar a PDF (.pdf).
3. El archivo Excel incluye todos los campos en formato tabla.
4. El archivo PDF incluye estadísticas generales y tabla de egresados.
5. Los archivos incluyen la fecha en el nombre.
6. Respeta los filtros de búsqueda aplicados.
7. La descarga es automática al hacer clic.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-013: Ver Página de Inicio

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-013 |
| **Título** | Ver página de inicio informativa |
| **Descripción** | Como visitante quiero ver una página de inicio con información general de la plataforma para conocer los beneficios y funcionalidades disponibles. |
| **Responsable** | Frontend Dev |

**Criterios de aceptación:**

1. Muestra hero section con mensaje de bienvenida y logo de la universidad.
2. Incluye estadísticas generales (total egresados, empresas, eventos).
3. Muestra secciones destacadas (networking, recursos, empleos).
4. Incluye testimonios de egresados.
5. Es accesible sin autenticación.
6. Incluye botones de llamado a acción para registro/login.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-014: Consultar Eventos y Networking

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-014 |
| **Título** | Consultar eventos y networking |
| **Descripción** | Como egresado quiero ver eventos académicos y profesionales disponibles para participar y expandir mi red de contactos. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra lista de eventos disponibles (workshops, webinars, networking).
2. Cada evento muestra: título, descripción, fecha, hora, ubicación, modalidad.
3. Indica si el evento es presencial o virtual.
4. Permite filtrar eventos por tipo.
5. Incluye botón de registro/inscripción.
6. Solo egresados autenticados con perfil completo pueden registrarse.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-015: Descargar Recursos Profesionales

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-015 |
| **Título** | Descargar recursos profesionales |
| **Descripción** | Como egresado quiero acceder y descargar recursos profesionales exclusivos para apoyar mi desarrollo profesional. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra catálogo de recursos (guías, ebooks, plantillas, documentos).
2. Cada recurso muestra: título, descripción, tipo, imagen, contador de descargas.
3. Permite descargar recursos en formatos PDF, ZIP, etc.
4. Incluye opción de vista previa cuando sea posible.
5. Solo egresados autenticados con perfil completo pueden descargar.
6. Registra estadísticas de descargas.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-016: Ver Ofertas Laborales

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-016 |
| **Título** | Ver ofertas laborales |
| **Descripción** | Como egresado quiero visualizar ofertas laborales exclusivas para encontrar oportunidades de empleo acordes a mi perfil profesional. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra lista de ofertas laborales disponibles.
2. Cada oferta muestra: título, empresa, ubicación, tipo, salario, requisitos.
3. Permite filtrar por tipo de empleo (tiempo completo, medio tiempo, remoto).
4. Muestra fecha de publicación.
5. Incluye botón para aplicar o ver más detalles.
6. Solo egresados autenticados con perfil completo pueden ver ofertas.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-017: Participar en Encuestas Adicionales

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-017 |
| **Título** | Participar en encuestas adicionales |
| **Descripción** | Como egresado quiero participar en encuestas institucionales adicionales para proporcionar retroalimentación continua a la universidad. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra lista de encuestas disponibles.
2. Cada encuesta muestra: título, descripción, tiempo estimado, fecha límite.
3. Incluye botón para participar que redirija a formulario externo.
4. Indica estado de participación (completada/pendiente).
5. Solo egresados autenticados con perfil completo pueden participar.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-018: Buscar Egresados en Directorio

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-018 |
| **Título** | Buscar egresados en directorio |
| **Descripción** | Como egresado quiero buscar y conectar con otros egresados del programa para generar oportunidades de networking profesional. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra directorio con tarjetas de egresados.
2. Cada tarjeta muestra: nombre, programa, año graduación, empresa actual, cargo.
3. Incluye búsqueda por nombre, programa, empresa.
4. Permite filtrar por año de graduación, programa, ubicación.
5. Respeta configuración de privacidad de cada egresado.
6. Solo egresados autenticados con perfil completo pueden acceder.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### HU-019: Ver Directorio de Empresas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Código** | HU-019 |
| **Título** | Ver directorio de empresas |
| **Descripción** | Como egresado quiero ver un directorio de empresas donde trabajan otros egresados para identificar oportunidades laborales y conexiones profesionales. |
| **Responsable** | Frontend Dev / Backend Dev |

**Criterios de aceptación:**

1. Muestra lista de empresas con tarjetas informativas.
2. Cada tarjeta muestra: nombre empresa, sector, cantidad de egresados.
3. Incluye búsqueda por nombre de empresa.
4. Permite filtrar por sector.
5. Muestra egresados que trabajan en cada empresa.
6. Solo egresados autenticados con perfil completo pueden acceder.

**Estimación:** Se realizará mediante Story Points en la plantilla de estimación del proyecto.

---

### Resumen de Historias de Usuario

| ID | Descripción | Módulo |
|----|-------------|--------|
| HU-001 | Completar encuesta de satisfacción | Encuestas |
| HU-002 | Iniciar sesión en la plataforma | Autenticación |
| HU-003 | Registro de nuevos usuarios | Autenticación |
| HU-004 | Completar datos personales | Perfil |
| HU-005 | Completar perfil completo | Perfil |
| HU-006 | Visualizar perfil completo | Perfil |
| HU-007 | Editar información del perfil | Perfil |
| HU-008 | Iniciar sesión como líder/coordinador | Dashboard |
| HU-009 | Visualizar dashboard de estadísticas | Dashboard |
| HU-010 | Consultar y buscar egresados | Dashboard |
| HU-011 | Ver detalle de egresado | Dashboard |
| HU-012 | Exportar reportes a Excel y PDF | Dashboard |
| HU-013 | Ver página de inicio | Página Principal |
| HU-014 | Consultar eventos y networking | Networking |
| HU-015 | Descargar recursos profesionales | Recursos |
| HU-016 | Ver ofertas laborales | Empleos |
| HU-017 | Participar en encuestas adicionales | Encuestas |
| HU-018 | Buscar egresados en directorio | Directorio |
| HU-019 | Ver directorio de empresas | Directorio |
| **TOTAL** | **19 Historias de Usuario** | |

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026  
**Universidad Mariana - Especialización en Sistemas Integrados de Gestión**
