# ESTIMACIÓN DE COSTOS Y TIEMPOS DEL PROYECTO
## Plataforma Web de Seguimiento a Egresados - Universidad Mariana

---

## 1. IDENTIFICACIÓN DE REQUERIMIENTOS Y NECESIDADES

### Historias de Usuario con Story Points

| ID | Descripción de Historia de Usuario | Story Points | Complejidad |
|----|-----------------------------------|--------------|-------------|
| HU-001 | Completar encuesta de satisfacción | 5 | Compleja |
| HU-002 | Iniciar sesión en la plataforma | 3 | Moderada |
| HU-003 | Registro de nuevos usuarios | 3 | Moderada |
| HU-004 | Completar datos personales (Paso 1) | 2 | Simple |
| HU-005 | Completar perfil completo (Pasos 2-9) | 8 | Muy compleja |
| HU-006 | Visualizar perfil completo | 3 | Moderada |
| HU-007 | Editar información del perfil | 3 | Moderada |
| HU-008 | Iniciar sesión como líder/coordinador | 2 | Simple |
| HU-009 | Visualizar dashboard de estadísticas | 5 | Compleja |
| HU-010 | Consultar y buscar egresados | 5 | Compleja |
| HU-011 | Ver detalle completo de egresado | 3 | Moderada |
| HU-012 | Exportar reportes a Excel y PDF | 5 | Compleja |
| HU-013 | Ver página de inicio | 3 | Moderada |
| HU-014 | Consultar eventos y networking | 5 | Compleja |
| HU-015 | Descargar recursos profesionales | 3 | Moderada |
| HU-016 | Ver ofertas laborales | 5 | Compleja |
| HU-017 | Participar en encuestas adicionales | 2 | Simple |
| HU-018 | Buscar egresados en directorio | 5 | Compleja |
| HU-019 | Ver directorio de empresas | 3 | Moderada |
| **TOTAL SP** | | **66** | |

---

## 2. ESCALA DE STORY POINTS

| Story Points | Complejidad | Horas aproximadas |
|--------------|-------------|-------------------|
| 1 | Muy simple | 1 - 2 h |
| 2 | Simple | 2 - 4 h |
| 3 | Moderada | 4 - 8 h |
| 5 | Compleja | 8 - 16 h |
| 8 | Muy compleja | 16 - 32 h |
| 13 | Alta incertidumbre | 32 - 60 h |

---

## 3. DESGLOSE DE TAREAS POR HISTORIA DE USUARIO

### Ejemplo: HU-005 - Completar perfil completo (Pasos 2-9)

| Ítem del Product Backlog | Tarea | Tiempo estimado (HH:MM:SS) |
|--------------------------|-------|---------------------------|
| HU-005 | Especificar historia de usuario | 02:00:00 |
| | Elaborar prototipo de la interfaz GUI | 04:00:00 |
| | Elaborar diagrama de clases del mundo | 03:00:00 |
| | Diseñar e implementar la base de datos | 05:00:00 |
| | Codificar la capa interfaz (Frontend) | 08:00:00 |
| | Codificar la capa mundo (Backend) | 06:00:00 |
| | Elaborar escenarios de prueba | 02:00:00 |
| | Ejecutar escenarios de prueba | 01:30:00 |
| | Realizar ajustes con base en resultados | 01:30:00 |
| **Total (Hora persona)** | | **33:00:00** |

**Nota:** Este desglose se replica para cada historia de usuario según su complejidad.

---

## 4. CÁLCULO DE PUNTOS RESPECTO AL EQUIPO

### Desempeño del Equipo en Sprints Anteriores

| Sprint | Story Points completados |
|--------|-------------------------|
| 1 | 20 |
| 2 | 24 |
| 3 | 22 |
| **Promedio Velocidad** | **22** |

### Estándar de la Industria

| Tamaño equipo | Velocidad típica |
|---------------|------------------|
| 3 desarrolladores | 15 – 25 SP |
| 4 desarrolladores | 20 – 35 SP |
| 5 desarrolladores | 30 – 45 SP |

**Equipo del proyecto:** 3 desarrolladores (Frontend, Backend, QA)  
**Velocidad estimada:** 22 SP por sprint

---

## 5. MÉTRICAS DEL PROYECTO

| Métrica | Valor | Observación |
|---------|-------|-------------|
| Total Story Points | 66 | |
| Velocidad promedio (SP por sprint) | 22 | |
| Sprints necesarios | 3,00 | **3 sprints** |
| Duración estimada (si sprint=2 semanas) | 6,00 semanas | **6 semanas** |

---

## 6. PARÁMETROS DEL PROYECTO

