# PLATAFORMA WEB DE SEGUIMIENTO A EGRESADOS
## Especialización en Sistemas Integrados de Gestión - Universidad Mariana

---

## 1. INTRODUCCIÓN

El seguimiento a egresados es un proceso fundamental para las instituciones de educación superior, ya que permite evaluar el impacto de sus programas académicos en el desarrollo profesional de sus graduados y en el mercado laboral. La Universidad Mariana, comprometida con la mejora continua y la calidad educativa, requiere un sistema eficiente que facilite la recopilación, gestión y análisis de información de los egresados de la Especialización en Sistemas Integrados de Gestión (ESIG).

Actualmente, muchas instituciones enfrentan desafíos significativos en el seguimiento de sus egresados debido a la dispersión de información, la falta de herramientas digitales adecuadas y la dificultad para mantener contacto continuo con los graduados. Esta situación limita la capacidad de la universidad para tomar decisiones informadas sobre la actualización curricular, identificar oportunidades de mejora en los programas académicos y fortalecer la red de egresados.

El presente proyecto propone el desarrollo de una plataforma web integral que automatice y optimice el proceso de seguimiento a egresados, facilitando la recopilación de datos sobre su trayectoria profesional, situación laboral, satisfacción con el programa y necesidades de formación continua. Esta solución tecnológica no solo beneficiará a la oficina de egresados y coordinadores del programa, sino que también proporcionará a los graduados un espacio digital para mantener actualizada su información y acceder a servicios exclusivos.

El sistema se desarrolla utilizando tecnologías web modernas (React, Node.js, MySQL) y metodologías ágiles, garantizando una solución escalable, mantenible y centrada en las necesidades reales de los usuarios. A través de este documento, se presenta el análisis detallado de requerimientos, las historias de usuario y la estimación de costos del proyecto, siguiendo las mejores prácticas de la ingeniería de software.

---

## 2. CONTEXTO DE LA PROBLEMÁTICA

### 2.1 ¿Cuál es el problema real que están abordando?

La Universidad Mariana enfrenta múltiples desafíos en el seguimiento y gestión de información de los egresados de la Especialización en Sistemas Integrados de Gestión:

**Problemas Identificados:**

1. **Dispersión de Información:** Los datos de los egresados se encuentran fragmentados en diferentes formatos (hojas de cálculo, documentos físicos, correos electrónicos), dificultando su acceso y análisis.

2. **Proceso Manual Ineficiente:** La recopilación de información se realiza mediante encuestas físicas o formularios enviados por correo, resultando en bajas tasas de respuesta y datos desactualizados.

3. **Falta de Trazabilidad:** No existe un sistema que permita hacer seguimiento histórico de la evolución profesional de los egresados a lo largo del tiempo.

4. **Dificultad en la Toma de Decisiones:** La ausencia de datos consolidados y actualizados limita la capacidad de los coordinadores para evaluar el impacto del programa y tomar decisiones informadas sobre mejoras curriculares.

5. **Cumplimiento de Requisitos de Acreditación:** Los procesos de acreditación de alta calidad requieren evidencias documentadas del seguimiento a egresados, empleabilidad y satisfacción con el programa.

6. **Desconexión con Egresados:** La falta de una plataforma digital dificulta mantener comunicación continua con los graduados y fortalecer la red de egresados.

**Impacto del Problema:**

- Pérdida de oportunidades para mejorar el programa académico basándose en retroalimentación real
- Dificultad para demostrar la calidad y pertinencia del programa ante organismos de acreditación
- Imposibilidad de generar reportes estadísticos confiables sobre empleabilidad y satisfacción
- Tiempo excesivo invertido por el personal administrativo en tareas manuales de recopilación de datos
- Experiencia deficiente para los egresados al no contar con herramientas digitales modernas

### 2.2 ¿Quiénes son los usuarios finales (target)?

El sistema está diseñado para atender las necesidades de tres perfiles de usuario claramente diferenciados:

#### **Usuario 1: Egresados de la Especialización ESIG**

**Características:**
- Profesionales graduados de la Especialización en Sistemas Integrados de Gestión
- Edad promedio: 28-45 años
- Nivel educativo: Especialización (posgrado)
- Ubicación: Principalmente en Nariño, Colombia, aunque algunos pueden residir en otras regiones o países
- Situación laboral: Empleados, independientes o desempleados

