# ESCENARIOS Y CASOS DE PRUEBA - 10 HISTORIAS DE USUARIO
## Plataforma Web de Seguimiento a Egresados - Universidad Mariana

---

## ESCENARIOS DE PRUEBA

### HU-01: Completar Encuesta de Satisfacción

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-01 | E01 | Validar ingreso de cédula para iniciar encuesta | Cédula: "1234567890" | 1 |
| HU-01 | E02 | Validar que todas las preguntas estén respondidas | 7 preguntas Likert: [4,5,3,4,5,4,5], 2 preguntas abiertas: ["Excelente programa", "Mejorar infraestructura"], Pregunta múltiple: "Sí" | 2 |
| HU-01 | E03 | Validar envío de encuesta completa | Encuesta completa con todos los campos llenos | 3 |

---

### HU-02: Iniciar Sesión

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-02 | E01 | Validar inicio de sesión con credenciales correctas | Cédula: "1234567890", Password: "password123" | 1 |
| HU-02 | E02 | Validar inicio de sesión con credenciales incorrectas | Cédula: "1234567890", Password: "incorrecta" | 2 |
| HU-02 | E03 | Validar validación de credenciales al presionar iniciar sesión | Cédula: "1234567890", Password: "password123" | 3 |

---

### HU-03: Registrar Datos Personales

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-03 | E01 | Validar habilitación del botón guardar con campos obligatorios completos | Nombre: "Juan", Apellido: "Pérez", Cédula: "1234567890", Email: "juan@example.com", Teléfono: "3001234567" | 1 |
| HU-03 | E02 | Validar registro de información al presionar guardar | Datos personales completos | 2 |
| HU-03 | E03 | Validar mensaje de validación cuando campos estén vacíos | Nombre: "", Apellido: "", Cédula: "" | 3 |

---

### HU-04: Registrar Información Académica

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-04 | E01 | Validar información académica ingresada | Programa: "ESIG", Año graduación: "2025" | 1 |
| HU-04 | E02 | Validar registro de datos académicos al presionar guardar | Programa: "ESIG", Año graduación: "2025", Modalidad: "Presencial" | 2 |
| HU-04 | E03 | Validar mensaje de error cuando dato sea inválido | Año graduación: "abcd" (formato inválido) | 3 |

---

### HU-05: Registrar Situación Laboral

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-05 | E01 | Validar habilitación de campos laborales al seleccionar condición laboral | Condición laboral: "Empleado" | 1 |
| HU-05 | E02 | Validar habilitación del botón guardar al completar datos laborales | Condición laboral: "Empleado", Ciudad trabajo: "Pasto", Tiempo experiencia: "Entre 1 año y 3" | 2 |
| HU-05 | E03 | Validar registro de información laboral al presionar guardar | Datos laborales completos | 3 |

---

### HU-06: Registrar Primer Empleo

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-06 | E01 | Validar que el sistema permita guardar información del primer empleo | Lugar residencia: "Pasto", Acceso primer empleo: "Inmediatamente al graduarse", Medio obtención: "Bolsa de empleo" | 1 |
| HU-06 | E02 | Validar registro de datos al presionar guardar | Información primer empleo completa | 2 |
| HU-06 | E03 | Validar avance al siguiente formulario al presionar siguiente | Usuario presiona "Siguiente" | 3 |

---

### HU-07: Registrar Reconocimientos

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-07 | E01 | Validar habilitación de campo al indicar que tiene reconocimientos | Ha recibido reconocimiento: true | 1 |
| HU-07 | E02 | Validar que el sistema permita guardar tipo de reconocimiento | Tipo reconocimiento: "Académico" | 2 |
| HU-07 | E03 | Validar registro de información al presionar guardar | Reconocimiento: {tipo: "Académico", descripción: "Mejor egresado"} | 3 |

---

### HU-08: Registrar Experiencia Internacional

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-08 | E01 | Validar habilitación de campos país y tiempo al seleccionar que ha estado en el exterior | Estuvo exterior trabajo: true | 1 |
| HU-08 | E02 | Validar que el sistema permita guardar los datos ingresados | País trabajo: "España", Tiempo exterior: "Más de 6 meses" | 2 |
| HU-08 | E03 | Validar registro de experiencia internacional al presionar guardar | Experiencia internacional completa | 3 |

---

### HU-09: Registrar Formación Futura

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-09 | E01 | Validar registro de selección de tipo de formación | Tipo formación futura: "Maestría" | 1 |
| HU-09 | E02 | Validar almacenamiento de información al presionar guardar | Donde realizar estudios: "Colombia", Cursaría estudios UNIMAR: "Si me gustaría", Tipo formación: "Maestría" | 2 |
| HU-09 | E03 | Validar que el sistema permita avanzar al siguiente paso al continuar | Usuario presiona "Continuar" | 3 |

