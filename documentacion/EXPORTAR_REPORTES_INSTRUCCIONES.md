# 📊 INSTRUCCIONES PARA EXPORTAR REPORTES

## ✅ LO QUE YA HICE:

1. ✅ Agregué las funciones de exportación a Excel y PDF
2. ✅ Agregué los botones en el Dashboard
3. ✅ Configuré el formato de los reportes

---

## 📋 LO QUE TIENES QUE HACER:

### **PASO 1: Instalar las librerías necesarias**

Abre una terminal en la carpeta del proyecto y ejecuta:

```cmd
cd graduados-master
npm install xlsx jspdf jspdf-autotable
```

Esto instalará:
- `xlsx` - Para exportar a Excel
- `jspdf` - Para generar PDFs
- `jspdf-autotable` - Para crear tablas en PDF

---

### **PASO 2: Reiniciar el frontend**

1. Detén el servidor frontend si está corriendo (Ctrl+C)
2. Vuelve a iniciarlo:
```cmd
cd graduados-master
npm run dev
```

---

### **PASO 3: Probar la exportación**

1. Ve al Dashboard del líder: `http://localhost:5173/leader/dashboard`
2. Verás 2 botones nuevos:
   - **Exportar Excel** (verde) - Descarga archivo .xlsx
   - **Exportar PDF** (rojo) - Descarga archivo .pdf

---

## 📄 **QUÉ INCLUYEN LOS REPORTES:**

### **Excel (.xlsx):**
- Cédula
- Nombre completo
- Email
- Programa
- Año de graduación
- Estado laboral
- Si completó el perfil
- Si completó la encuesta

### **PDF (.pdf):**
- **Portada con estadísticas:**
  - Total de egresados
  - Perfiles completados (%)
  - Encuestas completadas (%)
  - Satisfacción promedio
- **Tabla de egresados:**
  - Cédula
  - Nombre
  - Año
  - Estado laboral
  - Perfil completado
  - Encuesta completada

---

## 🎨 **CARACTERÍSTICAS:**

- ✅ Los archivos se descargan automáticamente
- ✅ Nombre del archivo incluye la fecha actual
- ✅ Respeta los filtros de búsqueda (si buscas algo, solo exporta esos resultados)
- ✅ Formato profesional y legible
- ✅ Compatible con Excel, Google Sheets, Adobe Reader, etc.

---

## 📝 **NOMBRES DE ARCHIVOS:**

- Excel: `Egresados_ESIG_2026-03-13.xlsx`
- PDF: `Reporte_Egresados_ESIG_2026-03-13.pdf`

---

¡Listo bb! 💙✨