**Necesidades:**
- Completar y actualizar su información personal, académica y laboral de manera sencilla
- Acceder a la plataforma desde cualquier dispositivo (computador, tablet, celular)
- Mantener privacidad y seguridad de sus datos personales
- Recibir retroalimentación sobre el proceso de actualización de información

**Objetivos al usar el sistema:**
- Cumplir con el requisito institucional de completar la encuesta de satisfacción
- Mantener actualizado su perfil profesional
- Acceder a beneficios exclusivos para egresados (bolsa de empleo, eventos, recursos)

#### **Usuario 2: Coordinadores y Líderes del Programa**

**Características:**
- Personal académico-administrativo de la Universidad Mariana
- Coordinador del programa ESIG, directores de área, personal de la oficina de egresados
- Nivel de conocimiento técnico: Medio (usuarios de office, sistemas básicos)
- Necesitan información consolidada para toma de decisiones

**Necesidades:**
- Visualizar estadísticas generales sobre egresados (empleabilidad, satisfacción, etc.)
- Consultar información detallada de egresados sin necesidad de conocimientos técnicos en bases de datos
- Generar reportes para procesos de acreditación y evaluación del programa
- Exportar datos a formatos estándar (Excel, PDF) para análisis y presentaciones
- Acceso rápido y seguro a la información desde la oficina

**Objetivos al usar el sistema:**
- Evaluar el impacto del programa en la empleabilidad de los egresados
- Identificar áreas de mejora en el currículo basándose en retroalimentación real
- Generar evidencias documentadas para procesos de acreditación
- Tomar decisiones informadas sobre actualización de contenidos y metodologías

#### **Usuario 3: Administradores del Sistema (Futuro)**

**Características:**
- Personal de TI o administradores designados por la universidad
- Conocimientos técnicos avanzados
- Responsables del mantenimiento y configuración del sistema

**Necesidades:**
- Gestionar usuarios (crear, editar, eliminar)
- Configurar parámetros del sistema
- Realizar respaldos y mantenimiento de la base de datos
- Gestionar permisos y roles de usuario

**Objetivos al usar el sistema:**
- Garantizar la disponibilidad y seguridad del sistema
- Administrar el ciclo de vida de los usuarios
- Resolver incidencias técnicas

---

## 3. ANÁLISIS DE REQUERIMIENTOS

### 3.1 Metodología de Análisis Utilizada

Para el levantamiento y análisis de requerimientos del sistema se utilizaron las siguientes técnicas:

#### **3.1.1 Encuesta a Egresados**

Se aplicó una encuesta estructurada a 29 egresados del programa graduados en el año 2025, con el objetivo de identificar necesidades y expectativas relacionadas con:
- Actualización de información profesional
- Networking entre egresados
- Oportunidades laborales
- Acceso a recursos académicos
- Participación en eventos
- Aceptación de funcionalidades de la plataforma

**Evidencias:**
- Cuestionario aplicado a 29 egresados
- Resultados tabulados y analizados
- Gráficos estadísticos de respuestas

#### **3.1.2 Entrevistas Semiestructuradas**

Se realizaron tres entrevistas en profundidad con:
- Director de la Especialización en Sistemas Integrados de Gestión
- Dos egresados del programa graduados en 2025

**Evidencias:**
- Guía de entrevista semiestructurada
- Transcripciones de entrevistas
- Análisis cualitativo de necesidades identificadas

#### **3.1.3 Análisis Documental**

Se revisaron documentos institucionales:
- Formatos actuales de seguimiento a egresados
- Requisitos de acreditación de alta calidad (CNA)
- Políticas institucionales sobre protección de datos
- Lineamientos para seguimiento a graduados

**Evidencias:**
- Formato físico de encuesta de seguimiento
- Documento de lineamientos CNA para seguimiento a egresados
- Política de tratamiento de datos personales de la Universidad

#### **3.1.4 Benchmarking**

Se analizaron sistemas similares implementados en otras universidades:
- Plataforma de egresados Universidad de los Andes
- Sistema de seguimiento Universidad Nacional
- Mejores prácticas en gestión de egresados

**Evidencias:**
- Capturas de pantalla de sistemas referentes
- Matriz comparativa de funcionalidades
- Análisis de ventajas y desventajas de cada solución

---

### 3.2 Análisis de Resultados de la Encuesta

Con el fin de identificar las necesidades y expectativas de los egresados de la Especialización en Sistemas Integrados de Gestión, se aplicó una encuesta estructurada a 29 egresados del programa graduados en el año 2025.

