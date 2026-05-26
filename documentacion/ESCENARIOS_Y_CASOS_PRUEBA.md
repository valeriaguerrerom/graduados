# ESCENARIOS Y CASOS DE PRUEBA
## Plataforma Web de Seguimiento a Egresados - Universidad Mariana

---

## TABLA DE CONTENIDO

1. [Escenarios de Prueba](#escenarios-de-prueba)
2. [Casos de Prueba](#casos-de-prueba)

---

## ESCENARIOS DE PRUEBA

### HU-001: Completar Encuesta de Satisfacción

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-001 | E01 | Validar ingreso de cédula para iniciar encuesta | Cédula: "1234567890" | 1 |
| HU-001 | E02 | Validar que todas las preguntas estén respondidas | 7 preguntas Likert: [4,5,3,4,5,4,5], 2 preguntas abiertas: ["Excelente programa", "Mejorar infraestructura"], Pregunta múltiple: "Sí" | 2 |
| HU-001 | E03 | Validar envío de encuesta completa | Encuesta completa con todos los campos llenos | 3 |
| HU-001 | E04 | Validar que no se pueda enviar encuesta incompleta | 5 preguntas respondidas de 10 | 5 |
| HU-001 | E05 | Validar que cada egresado solo pueda completar la encuesta una vez | Cédula: "1234567890" ya tiene encuesta registrada | 6 |

---

### HU-002: Iniciar Sesión en la Plataforma

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-002 | E01 | Validar inicio de sesión con credenciales correctas | Cédula: "1234567890", Password: "password123" | 1 |
| HU-002 | E02 | Validar inicio de sesión con credenciales incorrectas | Cédula: "1234567890", Password: "incorrecta" | 6 |
| HU-002 | E03 | Validar verificación de encuesta completada | Cédula: "1234567890", ha_completado_encuesta: true | 2 |
| HU-002 | E04 | Validar redirección si no completó encuesta | Cédula: "1234567890", ha_completado_encuesta: false | 3 |
| HU-002 | E05 | Validar persistencia de sesión | Usuario autenticado, cierra navegador y vuelve a abrir | 5 |

---

### HU-003: Registrar Nuevo Usuario

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-003 | E01 | Validar registro con todos los campos obligatorios | Cédula: "9876543210", Nombre: "María", Apellido: "García", Email: "maria@example.com", Tipo: "egresado" | 1 |
| HU-003 | E02 | Validar selección de tipo de usuario | Tipo: "egresado", "líder", "administrador" | 2 |
| HU-003 | E03 | Validar almacenamiento en base de datos | Usuario con datos completos | 3 |
| HU-003 | E04 | Validar duplicación de cédula | Cédula: "1234567890" (ya existe en BD) | 4 |
| HU-003 | E05 | Validar que usuario pueda iniciar sesión después de creado | Cédula: "9876543210", Password: "password123" | 5 |

---

### HU-004: Completar Datos Personales (Paso 1)

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-004 | E01 | Validar campos obligatorios del paso 1 | Nombre: "Juan", Apellido: "Pérez", Cédula: "1234567890", Fecha nacimiento: "1990-05-15", Email: "juan@example.com", Teléfono: "3001234567" | 1 |
| HU-004 | E02 | Validar formato de email | Email: "juan@example.com" (válido), "juanexample" (inválido) | 2 |
| HU-004 | E03 | Validar formato de teléfono | Teléfono: "3001234567" (válido), "123" (inválido) | 2 |
| HU-004 | E04 | Validar barra de progreso paso 1 de 9 | Paso actual: 1, Total pasos: 9 | 3 |
| HU-004 | E05 | Validar que no permita avanzar sin campos obligatorios | Nombre: "", Apellido: "Pérez" | 4 |

---

### HU-005: Completar Perfil Completo (Pasos 2-9)

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-005 | E01 | Validar división en 9 pasos | Pasos: [1,2,3,4,5,6,7,8,9] | 1 |
| HU-005 | E02 | Validar más de 60 campos organizados | Total campos: 65 campos distribuidos en 9 pasos | 2 |
| HU-005 | E03 | Validar barra de progreso visual | Paso 5 de 9 = 55% completado | 3 |
| HU-005 | E04 | Validar campos obligatorios antes de avanzar | Paso 3: condicion_laboral: "" (vacío) | 4 |
| HU-005 | E05 | Validar navegación hacia adelante y atrás | Usuario en paso 5, puede ir a paso 4 o paso 6 | 5 |
| HU-005 | E06 | Validar guardado al finalizar todos los pasos | Paso 9 completado, presiona "Finalizar" | 6 |
| HU-005 | E07 | Validar confirmación visual al guardar | Mensaje: "Perfil completado exitosamente" | 7 |

---

### HU-006: Visualizar Perfil Completo

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-006 | E01 | Validar visualización de información por secciones | Secciones: Datos personales, Académicos, Laborales, etc. | 1 |
| HU-006 | E02 | Validar indicador de completitud del perfil | Campos completados: 50/65 = 77% | 2 |
| HU-006 | E03 | Validar diseño responsive en móvil | Pantalla: 375px de ancho | 3 |
| HU-006 | E04 | Validar diseño responsive en tablet | Pantalla: 768px de ancho | 3 |
| HU-006 | E05 | Validar opción de editar desde vista de perfil | Botón "Editar" visible en cada sección | 4 |

---

### HU-007: Editar Información del Perfil

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-007 | E01 | Validar acceso al formulario de edición | Usuario hace clic en "Editar perfil" | 1 |
| HU-007 | E02 | Validar carga de información actual | Email actual: "juan@example.com" se muestra en el campo | 2 |
| HU-007 | E03 | Validar modificación de campos | Email nuevo: "juan.perez@example.com" | 3 |
| HU-007 | E04 | Validar validación de datos antes de guardar | Email: "juanexample" (formato inválido) | 4 |
| HU-007 | E05 | Validar confirmación al guardar cambios | Mensaje: "Cambios guardados exitosamente" | 5 |

---

### HU-008: Iniciar Sesión como Líder/Coordinador

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-008 | E01 | Validar página de login separada para líderes | URL: "/leader/login" | 1 |
| HU-008 | E02 | Validar credenciales de usuario tipo líder | Usuario: "lider01", Password: "lider123", Rol: "líder" | 2 |
| HU-008 | E03 | Validar redirección al dashboard tras login exitoso | Redirige a: "/leader/dashboard" | 3 |
| HU-008 | E04 | Validar mensaje de error con credenciales incorrectas | Usuario: "lider01", Password: "incorrecta" | 4 |
| HU-008 | E05 | Validar persistencia de sesión | Sesión activa después de cerrar navegador | 5 |

---

### HU-009: Visualizar Dashboard de Estadísticas

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-009 | E01 | Validar total de egresados registrados | Total: 65 egresados | 1 |
| HU-009 | E02 | Validar cantidad y porcentaje de perfiles completados | Completados: 45/65 = 69% | 2 |
| HU-009 | E03 | Validar cantidad y porcentaje de encuestas completadas | Completadas: 60/65 = 92% | 3 |
| HU-009 | E04 | Validar promedio de satisfacción general | Promedio: 4.2/5 | 4 |
| HU-009 | E05 | Validar actualización en tiempo real | Nuevo egresado completa perfil, contador actualiza automáticamente | 5 |
| HU-009 | E06 | Validar acceso solo para rol líder o administrador | Usuario rol "egresado" intenta acceder | 6 |

---

### HU-010: Consultar y Buscar Egresados

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-010 | E01 | Validar tabla con lista de todos los egresados | Total registros: 65 egresados | 1 |
| HU-010 | E02 | Validar búsqueda en tiempo real por nombre | Búsqueda: "Juan" → Resultados: 5 egresados | 2 |
| HU-010 | E03 | Validar búsqueda por cédula | Búsqueda: "1234567890" → Resultado: 1 egresado | 2 |
| HU-010 | E04 | Validar indicadores visuales de estado | Perfil completo: badge verde, Encuesta: badge azul | 3 |
| HU-010 | E05 | Validar ordenamiento por columnas | Ordenar por "Año graduación" ascendente/descendente | 4 |
| HU-010 | E06 | Validar paginación con muchos registros | 65 registros, 10 por página = 7 páginas | 5 |

---

### HU-011: Ver Detalle de Egresado

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-011 | E01 | Validar visualización de información completa | Cédula: "1234567890", muestra todas las secciones | 1 |
| HU-011 | E02 | Validar inclusión de datos personales, académicos y laborales | Secciones: Personal, Académica, Laboral, Satisfacción | 2 |
| HU-011 | E03 | Validar que sea solo lectura | No hay botones de edición visibles | 3 |
| HU-011 | E04 | Validar diseño claro y profesional | Layout organizado, tipografía legible | 4 |
| HU-011 | E05 | Validar botón para regresar a lista | Botón "Volver" redirige a "/leader/dashboard" | 5 |

---

### HU-012: Exportar Reportes a Excel y PDF

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-012 | E01 | Validar botón exportar a Excel | Botón "Exportar Excel" visible y funcional | 1 |
| HU-012 | E02 | Validar botón exportar a PDF | Botón "Exportar PDF" visible y funcional | 2 |
| HU-012 | E03 | Validar contenido de archivo Excel | Archivo .xlsx con todos los campos en tabla | 3 |
| HU-012 | E04 | Validar contenido de archivo PDF | Archivo .pdf con estadísticas y tabla de egresados | 4 |
| HU-012 | E05 | Validar nombre de archivo con fecha | Nombre: "Egresados_ESIG_2026-03-19.xlsx" | 5 |
| HU-012 | E06 | Validar respeto de filtros de búsqueda | Búsqueda: "2025", exporta solo egresados de 2025 | 6 |
| HU-012 | E07 | Validar descarga automática | Archivo se descarga sin intervención adicional | 7 |

---

### HU-013: Ver Página de Inicio

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-013 | E01 | Validar hero section con mensaje de bienvenida | Título: "Bienvenido a la Red de Egresados ESIG" | 1 |
| HU-013 | E02 | Validar estadísticas generales | Total egresados: 65, Empresas: 45, Eventos: 12 | 2 |
| HU-013 | E03 | Validar secciones destacadas | Secciones: Networking, Recursos, Empleos | 3 |
| HU-013 | E04 | Validar testimonios de egresados | Mínimo 3 testimonios visibles | 4 |
| HU-013 | E05 | Validar acceso sin autenticación | Usuario no autenticado puede ver la página | 5 |
| HU-013 | E06 | Validar botones de llamado a acción | Botones: "Registrarse", "Iniciar sesión" | 6 |

---

### HU-014: Consultar Eventos y Networking

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-014 | E01 | Validar lista de eventos disponibles | Total eventos: 8 (3 workshops, 3 webinars, 2 networking) | 1 |
| HU-014 | E02 | Validar información de cada evento | Evento: título, descripción, fecha, hora, ubicación, modalidad | 2 |
| HU-014 | E03 | Validar indicador de modalidad | Evento presencial: icono ubicación, Virtual: icono video | 3 |
| HU-014 | E04 | Validar filtro por tipo de evento | Filtro: "Webinar" → Muestra solo 3 webinars | 4 |
| HU-014 | E05 | Validar botón de registro | Botón "Registrarse" visible en cada evento | 5 |
| HU-014 | E06 | Validar restricción de acceso | Usuario sin perfil completo no puede registrarse | 6 |

---

### HU-015: Descargar Recursos Profesionales

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-015 | E01 | Validar catálogo de recursos | Total recursos: 15 (5 guías, 5 ebooks, 5 plantillas) | 1 |
| HU-015 | E02 | Validar información de cada recurso | Recurso: título, descripción, tipo, imagen, descargas: 1250 | 2 |
| HU-015 | E03 | Validar descarga en formatos PDF y ZIP | Recurso 1: .pdf, Recurso 2: .zip | 3 |
| HU-015 | E04 | Validar vista previa cuando sea posible | Recurso PDF: botón "Vista previa" disponible | 4 |
| HU-015 | E05 | Validar restricción de acceso | Usuario sin perfil completo no puede descargar | 5 |
| HU-015 | E06 | Validar registro de estadísticas | Descarga incrementa contador de descargas | 6 |

---

### HU-016: Ver Ofertas Laborales

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-016 | E01 | Validar lista de ofertas laborales | Total ofertas: 10 ofertas activas | 1 |
| HU-016 | E02 | Validar información de cada oferta | Oferta: título, empresa, ubicación, tipo, salario, requisitos | 2 |
| HU-016 | E03 | Validar filtro por tipo de empleo | Filtro: "Tiempo completo" → Muestra 6 ofertas | 3 |
| HU-016 | E04 | Validar fecha de publicación | Oferta publicada: "Hace 3 días" | 4 |
| HU-016 | E05 | Validar botón para aplicar | Botón "Aplicar" redirige a formulario externo | 5 |
| HU-016 | E06 | Validar restricción de acceso | Usuario sin perfil completo no puede ver ofertas | 6 |

---

### HU-017: Participar en Encuestas Adicionales

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-017 | E01 | Validar lista de encuestas disponibles | Total encuestas: 3 encuestas activas | 1 |
| HU-017 | E02 | Validar información de cada encuesta | Encuesta: título, descripción, tiempo: "10 min", fecha límite: "30/04/2026" | 2 |
| HU-017 | E03 | Validar botón participar | Botón "Participar" redirige a formulario externo | 3 |
| HU-017 | E04 | Validar indicador de estado | Encuesta completada: badge "Completada", Pendiente: badge "Pendiente" | 4 |
| HU-017 | E05 | Validar restricción de acceso | Usuario sin perfil completo no puede participar | 5 |

---

### HU-018: Buscar Egresados en Directorio

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-018 | E01 | Validar directorio con tarjetas de egresados | Total tarjetas: 45 egresados visibles | 1 |
| HU-018 | E02 | Validar información en cada tarjeta | Tarjeta: nombre, programa, año: "2025", empresa, cargo | 2 |
| HU-018 | E03 | Validar búsqueda por nombre | Búsqueda: "María" → Resultados: 8 egresados | 3 |
| HU-018 | E04 | Validar filtro por año de graduación | Filtro: "2025" → Muestra 30 egresados | 4 |
| HU-018 | E05 | Validar respeto de privacidad | Egresado con perfil privado no aparece en directorio | 5 |
| HU-018 | E06 | Validar restricción de acceso | Usuario sin perfil completo no puede acceder | 6 |

---

### HU-019: Ver Directorio de Empresas

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-019 | E01 | Validar lista de empresas | Total empresas: 35 empresas | 1 |
| HU-019 | E02 | Validar información en cada tarjeta | Empresa: nombre, sector, cantidad egresados: 5 | 2 |
| HU-019 | E03 | Validar búsqueda por nombre de empresa | Búsqueda: "TechCorp" → Resultado: 1 empresa | 3 |
| HU-019 | E04 | Validar filtro por sector | Filtro: "Tecnología" → Muestra 12 empresas | 4 |
| HU-019 | E05 | Validar visualización de egresados por empresa | Empresa "TechCorp": muestra 5 egresados que trabajan allí | 5 |
| HU-019 | E06 | Validar restricción de acceso | Usuario sin perfil completo no puede acceder | 6 |

---

## CASOS DE PRUEBA

### HU-001: Completar Encuesta de Satisfacción

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-001 | testIngresarCedulaExitoso | EncuestaService | iniciarEncuesta | HU-001 | E01 | cedula: "1234567890" | Formulario de encuesta habilitado |
| CP-002 | testValidarPreguntasCompletas | EncuestaService | validarEncuesta | HU-001 | E02 | preguntas: [4,5,3,4,5,4,5], abiertas: ["texto1", "texto2"], multiple: "Sí" | Botón enviar habilitado |
| CP-003 | testEnviarEncuestaExitoso | EncuestaService | guardarEncuesta | HU-001 | E03 | encuestaDTO con todos los campos | Encuesta guardada, mensaje de confirmación |
| CP-004 | testEncuestaIncompleta | EncuestaService | validarEncuesta | HU-001 | E04 | preguntas: [4,5,3,null,null,4,5] | Error: "Complete todas las preguntas" |
| CP-005 | testEncuestaDuplicada | EncuestaService | verificarEncuesta | HU-001 | E05 | cedula: "1234567890" (ya existe) | Error: "Ya completó la encuesta" |

---

### HU-002: Iniciar Sesión en la Plataforma

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-006 | testLoginExitoso | AuthService | login | HU-002 | E01 | cedula: "1234567890", password: "password123" | Token JWT generado, acceso permitido |
| CP-007 | testLoginCredencialesIncorrectas | AuthService | login | HU-002 | E02 | cedula: "1234567890", password: "incorrecta" | Error: "Credenciales incorrectas" |
| CP-008 | testVerificarEncuestaCompletada | AuthService | verificarEncuesta | HU-002 | E03 | cedula: "1234567890", ha_completado_encuesta: true | Acceso a plataforma permitido |
| CP-009 | testRedirigirSinEncuesta | AuthService | verificarEncuesta | HU-002 | E04 | cedula: "1234567890", ha_completado_encuesta: false | Redirige a /satisfaction-survey |
| CP-010 | testPersistenciaSesion | AuthService | validarToken | HU-002 | E05 | token: "valid_jwt_token" | Sesión válida, usuario autenticado |

---

### HU-003: Registrar Nuevo Usuario

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-011 | testRegistroUsuarioExitoso | UsuarioService | crearUsuario | HU-003 | E01 | usuarioDTO: {cedula: "9876543210", nombre: "María", apellido: "García", email: "maria@example.com", tipo: "egresado"} | Usuario creado correctamente |
| CP-012 | testSeleccionTipoUsuario | UsuarioService | asignarRol | HU-003 | E02 | tipo: "líder" | Rol asignado correctamente |
| CP-013 | testAlmacenamientoBaseDatos | UsuarioRepository | save | HU-003 | E03 | usuarioEntity con datos completos | Usuario guardado en BD |
| CP-014 | testValidarCedulaDuplicada | UsuarioService | validarCedula | HU-003 | E04 | cedula: "1234567890" (existe) | Error: "Cédula ya registrada" |
| CP-015 | testLoginDespuesRegistro | AuthService | login | HU-003 | E05 | cedula: "9876543210", password: "password123" | Login exitoso |

---

### HU-004: Completar Datos Personales (Paso 1)

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-016 | testCamposObligatoriosPaso1 | PerfilService | validarPaso1 | HU-004 | E01 | datosPersonalesDTO con todos los campos | Validación exitosa |
| CP-017 | testValidarFormatoEmail | PerfilService | validarEmail | HU-004 | E02 | email: "juan@example.com" | Email válido |
| CP-018 | testValidarFormatoEmailInvalido | PerfilService | validarEmail | HU-004 | E02 | email: "juanexample" | Error: "Formato de email inválido" |
| CP-019 | testValidarFormatoTelefono | PerfilService | validarTelefono | HU-004 | E03 | telefono: "3001234567" | Teléfono válido |
| CP-020 | testBarraProgresoPaso1 | PerfilService | calcularProgreso | HU-004 | E04 | pasoActual: 1, totalPasos: 9 | Progreso: 11% |
| CP-021 | testAvanzarSinCamposObligatorios | PerfilService | validarPaso1 | HU-004 | E05 | nombre: "", apellido: "Pérez" | Error: "Complete campos obligatorios" |

---

### HU-005: Completar Perfil Completo (Pasos 2-9)

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-022 | testDivisionEnNuevePasos | PerfilService | obtenerPasos | HU-005 | E01 | - | Array con 9 pasos |
| CP-023 | testValidarCantidadCampos | PerfilService | contarCampos | HU-005 | E02 | - | Total: 65 campos |
| CP-024 | testBarraProgresoVisual | PerfilService | calcularProgreso | HU-005 | E03 | pasoActual: 5, totalPasos: 9 | Progreso: 55% |
| CP-025 | testValidarCamposObligatorios | PerfilService | validarPaso | HU-005 | E04 | paso: 3, condicion_laboral: "" | Error: "Campo obligatorio" |
| CP-026 | testNavegacionAdelante | PerfilService | avanzarPaso | HU-005 | E05 | pasoActual: 5 | Navega a paso 6 |
| CP-027 | testNavegacionAtras | PerfilService | retrocederPaso | HU-005 | E05 | pasoActual: 5 | Navega a paso 4 |
| CP-028 | testGuardarPerfilCompleto | PerfilService | guardarPerfil | HU-005 | E06 | perfilDTO con 65 campos completos | Perfil guardado, has_completed_profile: true |
| CP-029 | testConfirmacionVisual | PerfilService | mostrarConfirmacion | HU-005 | E07 | - | Mensaje: "Perfil completado exitosamente" |

---

### HU-006: Visualizar Perfil Completo

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-030 | testVisualizarPorSecciones | PerfilService | obtenerPerfil | HU-006 | E01 | cedula: "1234567890" | Perfil con secciones organizadas |
| CP-031 | testIndicadorCompletitud | PerfilService | calcularCompletitud | HU-006 | E02 | camposCompletos: 50, totalCampos: 65 | Completitud: 77% |
| CP-032 | testResponsiveMovil | PerfilComponent | render | HU-006 | E03 | screenWidth: 375 | Layout adaptado a móvil |
| CP-033 | testResponsiveTablet | PerfilComponent | render | HU-006 | E04 | screenWidth: 768 | Layout adaptado a tablet |
| CP-034 | testOpcionEditar | PerfilComponent | mostrarBotonEditar | HU-006 | E05 | - | Botón "Editar" visible |

---

### HU-007: Editar Información del Perfil

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-035 | testAccesoFormularioEdicion | PerfilService | cargarFormularioEdicion | HU-007 | E01 | cedula: "1234567890" | Formulario de edición cargado |
| CP-036 | testCargarInformacionActual | PerfilService | obtenerPerfil | HU-007 | E02 | cedula: "1234567890" | Campos pre-llenados con datos actuales |
| CP-037 | testModificarCampos | PerfilService | actualizarPerfil | HU-007 | E03 | email: "juan.perez@example.com" | Campo actualizado |
| CP-038 | testValidarDatosAntesGuardar | PerfilService | validarDatos | HU-007 | E04 | email: "juanexample" | Error: "Formato inválido" |
| CP-039 | testConfirmacionGuardarCambios | PerfilService | guardarCambios | HU-007 | E05 | perfilDTO actualizado | Mensaje: "Cambios guardados exitosamente" |

---

### HU-008: Iniciar Sesión como Líder/Coordinador

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-040 | testPaginaLoginSeparada | AuthController | renderLeaderLogin | HU-008 | E01 | url: "/leader/login" | Página de login de líder renderizada |
| CP-041 | testValidarCredencialesLider | AuthService | loginLider | HU-008 | E02 | usuario: "lider01", password: "lider123", rol: "líder" | Token JWT generado |
| CP-042 | testRedireccionDashboard | AuthController | redirect | HU-008 | E03 | loginExitoso: true | Redirige a "/leader/dashboard" |
| CP-043 | testMensajeErrorCredenciales | AuthService | loginLider | HU-008 | E04 | usuario: "lider01", password: "incorrecta" | Error: "Credenciales incorrectas" |
| CP-044 | testPersistenciaSesionLider | AuthService | validarToken | HU-008 | E05 | token: "valid_jwt_token" | Sesión válida |

---

### HU-009: Visualizar Dashboard de Estadísticas

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-045 | testTotalEgresadosRegistrados | DashboardService | contarEgresados | HU-009 | E01 | - | Total: 65 |
| CP-046 | testPerfilesCompletados | DashboardService | contarPerfilesCompletos | HU-009 | E02 | - | Completados: 45, Porcentaje: 69% |
| CP-047 | testEncuestasCompletadas | DashboardService | contarEncuestas | HU-009 | E03 | - | Completadas: 60, Porcentaje: 92% |
| CP-048 | testPromedioSatisfaccion | DashboardService | calcularPromedioSatisfaccion | HU-009 | E04 | - | Promedio: 4.2/5 |
| CP-049 | testActualizacionTiempoReal | DashboardService | actualizarEstadisticas | HU-009 | E05 | nuevoPerfilCompleto: true | Contador actualizado automáticamente |
| CP-050 | testAccesoSoloLider | DashboardController | verificarRol | HU-009 | E06 | rol: "egresado" | Error: "Acceso denegado" |

---

### HU-010: Consultar y Buscar Egresados

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-051 | testListarTodosEgresados | EgresadoService | listarEgresados | HU-010 | E01 | - | Array con 65 egresados |
| CP-052 | testBusquedaPorNombre | EgresadoService | buscarPorNombre | HU-010 | E02 | nombre: "Juan" | Array con 5 egresados |
| CP-053 | testBusquedaPorCedula | EgresadoService | buscarPorCedula | HU-010 | E03 | cedula: "1234567890" | 1 egresado encontrado |
| CP-054 | testIndicadoresVisuales | EgresadoComponent | renderEstado | HU-010 | E04 | has_completed_profile: true | Badge verde "Completo" |
| CP-055 | testOrdenamientoPorColumna | EgresadoService | ordenarPor | HU-010 | E05 | columna: "año_graduacion", orden: "asc" | Lista ordenada ascendente |
| CP-056 | testPaginacion | EgresadoService | paginar | HU-010 | E06 | total: 65, porPagina: 10 | 7 páginas |

---

### HU-011: Ver Detalle de Egresado

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-057 | testVisualizarInformacionCompleta | EgresadoService | obtenerDetalle | HU-011 | E01 | cedula: "1234567890" | Objeto con todas las secciones |
| CP-058 | testIncluirDatosCompletos | EgresadoService | obtenerDetalle | HU-011 | E02 | cedula: "1234567890" | Datos: personal, académico, laboral, satisfacción |
| CP-059 | testSoloLectura | EgresadoComponent | renderDetalle | HU-011 | E03 | modo: "lectura" | Sin botones de edición |
| CP-060 | testDiseñoProfesional | EgresadoComponent | render | HU-011 | E04 | - | Layout organizado y legible |
| CP-061 | testBotonVolver | EgresadoComponent | handleVolver | HU-011 | E05 | - | Redirige a "/leader/dashboard" |

---

### HU-012: Exportar Reportes a Excel y PDF

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-062 | testExportarExcel | ReporteService | exportarExcel | HU-012 | E01 | egresados: Array(65) | Archivo .xlsx generado |
| CP-063 | testExportarPDF | ReporteService | exportarPDF | HU-012 | E02 | egresados: Array(65), estadisticas: Object | Archivo .pdf generado |
| CP-064 | testContenidoExcel | ReporteService | generarExcel | HU-012 | E03 | egresados: Array(65) | Excel con todos los campos en tabla |
| CP-065 | testContenidoPDF | ReporteService | generarPDF | HU-012 | E04 | egresados: Array(65), estadisticas: Object | PDF con estadísticas y tabla |
| CP-066 | testNombreArchivoConFecha | ReporteService | generarNombre | HU-012 | E05 | fecha: "2026-03-19" | Nombre: "Egresados_ESIG_2026-03-19.xlsx" |
| CP-067 | testRespetarFiltros | ReporteService | exportarExcel | HU-012 | E06 | filtro: {año: "2025"} | Excel solo con egresados de 2025 |
| CP-068 | testDescargaAutomatica | ReporteController | descargar | HU-012 | E07 | archivo: "reporte.xlsx" | Descarga automática iniciada |

---

### HU-013: Ver Página de Inicio

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-069 | testHeroSection | HomeComponent | renderHero | HU-013 | E01 | - | Hero con título "Bienvenido a la Red de Egresados ESIG" |
| CP-070 | testEstadisticasGenerales | HomeService | obtenerEstadisticas | HU-013 | E02 | - | Estadísticas: {egresados: 65, empresas: 45, eventos: 12} |
| CP-071 | testSeccionesDestacadas | HomeComponent | renderSecciones | HU-013 | E03 | - | Secciones: Networking, Recursos, Empleos |
| CP-072 | testTestimonios | HomeService | obtenerTestimonios | HU-013 | E04 | - | Mínimo 3 testimonios |
| CP-073 | testAccesoSinAutenticacion | HomeController | verificarAcceso | HU-013 | E05 | usuario: null | Acceso permitido |
| CP-074 | testBotonesLlamadoAccion | HomeComponent | renderCTA | HU-013 | E06 | - | Botones: "Registrarse", "Iniciar sesión" |

---

### HU-014: Consultar Eventos y Networking

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-075 | testListarEventos | EventoService | listarEventos | HU-014 | E01 | - | Array con 8 eventos |
| CP-076 | testInformacionEvento | EventoService | obtenerEvento | HU-014 | E02 | id: 1 | Evento con título, descripción, fecha, hora, ubicación, modalidad |
| CP-077 | testIndicadorModalidad | EventoComponent | renderModalidad | HU-014 | E03 | modalidad: "presencial" | Icono de ubicación |
| CP-078 | testFiltrarPorTipo | EventoService | filtrarPorTipo | HU-014 | E04 | tipo: "Webinar" | Array con 3 webinars |
| CP-079 | testBotonRegistro | EventoComponent | renderBotonRegistro | HU-014 | E05 | - | Botón "Registrarse" visible |
| CP-080 | testRestriccionAcceso | EventoService | verificarAcceso | HU-014 | E06 | has_completed_profile: false | Error: "Complete su perfil" |

---

### HU-015: Descargar Recursos Profesionales

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-081 | testCatalogoRecursos | RecursoService | listarRecursos | HU-015 | E01 | - | Array con 15 recursos |
| CP-082 | testInformacionRecurso | RecursoService | obtenerRecurso | HU-015 | E02 | id: 1 | Recurso con título, descripción, tipo, imagen, descargas: 1250 |
| CP-083 | testDescargarPDF | RecursoService | descargar | HU-015 | E03 | id: 1, formato: "pdf" | Archivo .pdf descargado |
| CP-084 | testVistaPrevia | RecursoService | generarVistaPrevia | HU-015 | E04 | id: 1, tipo: "pdf" | Vista previa generada |
| CP-085 | testRestriccionAcceso | RecursoService | verificarAcceso | HU-015 | E05 | has_completed_profile: false | Error: "Complete su perfil" |
| CP-086 | testRegistrarEstadistica | RecursoService | incrementarDescargas | HU-015 | E06 | id: 1 | Contador descargas: 1251 |

---

### HU-016: Ver Ofertas Laborales

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-087 | testListarOfertas | OfertaService | listarOfertas | HU-016 | E01 | - | Array con 10 ofertas |
| CP-088 | testInformacionOferta | OfertaService | obtenerOferta | HU-016 | E02 | id: 1 | Oferta con título, empresa, ubicación, tipo, salario, requisitos |
| CP-089 | testFiltrarPorTipo | OfertaService | filtrarPorTipo | HU-016 | E03 | tipo: "Tiempo completo" | Array con 6 ofertas |
| CP-090 | testFechaPublicacion | OfertaService | calcularTiempo | HU-016 | E04 | fechaPublicacion: "2026-03-16" | "Hace 3 días" |
| CP-091 | testBotonAplicar | OfertaComponent | renderBotonAplicar | HU-016 | E05 | - | Botón "Aplicar" redirige a URL externa |
| CP-092 | testRestriccionAcceso | OfertaService | verificarAcceso | HU-016 | E06 | has_completed_profile: false | Error: "Complete su perfil" |

---

### HU-017: Participar en Encuestas Adicionales

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-093 | testListarEncuestas | EncuestaAdicionalService | listarEncuestas | HU-017 | E01 | - | Array con 3 encuestas |
| CP-094 | testInformacionEncuesta | EncuestaAdicionalService | obtenerEncuesta | HU-017 | E02 | id: 1 | Encuesta con título, descripción, tiempo: "10 min", fecha límite |
| CP-095 | testBotonParticipar | EncuestaComponent | renderBotonParticipar | HU-017 | E03 | - | Botón "Participar" redirige a URL externa |
| CP-096 | testIndicadorEstado | EncuestaComponent | renderEstado | HU-017 | E04 | completada: true | Badge "Completada" |
| CP-097 | testRestriccionAcceso | EncuestaAdicionalService | verificarAcceso | HU-017 | E05 | has_completed_profile: false | Error: "Complete su perfil" |

---

### HU-018: Buscar Egresados en Directorio

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-098 | testDirectorioEgresados | DirectorioService | listarEgresados | HU-018 | E01 | - | Array con 45 egresados visibles |
| CP-099 | testInformacionTarjeta | DirectorioComponent | renderTarjeta | HU-018 | E02 | egresado: Object | Tarjeta con nombre, programa, año, empresa, cargo |
| CP-100 | testBusquedaPorNombre | DirectorioService | buscarPorNombre | HU-018 | E03 | nombre: "María" | Array con 8 egresados |
| CP-101 | testFiltrarPorAño | DirectorioService | filtrarPorAño | HU-018 | E04 | año: "2025" | Array con 30 egresados |
| CP-102 | testRespetarPrivacidad | DirectorioService | filtrarPublicos | HU-018 | E05 | - | Solo egresados con perfil público |
| CP-103 | testRestriccionAcceso | DirectorioService | verificarAcceso | HU-018 | E06 | has_completed_profile: false | Error: "Complete su perfil" |

---

### HU-019: Ver Directorio de Empresas

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-104 | testListarEmpresas | EmpresaService | listarEmpresas | HU-019 | E01 | - | Array con 35 empresas |
| CP-105 | testInformacionTarjeta | EmpresaComponent | renderTarjeta | HU-019 | E02 | empresa: Object | Tarjeta con nombre, sector, cantidad egresados: 5 |
| CP-106 | testBusquedaPorNombre | EmpresaService | buscarPorNombre | HU-019 | E03 | nombre: "TechCorp" | 1 empresa encontrada |
| CP-107 | testFiltrarPorSector | EmpresaService | filtrarPorSector | HU-019 | E04 | sector: "Tecnología" | Array con 12 empresas |
| CP-108 | testVisualizarEgresados | EmpresaService | obtenerEgresadosPorEmpresa | HU-019 | E05 | empresaId: 1 | Array con 5 egresados |
| CP-109 | testRestriccionAcceso | EmpresaService | verificarAcceso | HU-019 | E06 | has_completed_profile: false | Error: "Complete su perfil" |

---

## RESUMEN

### Totales por Artefacto

| Artefacto | Cantidad |
|-----------|----------|
| Historias de Usuario | 19 |
| Escenarios de Prueba | 95 |
| Casos de Prueba | 109 |

### Distribución de Casos de Prueba por HU

| HU | Descripción | Casos de Prueba |
|----|-------------|-----------------|
| HU-001 | Completar encuesta de satisfacción | 5 |
| HU-002 | Iniciar sesión en la plataforma | 5 |
| HU-003 | Registrar nuevo usuario | 5 |
| HU-004 | Completar datos personales | 6 |
| HU-005 | Completar perfil completo | 8 |
| HU-006 | Visualizar perfil completo | 5 |
| HU-007 | Editar información del perfil | 5 |
| HU-008 | Iniciar sesión como líder | 5 |
| HU-009 | Visualizar dashboard de estadísticas | 6 |
| HU-010 | Consultar y buscar egresados | 6 |
| HU-011 | Ver detalle de egresado | 5 |
| HU-012 | Exportar reportes a Excel y PDF | 7 |
| HU-013 | Ver página de inicio | 6 |
| HU-014 | Consultar eventos y networking | 6 |
| HU-015 | Descargar recursos profesionales | 6 |
| HU-016 | Ver ofertas laborales | 6 |
| HU-017 | Participar en encuestas adicionales | 5 |
| HU-018 | Buscar egresados en directorio | 6 |
| HU-019 | Ver directorio de empresas | 6 |
| **TOTAL** | | **109** |

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026  
**Universidad Mariana - Especialización en Sistemas Integrados de Gestión**
