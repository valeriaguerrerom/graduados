# 📋 Estructura Completa del Formulario de Egresados

## Resumen

El formulario completo tiene **8 secciones** con más de **60 campos**.

---

## 📊 Secciones del Formulario

### Paso 1: DATOS SOCIOECONÓMICOS Y DEMOGRÁFICOS
- Nombre
- Apellido
- Fecha de nacimiento
- Sexo (Femenino/Masculino)
- Estado civil (Soltero/Casado-unión libre)
- Email
- Teléfono
- País
- Departamento
- Municipio
- Dirección de correspondencia

### Paso 2: INFORMACIÓN ACADÉMICA
- Programa de estudio
- Año de graduación
- Fecha de grado (FEC_GRADO)
- Modalidad (Presencial/Virtual/Mixta)
- **¿Qué otros tipos de estudios ha realizado?**
  - ☐ Postgrados relacionados con salud
  - ☐ Diplomados, cursos o seminarios de actualización
  - ☐ Cursos del SENA
  - ☐ Ninguno
- **¿Habla usted otro idioma?**
  - Sí/No
  - ¿Cuál?

### Paso 3: INFORMACIÓN SOBRE SITUACIÓN LABORAL DEL EGRESADO
- **Su condición actual laboral es:**
  - Empleado
  - Desempleado
  - Independiente
  - Empleado e independiente
- Ciudad en la que está trabajando
- **¿Cuánto tiempo de experiencia laboral tiene en su área de formación profesional?**
  - Menos de un año
  - Entre 1 año y 3
  - Más de 4 años
  - No he tenido experiencia laboral

### Paso 4: LAS CARACTERÍSTICAS DEL PRIMER EMPLEO
- **¿Cuál fue el lugar de residencia cuando se vinculó a su primer empleo?**
- **El acceso al primer empleo formal después de graduarse fue:**
  - Estaba trabajando antes de graduarme
  - Inmediatamente al graduarse
  - Al mes de graduarse
  - A los tres meses después de graduarse
  - A los 6 meses después de graduarse
  - A los 12 meses después de graduarse
  - No está laborando en el campo de formación profesional
- **El medio por el cual usted obtuvo el primer empleo fue:**
  - Bolsa de trabajo
  - Contactos personales, familiares o conocidos
  - Bolsa de empleo de la UNIMAR
  - Convocatorias de las Empresas sociales del estado
  - Portal web
  - Redes sociales (LinkedIn, Facebook, Twitter)

### Paso 5: EMPLEO ACTUAL Y TRAYECTORIA PROFESIONAL
- **Usted actualmente labora en:**
  - Empresas sociales del estado
  - Entidades asistenciales privadas
  - Empresas promotoras de salud
  - Es independiente, el trabajo está relacionado con el área de formación
  - Es independiente
  - Consultorio médico
  - ONG
- **¿Cuál es el ingreso mensual?** (SMLV)
  - 1 SMLV
  - 2 SMLV
  - 3 SMLV
  - 4 SMLV
  - 5 o Más SMLV
- **¿Cuál considera la principal dificultad a la hora de conseguir trabajo?**
  - Carece de la experiencia necesaria
  - No hay oportunidades de trabajo
  - El salario que le ofrecen es muy bajo
  - No encuentra trabajo en su campo de estudio
  - No sabe cómo buscarlo
  - Otro ¿Cuál?
- **Su área de desempeño ha sido en:**
  - Dirección o gerencia
  - Administrativa
  - Profesional de apoyo (instituto de salud)
  - Docencia
  - Capacitaciones a personal de salud
  - Consultor y asesor en temas de salud
  - Coordinador(a) de área o red
  - Nutrición normal o clínica
  - Agroalimentaría e industrial
  - Nutrición comunitaria
  - Servicios de alimentación
- **Desde que se graduó hasta la fecha, ¿cuántos empleos ha desempeñado?**
  - Uno
  - Más de tres empleos en diferentes áreas
  - Solo me he desempeñado en el campo que inicié
  - No me he desempeñado
  - Estoy desempleado

### Paso 6: RECONOCIMIENTO PROFESIONAL Y REDES
- **¿Ha recibido algún tipo de reconocimiento?**
  - Sí/No