#### **3.2.1 Actualización de Información**

**Resultados:**
- El **89%** de los encuestados consideró que es muy importante que la universidad mantenga actualizada la información profesional de sus egresados.
- La mayoría indicó que estaría dispuesto a actualizar su información al menos una vez al año o cuando cambie su situación laboral.

**Datos más relevantes para actualizar:**
- Empresa donde trabaja
- Cargo actual
- Experiencia profesional
- Certificaciones
- Formación académica adicional

**Conclusión:** Estos resultados respaldan la implementación de un módulo de perfil profesional actualizado dentro de la plataforma.

---

#### **3.2.2 Networking entre Egresados**

**Resultados:**
- El **93%** de los encuestados manifestó interés en poder conectar con otros egresados del programa para generar oportunidades profesionales.

**Formas de interacción más solicitadas:**
- Contacto profesional entre egresados
- Compartir oportunidades laborales
- Colaboraciones profesionales
- Mentoría profesional

**Herramientas más valoradas:**
- Directorio de egresados
- Publicación de oportunidades laborales
- Espacios de interacción profesional

**Conclusión:** Esto evidencia la necesidad de incorporar una sección de networking dentro de la plataforma que facilite la interacción entre los egresados del programa.

---

#### **3.2.3 Oportunidades Laborales**

**Resultados:**
- El **96%** de los encuestados indicó que le interesaría acceder a ofertas laborales exclusivas para egresados del programa.

**Oportunidades más demandadas:**
- Empleo en empresas
- Consultorías
- Proyectos profesionales

**Conclusión:** La mayoría consideró muy útil la integración con la bolsa de empleo institucional de la universidad, lo cual justifica la implementación de un módulo que permita redirigir a dicha plataforma y publicar oportunidades verificadas por el programa.

---

#### **3.2.4 Acceso a Recursos Profesionales**

**Resultados:**
- El **90%** de los encuestados manifestó interés en acceder a recursos técnicos relacionados con los sistemas integrados de gestión.

**Recursos más solicitados:**
- Plantillas ISO
- Guías de auditoría
- Documentos técnicos
- Normatividad actualizada

**Conclusión:** Este resultado respalda la implementación de una sección de recursos profesionales descargables dentro de la plataforma.

---

#### **3.2.5 Eventos Académicos y Profesionales**

**Resultados:**
- El **87%** de los egresados indicó que le gustaría recibir información sobre eventos académicos o profesionales organizados por el programa.

**Eventos de mayor interés:**
- Webinars
- Conferencias
- Encuentros de egresados
- Talleres profesionales

**Conclusión:** Se propone incluir una sección de eventos que permita consultar y registrarse a actividades del programa.

---

#### **3.2.6 Acceso Exclusivo a Egresados**

**Resultados:**
- La mayoría de los participantes manifestó que considera adecuado que el acceso a la plataforma sea exclusivo para egresados verificados.

**Conclusión:** Esto respalda la decisión de implementar un sistema de autenticación mediante credenciales administradas por el programa.

---

### 3.3 Resultados de las Entrevistas

Además de la encuesta, se realizaron tres entrevistas semiestructuradas con el fin de profundizar en las necesidades identificadas.

#### **3.3.1 Entrevista con el Director del Programa**

El director de la Especialización en Sistemas Integrados de Gestión señaló que una de las principales necesidades institucionales es mantener actualizada la información de los egresados, ya que estos datos son requeridos para:
- Procesos de seguimiento a graduados
- Informes institucionales
- Procesos de acreditación académica

**Necesidades identificadas:**
- Contar con un espacio que fortalezca la relación entre los egresados y el programa
- Promover oportunidades laborales
- Facilitar eventos académicos
- Fomentar la participación en actividades del posgrado
- Incluir recursos académicos relacionados con normas ISO y auditoría de sistemas integrados de gestión

---

#### **3.3.2 Entrevista con Egresados**

Los egresados entrevistados manifestaron que actualmente no existe un espacio digital que permita mantener contacto con otros egresados del programa, lo cual limita las posibilidades de networking profesional.

**Funcionalidades consideradas más útiles:**
- Acceso a oportunidades laborales
- Contacto con otros egresados
- Acceso a recursos técnicos
- Información sobre eventos académicos