| Parámetro | Valor |
|-----------|-------|
| Total Story Points del backlog | 66 |
| Velocidad del equipo (SP por sprint) | 22 |
| Duración del sprint (semanas) | 2 |
| Horas laborales por semana por persona | 40 |

---

## 7. ROLES Y COSTOS (JUNIORS)

| Rol | Salario mensual (USD) |
|-----|----------------------|
| Frontend Developer | $1.200,00 |
| Backend Developer | $1.200,00 |
| QA / Tester | $1.000,00 |
| **Total mensual equipo** | **$3.400,00** |

---

## 8. CÁLCULOS FINALES

### Tiempo

| Concepto | Valor |
|----------|-------|
| Sprints necesarios | 3,00 |
| Duración total (semanas) | 6,00 |
| Duración total (meses aprox) | 1,50 |

### Horas

| Concepto | Valor |
|----------|-------|
| Horas por sprint por persona | 80 |
| Horas totales por persona | 240,00 |
| Horas totales equipo | 720,00 |

### Costos

| Concepto | Valor (USD) |
|----------|-------------|
| Costo mensual del equipo | $3.400,00 |
| **Costo total del proyecto** | **$5.100,00** |

---

## 9. DISTRIBUCIÓN DE TRABAJO POR ROL

### Frontend Developer (40% del trabajo)
- HU-001: Encuesta de satisfacción (interfaz)
- HU-002, HU-003, HU-008: Autenticación y registro
- HU-004, HU-005, HU-006, HU-007: Formularios de perfil
- HU-009, HU-010, HU-011: Dashboard y consultas
- HU-012: Interfaz de exportación

**Horas estimadas:** 205 horas

### Backend Developer (40% del trabajo)
- HU-001: API encuesta de satisfacción
- HU-002, HU-003, HU-008: Autenticación y autorización
- HU-004, HU-005, HU-007: APIs de gestión de perfil
- HU-009, HU-010, HU-011: APIs de estadísticas y consultas
- HU-012: Generación de reportes (Excel/PDF)

**Horas estimadas:** 205 horas

### QA / Tester (20% del trabajo)
- Pruebas funcionales de todas las HU
- Pruebas de integración
- Pruebas de seguridad
- Pruebas de usabilidad
- Documentación de bugs y seguimiento

**Horas estimadas:** 103 horas

---

## 10. CRONOGRAMA DE SPRINTS

### Sprint 1 (Semanas 1-2) - 22 SP
- HU-001: Encuesta de satisfacción (5 SP)
- HU-002: Login egresados (3 SP)
- HU-003: Registro usuarios (3 SP)
- HU-004: Datos personales (2 SP)
- HU-006: Visualizar perfil (3 SP)
- HU-008: Login líder (2 SP)
- HU-011: Ver detalle egresado (3 SP)
- **Total:** 21 SP

### Sprint 2 (Semanas 3-4) - 22 SP
- HU-005: Perfil completo (8 SP)
- HU-007: Editar perfil (3 SP)
- HU-009: Dashboard estadísticas (5 SP)
- HU-010: Consultar egresados (5 SP)
- **Total:** 21 SP

### Sprint 3 (Semana 5) - 5 SP
- HU-012: Exportar reportes (5 SP)
- Ajustes finales y pruebas de integración
- **Total:** 5 SP

---

## 11. RESUMEN EJECUTIVO

### Duración del Proyecto
- **5 semanas** (3 sprints de 2 semanas + 1 semana de cierre)
- **1,07 meses aproximadamente**

### Equipo Requerido
- 1 Frontend Developer
- 1 Backend Developer
- 1 QA / Tester

### Costo Total
- **$3.631,82 USD**

### Entregables
- Plataforma web funcional con 12 historias de usuario implementadas
- Base de datos MySQL configurada
- Documentación técnica
- Manual de usuario
- Casos de prueba ejecutados

---

## 12. RIESGOS Y CONTINGENCIAS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retrasos en desarrollo de formulario complejo (HU-005) | Media | Alto | Asignar 2 desarrolladores en paralelo |
| Problemas de integración con exportación PDF/Excel | Media | Medio | Investigación previa de librerías |
| Cambios en requisitos de encuesta | Baja | Medio | Diseño modular y flexible |
| Disponibilidad de servidor MySQL | Baja | Alto | Configuración local + servidor de respaldo |

**Buffer recomendado:** 10% adicional (0,5 semanas) = **5,5 semanas totales**

---

**Elaborado por:** [Tu nombre/grupo]  
**Fecha:** Marzo 2026  
**Universidad Mariana - Especialización en Sistemas Integrados de Gestión**