- **El reconocimiento fue:**
  - Académico
  - Político
  - Laboral
  - Social
  - Relación docencia servicio
  - Cultural
  - Otro/cuál
- **Señale si usted participa en redes:**
  - Regional
  - Nacional
  - Internacional
- **Tipo de red:**
  - Académica/científica
  - Asociación de profesionales
  - Agremiación profesional (COLNUD, ACODIN)
  - Culturales
  - Ninguna
- **Después de graduado ha producido:**
  - ☐ Libros publicados
  - ☐ Capítulos de libros publicados
  - ☐ Patentes
  - ☐ Políticas públicas
  - ☐ Ninguno

### Paso 7: EXPERIENCIA INTERNACIONAL
- **¿Ha estado algún tiempo en el exterior después de su graduación por estudio?**
  - Sí/No
  - ¿En qué país?
- **¿Ha estado algún tiempo en el exterior después de su graduación por trabajo?**
  - Sí/No
  - ¿En qué país?
  - ¿Cuánto tiempo (en meses)?
    - Menos de un mes
    - Más de 2 meses
    - Más de 6 meses
    - Más de un año
    - No he estado en el exterior
- **Su área de desempeño fue:**
  - Dirección de procesos
  - Administrativa
  - Profesional de apoyo
  - Docencia
  - Otro/cuál

### Paso 8: CURSOS, SEMINARIOS Y FORMACIÓN FUTURA
- **¿Dónde le gustaría realizar estudios?**
  - Colombia
  - Exterior
- **En el futuro, ¿le gustaría cursar otros estudios en la Universidad Mariana?**
  - Sí me gustaría
  - No me gustaría
  - Ya estoy cursando otros estudios en la institución
- **Principalmente, ¿cuál de las siguientes opciones de formación ha pensado realizar?**
  - Estudios en idiomas
  - Seminarios/cursos/diplomados
  - Programa técnico y tecnológico
  - Programa universitario
  - Especialización
  - Maestría
  - Doctorado
- **Para el desarrollo de sus actividades laborales, ¿cuál considera es el principal aspecto a mejorar de la formación que adquirió en su programa de estudio?**
  - (Campo de texto libre)

---

## 🗄️ Estructura de Base de Datos

La tabla `usuarios` tiene **más de 60 campos** organizados en:

1. **Datos básicos** (5 campos)
2. **Datos socioeconómicos** (7 campos)
3. **Información académica** (4 campos)
4. **Estudios adicionales** (5 campos)
5. **Idiomas** (2 campos)
6. **Situación laboral** (3 campos)
7. **Primer empleo** (3 campos)
8. **Empleo actual** (5 campos)
9. **Trayectoria profesional** (1 campo)
10. **Reconocimiento** (3 campos)
11. **Redes** (2 campos)
12. **Producción académica** (5 campos)
13. **Experiencia internacional** (7 campos)
14. **Formación futura** (4 campos)
15. **Control** (3 campos)

**Total: ~60 campos**

---

## 🎯 Opciones de Implementación

### Opción 1: Formulario Completo (Recomendado)
- 8 pasos con navegación
- Todos los campos del formulario oficial
- Barra de progreso
- Validaciones completas
- **Tiempo de desarrollo:** 2-3 horas

### Opción 2: Formulario Simplificado
- 3-4 pasos con campos esenciales
- Solo datos básicos, académicos y laborales
- Más rápido de completar
- **Tiempo de desarrollo:** 30 minutos

### Opción 3: Formulario por Secciones
- Permitir completar por partes
- Guardar progreso
- Completar más tarde
- **Tiempo de desarrollo:** 1-2 horas

---

## 📝 Archivos Creados

1. **database_completa.sql** - Base de datos con todos los campos
2. **CompleteProfilePageExtended.tsx** - Formulario con navegación por pasos (Paso 1 implementado)

---

## 🚀 Próximos Pasos

¿Quieres que implemente:

1. **Todo el formulario completo** con los 8 pasos?
2. **Solo las secciones más importantes** (simplificado)?
3. **El formulario actual** pero agregando campos específicos que necesites?

Dime qué prefieres y lo implemento completo. 😊