**Necesidad adicional:**
- Contar con un perfil profesional dentro de la plataforma que permita visibilizar la experiencia laboral de los egresados y facilitar la generación de oportunidades profesionales.

---

### 3.4 Conclusión del Análisis de Requerimientos

A partir del análisis de la encuesta aplicada a los egresados y de las entrevistas realizadas con el director del programa y dos egresados, se identificaron las principales necesidades que orientaron la definición de los requerimientos funcionales y no funcionales del sistema.

**Los resultados evidencian la necesidad de desarrollar una plataforma que permita:**
- Mantener actualizada la información profesional de los egresados
- Facilitar el networking entre miembros de la comunidad académica
- Ofrecer acceso a oportunidades laborales
- Compartir recursos académicos especializados
- Promover eventos y actividades del programa

**Estas necesidades se traducen en los módulos principales de la plataforma:**
- Perfil de egresado
- Networking profesional
- Bolsa de empleo
- Recursos académicos
- Eventos
- Testimonios

---

## 4. DEFINICIÓN DE REQUISITOS FUNCIONALES (RF)

Los requisitos funcionales describen las acciones específicas que el sistema debe realizar para satisfacer las necesidades de los usuarios. Estos requisitos fueron definidos mediante un proceso de levantamiento y análisis de información enfocado en determinar **qué debe hacer el sistema**, incluyendo acciones, procesos de negocio y respuestas a entradas específicas.

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

**Secciones del Perfil:**
1. Datos personales y demográficos
2. Información académica
3. Situación laboral actual
4. Información del primer empleo
5. Trayectoria profesional
6. Reconocimientos y participación en redes
7. Experiencia internacional
8. Planes de formación futura
9. Sugerencias de mejora

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

## 5. DEFINICIÓN DE REQUISITOS NO FUNCIONALES (RNF)

Los requisitos no funcionales definen las características de calidad del sistema. La norma principal utilizada es la **ISO/IEC 25010**, que define un modelo de calidad para productos de software, detallando características no funcionales como eficiencia, seguridad, compatibilidad, usabilidad, fiabilidad y mantenibilidad.

**Referencia normativa:** ISO/IEC 25010 - Modelo de calidad del producto software  
**Fuente:** https://iso25000.com/index.php/normas-iso25000/iso-25010

La norma ISO/IEC 25010 establece ocho características principales de calidad del producto software:
1. Adecuación funcional
2. Eficiencia de desempeño
3. Compatibilidad
4. Usabilidad
5. Fiabilidad
6. Seguridad
7. Mantenibilidad
8. Portabilidad

A continuación se detallan los requisitos no funcionales del sistema basados en esta norma:

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

**Característica ISO/IEC 25010:** Compatibilidad - Capacidad de dos o más sistemas o componentes para intercambiar información y/o llevar a cabo sus funciones requeridas cuando comparten el mismo entorno hardware o software.

**Requisitos:**
- Debe funcionar en navegadores Chrome, Firefox, Edge y Safari (últimas 2 versiones)
- Debe ser responsive y adaptarse a dispositivos móviles, tablets y desktop
- Debe funcionar en sistemas operativos Windows, macOS, Linux, Android e iOS

**Métrica:**
- Compatibilidad con 95% de navegadores modernos
- Diseño responsive verificado en al menos 5 tamaños de pantalla

---

### RNF-04: Seguridad

**Característica ISO/IEC 25010:** Seguridad - Capacidad de protección de la información y los datos de manera que personas o sistemas no autorizados no puedan leerlos o modificarlos.

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

**Característica ISO/IEC 25010:** Fiabilidad - Capacidad de un sistema o componente para desempeñar las funciones especificadas, cuando se usa bajo unas condiciones y periodo de tiempo determinados.

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

**Característica ISO/IEC 25010:** Mantenibilidad - Capacidad del producto software para ser modificado efectiva y eficientemente, debido a necesidades evolutivas, correctivas o perfectivas.

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

**Característica ISO/IEC 25010:** Portabilidad - Capacidad del producto o componente de ser transferido de forma efectiva y eficiente de un entorno hardware, software, operacional o de utilización a otro.

**Requisitos:**
- Debe usar tecnologías estándar y ampliamente soportadas
- La configuración debe estar centralizada en archivos .env
- Debe incluir scripts de instalación y despliegue
- La base de datos debe ser portable (MySQL estándar)

**Métrica:**
- Tiempo de instalación en nuevo servidor: < 2 horas
- Dependencias externas: mínimas y documentadas