---

### HU-10: Visualizar Perfil

| Código HU | No | Descripción | Datos | CID |
|-----------|----|-----------|---------|----|
| HU-10 | E01 | Validar visualización de toda la información al acceder al perfil | Cédula: "1234567890" | 1 |
| HU-10 | E02 | Validar visualización de cada sección al revisar datos | Secciones: Datos personales, Académicos, Laborales, Reconocimientos, etc. | 2 |
| HU-10 | E03 | Validar habilitación de opción de actualización al desear editar | Usuario hace clic en "Editar" | 3 |

---

## CASOS DE PRUEBA

### HU-01: Completar Encuesta de Satisfacción

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-001 | testIngresarCedulaExitoso | EncuestaService | iniciarEncuesta | HU-01 | E01 | cedula: "1234567890" | Formulario de encuesta habilitado |
| CP-002 | testValidarPreguntasCompletas | EncuestaService | validarEncuesta | HU-01 | E02 | preguntas: [4,5,3,4,5,4,5], abiertas: ["texto1", "texto2"], multiple: "Sí" | Botón enviar habilitado |
| CP-003 | testEnviarEncuestaExitoso | EncuestaService | guardarEncuesta | HU-01 | E03 | encuestaDTO con todos los campos | Encuesta guardada, mensaje: "Encuesta enviada exitosamente" |

---

### HU-02: Iniciar Sesión

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-004 | testLoginExitoso | AuthService | login | HU-02 | E01 | cedula: "1234567890", password: "password123" | Token JWT generado, acceso permitido a la plataforma |
| CP-005 | testLoginCredencialesIncorrectas | AuthService | login | HU-02 | E02 | cedula: "1234567890", password: "incorrecta" | Mensaje de error: "Credenciales incorrectas" |
| CP-006 | testValidarCredenciales | AuthService | validarCredenciales | HU-02 | E03 | cedula: "1234567890", password: "password123" | Credenciales validadas correctamente |

---

### HU-03: Registrar Datos Personales

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-007 | testHabilitarBotonGuardar | PerfilService | validarCamposObligatorios | HU-03 | E01 | datosPersonalesDTO: {nombre: "Juan", apellido: "Pérez", cedula: "1234567890", email: "juan@example.com", telefono: "3001234567"} | Botón guardar habilitado |
| CP-008 | testRegistrarInformacion | PerfilService | guardarDatosPersonales | HU-03 | E02 | datosPersonalesDTO completo | Información registrada en BD, mensaje: "Datos guardados exitosamente" |
| CP-009 | testMensajeValidacionCamposVacios | PerfilService | validarCamposObligatorios | HU-03 | E03 | datosPersonalesDTO: {nombre: "", apellido: "", cedula: ""} | Mensaje de validación: "Complete los campos obligatorios" |

---

### HU-04: Registrar Información Académica

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-010 | testValidarInformacionAcademica | PerfilService | validarDatosAcademicos | HU-04 | E01 | programa: "ESIG", añoGraduacion: "2025" | Información validada correctamente |
| CP-011 | testRegistrarDatosAcademicos | PerfilService | guardarDatosAcademicos | HU-04 | E02 | datosAcademicosDTO: {programa: "ESIG", añoGraduacion: "2025", modalidad: "Presencial"} | Datos académicos registrados en BD |
| CP-012 | testMensajeErrorDatoInvalido | PerfilService | validarDatosAcademicos | HU-04 | E03 | añoGraduacion: "abcd" | Mensaje de error: "Año de graduación inválido" |

---

### HU-05: Registrar Situación Laboral

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-013 | testHabilitarCamposLaborales | PerfilService | habilitarCamposSegunCondicion | HU-05 | E01 | condicionLaboral: "Empleado" | Campos laborales habilitados (ciudad trabajo, tiempo experiencia, etc.) |
| CP-014 | testHabilitarBotonGuardarLaboral | PerfilService | validarDatosLaborales | HU-05 | E02 | datosLaboralesDTO: {condicionLaboral: "Empleado", ciudadTrabajo: "Pasto", tiempoExperiencia: "Entre 1 año y 3"} | Botón guardar habilitado |
| CP-015 | testRegistrarInformacionLaboral | PerfilService | guardarDatosLaborales | HU-05 | E03 | datosLaboralesDTO completo | Información laboral registrada en BD |

---