---

## 6. HISTORIAS DE USUARIO

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

**Puntos de esfuerzo:** 5 días

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

**Puntos de esfuerzo:** 3 días

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

**Puntos de esfuerzo:** 3 días

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

**Puntos de esfuerzo:** 2 días

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

**Puntos de esfuerzo:** 8 días

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

**Puntos de esfuerzo:** 3 días

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

**Puntos de esfuerzo:** 3 días

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

**Puntos de esfuerzo:** 2 días

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

**Puntos de esfuerzo:** 4 días

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

**Puntos de esfuerzo:** 4 días

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

**Puntos de esfuerzo:** 3 días

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

**Puntos de esfuerzo:** 5 días

---

### Resumen de Puntos de Esfuerzo

| Historia de Usuario | Puntos de Esfuerzo |
|---------------------|-------------------|
| HU-001: Encuesta de Satisfacción | 5 días |
| HU-002: Iniciar Sesión | 3 días |
| HU-003: Registrar Usuario | 3 días |
| HU-004: Datos Personales | 2 días |
| HU-005: Perfil Completo | 8 días |
| HU-006: Visualizar Perfil | 3 días |
| HU-007: Editar Perfil | 3 días |
| HU-008: Login Líder | 2 días |
| HU-009: Dashboard Estadísticas | 4 días |
| HU-010: Consultar Egresados | 4 días |
| HU-011: Ver Detalle | 3 días |
| HU-012: Exportar Reportes | 5 días |
| **TOTAL** | **45 días** |

---

## 7. CONCLUSIONES

El desarrollo de la Plataforma Web de Seguimiento a Egresados de la Especialización en Sistemas Integrados de Gestión representa una solución integral a la problemática identificada en la Universidad Mariana. 

### Proceso de Análisis de Requerimientos

A través de un proceso riguroso de levantamiento de información que incluyó:
- **Encuesta estructurada** aplicada a 29 egresados (89% considera importante la actualización de información, 93% interesado en networking, 96% en oportunidades laborales)
- **Entrevistas semiestructuradas** con el director del programa y dos egresados
- **Análisis documental** de requisitos institucionales y de acreditación
- **Benchmarking** con sistemas similares de otras universidades

### Definición de Requisitos

Se definieron de manera clara y medible:

**Requisitos Funcionales (RF):**
- 8 requisitos funcionales que describen qué debe hacer el sistema
- Enfocados en procesos de negocio críticos: encuesta de satisfacción, autenticación, gestión de perfil, dashboard de coordinadores y exportación de reportes
- Cada RF incluye criterios de aceptación específicos y medibles

**Requisitos No Funcionales (RNF):**
- 7 requisitos no funcionales basados en la norma **ISO/IEC 25010**
- Cubren las características de calidad: usabilidad, eficiencia de desempeño, compatibilidad, seguridad, fiabilidad, mantenibilidad y portabilidad
- Cada RNF incluye métricas cuantificables para su verificación

### Historias de Usuario

Se crearon 12 historias de usuario siguiendo el formato estándar de desarrollo ágil:
- Formato estructurado con código, título, descripción, responsable y criterios de aceptación
- Estimación total: 45 días de esfuerzo de desarrollo
- Cubren todos los roles: egresados, coordinadores y administradores

### Beneficios del Sistema

El sistema diseñado:

1. **Automatiza procesos manuales** reduciendo significativamente el tiempo invertido en recopilación de datos
2. **Centraliza información** facilitando el acceso y análisis de datos de egresados para procesos de acreditación
3. **Mejora la experiencia del usuario** mediante interfaces intuitivas y procesos simplificados
4. **Proporciona herramientas de análisis** para la toma de decisiones informadas (dashboard con estadísticas en tiempo real)
5. **Cumple con estándares de calidad** siguiendo la norma ISO/IEC 25010
6. **Facilita el networking profesional** entre egresados del programa
7. **Apoya procesos de acreditación** generando evidencias documentadas del seguimiento a egresados

### Impacto Esperado

- Tasa de actualización de información: incremento del 60% al 90%
- Tiempo de generación de reportes: reducción de 5 días a 5 minutos
- Satisfacción de usuarios: objetivo del 85% de satisfacción
- Cumplimiento de requisitos de acreditación: 100% de evidencias documentadas

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026  
**Universidad Mariana - Especialización en Sistemas Integrados de Gestión**