### HU-06: Registrar Primer Empleo

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-016 | testPermitirGuardarPrimerEmpleo | PerfilService | validarPrimerEmpleo | HU-06 | E01 | primerEmpleoDTO: {lugarResidencia: "Pasto", accesoPrimerEmpleo: "Inmediatamente al graduarse", medioObtencion: "Bolsa de empleo"} | Sistema permite guardar la información |
| CP-017 | testRegistrarDatosPrimerEmpleo | PerfilService | guardarPrimerEmpleo | HU-06 | E02 | primerEmpleoDTO completo | Datos registrados en BD |
| CP-018 | testAvanzarSiguienteFormulario | PerfilService | avanzarPaso | HU-06 | E03 | pasoActual: 4 | Sistema avanza al paso 5 |

---

### HU-07: Registrar Reconocimientos

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-019 | testHabilitarCampoReconocimientos | PerfilService | habilitarCampoReconocimiento | HU-07 | E01 | haRecibidoReconocimiento: true | Campo para registrar reconocimientos habilitado |
| CP-020 | testPermitirGuardarTipoReconocimiento | PerfilService | validarReconocimiento | HU-07 | E02 | tipoReconocimiento: "Académico" | Sistema permite guardarlo |
| CP-021 | testRegistrarInformacionReconocimiento | PerfilService | guardarReconocimiento | HU-07 | E03 | reconocimientoDTO: {tipo: "Académico", descripcion: "Mejor egresado"} | Información registrada en BD |

---

### HU-08: Registrar Experiencia Internacional

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-022 | testHabilitarCamposPaisYTiempo | PerfilService | habilitarCamposExterior | HU-08 | E01 | estuvoExteriorTrabajo: true | Campos país y tiempo habilitados |
| CP-023 | testPermitirGuardarDatosExterior | PerfilService | validarExperienciaInternacional | HU-08 | E02 | experienciaDTO: {paisTrabajo: "España", tiempoExterior: "Más de 6 meses"} | Sistema permite guardar los datos |
| CP-024 | testRegistrarExperienciaInternacional | PerfilService | guardarExperienciaInternacional | HU-08 | E03 | experienciaDTO completo | Experiencia internacional registrada en BD |

---

### HU-09: Registrar Formación Futura

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-025 | testRegistrarSeleccionFormacion | PerfilService | registrarTipoFormacion | HU-09 | E01 | tipoFormacionFutura: "Maestría" | Selección registrada |
| CP-026 | testAlmacenarInformacionFormacion | PerfilService | guardarFormacionFutura | HU-09 | E02 | formacionDTO: {dondeRealizarEstudios: "Colombia", cursariaEstudiosUNIMAR: "Si me gustaría", tipoFormacion: "Maestría"} | Información almacenada en BD |
| CP-027 | testPermitirAvanzarSiguientePaso | PerfilService | avanzarPaso | HU-09 | E03 | pasoActual: 8 | Sistema permite avanzar al paso 9 |

---

### HU-10: Visualizar Perfil

| CPId | Nombre | Clase | Método | HU | Escenario | Valores de entrada | Resultado esperado |
|------|--------|-------|--------|----|-----------|--------------------|-------------------|
| CP-028 | testMostrarTodaInformacion | PerfilService | obtenerPerfilCompleto | HU-10 | E01 | cedula: "1234567890" | Sistema muestra toda la información del egresado |
| CP-029 | testVisualizarCadaSeccion | PerfilComponent | renderSecciones | HU-10 | E02 | perfilDTO completo | Sistema permite visualizar cada sección (Datos personales, Académicos, Laborales, etc.) |
| CP-030 | testHabilitarOpcionActualizacion | PerfilComponent | habilitarEdicion | HU-10 | E03 | usuario hace clic en "Editar" | Sistema habilita la opción de actualización |

---

## RESUMEN

### Totales

| Artefacto | Cantidad |
|-----------|----------|
| Historias de Usuario | 10 |
| Escenarios de Prueba | 30 (3 por HU) |
| Casos de Prueba | 30 (3 por HU) |

### Distribución de Casos de Prueba por HU

| HU | Descripción | Escenarios | Casos de Prueba |
|----|-------------|------------|-----------------|
| HU-01 | Completar encuesta de satisfacción | 3 | 3 |
| HU-02 | Iniciar sesión | 3 | 3 |
| HU-03 | Registrar datos personales | 3 | 3 |
| HU-04 | Registrar información académica | 3 | 3 |
| HU-05 | Registrar situación laboral | 3 | 3 |
| HU-06 | Registrar primer empleo | 3 | 3 |
| HU-07 | Registrar reconocimientos | 3 | 3 |
| HU-08 | Registrar experiencia internacional | 3 | 3 |
| HU-09 | Registrar formación futura | 3 | 3 |
| HU-10 | Visualizar perfil | 3 | 3 |
| **TOTAL** | | **30** | **30** |

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026  
**Universidad Mariana - Especialización en Sistemas Integrados de Gestión**
