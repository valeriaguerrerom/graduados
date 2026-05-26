import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar multer para subir imágenes (en memoria para convertir a Base64)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"), false);
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

// Estadísticas públicas para la página de inicio
app.get("/api/public/stats", async (req, res) => {
  try {
    const [egresados] = await pool.query("SELECT COUNT(*) as total FROM usuarios");

    // Intentar contar ofertas, eventos y empresas (si las tablas existen)
    let ofertas = 0, eventos = 0, empresas = 0;
    try {
      const [r] = await pool.query("SELECT COUNT(*) as total FROM ofertas_laborales WHERE activa = TRUE");
      ofertas = r[0].total;
    } catch (_) {}
    try {
      const [r] = await pool.query("SELECT COUNT(*) as total FROM eventos WHERE activo = TRUE");
      eventos = r[0].total;
    } catch (_) {}
    try {
      const [r] = await pool.query("SELECT COUNT(*) as total FROM empresas_aliadas WHERE activa = TRUE");
      empresas = r[0].total;
    } catch (_) {}

    res.json({
      totalEgresados: egresados[0].total,
      ofertasLaborales: ofertas,
      eventosAnuales: eventos,
      empresasAliadas: empresas
    });
  } catch (error) {
    console.error("Error en stats públicas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { cedula, password } = req.body;

    if (!cedula || !password) {
      return res
        .status(400)
        .json({ error: "Cédula y contraseña son requeridos" });
    }

    // 1. Buscar primero en tabla lideres (admin/coordinador)
    const [liderRows] = await pool.query("SELECT * FROM lideres WHERE cedula = ?", [cedula]);
    
    if (liderRows.length > 0) {
      const lider = liderRows[0];
      if (password !== lider.password) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      const { password: _, ...liderData } = lider;
      return res.json({ 
        success: true, 
        rol: lider.rol, // 'admin' o 'lider'
        user: liderData 
      });
    }

    // 2. Buscar en tabla usuarios (egresados)
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [
      cedula,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const user = rows[0];

    // Verificar contraseña
    if (password !== user.password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // ⚠️ VERIFICAR SI COMPLETÓ LA ENCUESTA DE SATISFACCIÓN
    if (!user.ha_completado_encuesta) {
      return res.status(403).json({ 
        error: "Debes completar la encuesta de satisfacción antes de iniciar sesión",
        requiresSurvey: true
      });
    }

    // Retornar datos del usuario (sin la contraseña)
    const { password: _, ...userWithoutPassword } = user;
    const userData = {
      ...userWithoutPassword,
      añoGraduacion: user.año_graduacion,
      hasCompletedProfile: Boolean(user.has_completed_profile),
    };

    res.json({ success: true, rol: 'egresado', user: userData });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener perfil de usuario
app.get("/api/user/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [
      cedula,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    // Remover la contraseña antes de enviar
    const { password, ...userWithoutPassword } = user;
    const userData = {
      ...userWithoutPassword,
      añoGraduacion: user.año_graduacion,
      hasCompletedProfile: Boolean(user.has_completed_profile),
    };

    res.json(userData);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Actualizar perfil de usuario
app.put("/api/user/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    console.log("📝 Actualizando perfil para cédula:", cedula);
    console.log("📦 Datos recibidos:", req.body);
    console.log("🔍 aspecto_mejorar específico:", req.body.aspecto_mejorar);

    // Mapeo de campos del frontend a la base de datos
    const fieldMapping = {
      // Datos básicos
      fechaNacimiento: "fecha_nacimiento",
      estadoCivil: "estado_civil",
      direccionCorrespondencia: "direccion_correspondencia",
      
      // Información académica
      añoGraduacion: "año_graduacion",
      fecGrado: "fec_grado",
      
      // Estudios adicionales
      postgradosSalud: "postgrados_salud",
      diplomadosActualizacion: "diplomados_actualizacion",
      cursosSena: "cursos_sena",
      ningunEstudioAdicional: "ningun_estudio_adicional",
      
      // Idiomas
      hablaOtroIdioma: "habla_otro_idioma",
      cualIdioma: "cual_idioma",
      
      // Situación laboral
      condicionLaboral: "condicion_laboral",
      ciudadTrabajo: "ciudad_trabajo",
      tiempoExperiencia: "tiempo_experiencia",
      
      // Primer empleo
      lugarResidenciaPrimerEmpleo: "lugar_residencia_primer_empleo",
      accesoPrimerEmpleo: "acceso_primer_empleo",
      medioObtencionEmpleo: "medio_obtencion_empleo",
      
      // Empleo actual
      laboraActualmenteEn: "labora_actualmente_en",
      ingresoMensual: "ingreso_mensual",
      dificultadConseguirTrabajo: "dificultad_conseguir_trabajo",
      otraDificultad: "otra_dificultad",
      areaDesempeno: "area_desempeno",
      
      // Trayectoria
      cantidadEmpleos: "cantidad_empleos",
      
      // Reconocimientos
      haRecibidoReconocimiento: "ha_recibido_reconocimiento",
      tipoReconocimiento: "tipo_reconocimiento",
      otroReconocimiento: "otro_reconocimiento",
      
      // Redes
      participaRedes: "participa_redes",
      tipoRed: "tipo_red",
      
      // Producción académica
      librosPublicados: "libros_publicados",
      capitulosLibros: "capitulos_libros",
      politicasPublicas: "politicas_publicas",
      ningunaProduccion: "ninguna_produccion",
      
      // Experiencia internacional
      estuvoExteriorEstudio: "estuvo_exterior_estudio",
      paisEstudio: "pais_estudio",
      estuvoExteriorTrabajo: "estuvo_exterior_trabajo",
      paisTrabajo: "pais_trabajo",
      tiempoExteriorTrabajo: "tiempo_exterior_trabajo",
      areaDesempenoExterior: "area_desempeno_exterior",
      otraAreaExterior: "otra_area_exterior",
      
      // Formación futura
      dondeRealizarEstudios: "donde_realizar_estudios",
      cursariaEstudiosUnimar: "cursaria_estudios_unimar",
      tipoFormacionFutura: "tipo_formacion_futura",
      aspectoMejorar: "aspecto_mejorar",
      
      // Campos nuevos
      estudiosAdicionales: "estudios_adicionales",
      otraLabor: "otra_labor",
      otraAreaDesempeno: "otra_area_desempeno",
      otroMedioEmpleo: "otro_medio_empleo",
      otraRed: "otra_red",
      otraProduccion: "otra_produccion",
    };

    // Construir query dinamicamente
    const updates = [];
    const values = [];

    // Campos ENUM que no aceptan string vacio
    const enumFields = ['sexo', 'estado_civil', 'modalidad', 'condicion_laboral', 'tiempo_experiencia',
      'acceso_primer_empleo', 'medio_obtencion_empleo', 'labora_actualmente_en', 'ingreso_mensual',
      'dificultad_conseguir_trabajo', 'area_desempeno', 'cantidad_empleos', 'tipo_reconocimiento',
      'participa_redes', 'tipo_red', 'tiempo_exterior_trabajo', 'area_desempeno_exterior',
      'donde_realizar_estudios', 'cursaria_estudios_unimar', 'tipo_formacion_futura'];

    Object.keys(req.body).forEach((key) => {
      if (key !== "cedula" && key !== "password" && req.body[key] !== undefined && req.body[key] !== null) {
        let value = req.body[key];
        const dbField = fieldMapping[key] || key;
        
        // Convertir string vacio a null para campos ENUM
        if (value === '' && enumFields.includes(dbField)) {
          value = null;
        }
        
        updates.push(`${dbField} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    updates.push("has_completed_profile = TRUE");
    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(cedula);

    const query = `UPDATE usuarios SET ${updates.join(", ")} WHERE cedula = ?`;
    console.log("🔧 Query generado:", query);
    console.log("📊 Valores:", values);

    // Actualizar usuario
    const [result] = await pool.query(query, values);
    console.log("✅ Filas afectadas:", result.affectedRows);

    // Obtener usuario actualizado
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [
      cedula,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    // Remover la contraseña antes de enviar
    const { password, ...userWithoutPassword } = user;
    const userData = {
      ...userWithoutPassword,
      añoGraduacion: user.año_graduacion,
      hasCompletedProfile: Boolean(user.has_completed_profile),
    };

    res.json({ success: true, user: userData });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    console.error("📋 Datos recibidos:", req.body);
    console.error("🔍 Error completo:", error.message);
    res.status(500).json({ 
      error: "Error en el servidor", 
      details: error.message,
      sqlMessage: error.sqlMessage || "No SQL error"
    });
  }
});

// Listar todos los usuarios (para administración)
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, cedula, nombre, apellido, email, programa, año_graduacion, has_completed_profile, created_at FROM usuarios ORDER BY apellido, nombre"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Verificar si un usuario ya completó la encuesta
app.get("/api/encuesta-satisfaccion/verificar/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;

    // Verificar que el usuario existe
    const [userRows] = await pool.query("SELECT cedula, ha_completado_encuesta FROM usuarios WHERE cedula = ?", [cedula]);
    if (userRows.length === 0) {
      return res.json({ noExiste: true, yaCompletada: false });
    }

    const yaCompletada = Boolean(userRows[0].ha_completado_encuesta);
    res.json({ noExiste: false, yaCompletada });
  } catch (error) {
    console.error("Error al verificar encuesta:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Guardar encuesta de satisfacción
app.post("/api/encuesta-satisfaccion", async (req, res) => {
  try {
    const {
      cedula,
      calidad_academica,
      pertinencia_contenidos,
      nivel_docentes,
      aplicabilidad_conocimientos,
      acompanamiento_institucional,
      cumplimiento_expectativas,
      satisfaccion_general,
      aspecto_mas_valorado,
      aspecto_mejorar,
      recomendaria
    } = req.body;

    console.log("📝 Guardando encuesta para cédula:", cedula);

    // Verificar que el usuario existe
    const [userRows] = await pool.query(
      "SELECT cedula FROM usuarios WHERE cedula = ?",
      [cedula]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        message: "No se encontró un usuario con esa cédula. Verifica que seas egresado registrado." 
      });
    }

    // Verificar si ya completó la encuesta
    const [existingRows] = await pool.query(
      "SELECT id FROM encuestas_satisfaccion WHERE cedula = ?",
      [cedula]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({ 
        message: "Ya has completado la encuesta de satisfacción." 
      });
    }

    // Insertar encuesta
    await pool.query(
      `INSERT INTO encuestas_satisfaccion (
        cedula, calidad_academica, pertinencia_contenidos, nivel_docentes,
        aplicabilidad_conocimientos, acompanamiento_institucional, 
        cumplimiento_expectativas, satisfaccion_general,
        aspecto_mas_valorado, aspecto_mejorar, recomendaria
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cedula, calidad_academica, pertinencia_contenidos, nivel_docentes,
        aplicabilidad_conocimientos, acompanamiento_institucional,
        cumplimiento_expectativas, satisfaccion_general,
        aspecto_mas_valorado, aspecto_mejorar, recomendaria
      ]
    );

    // Actualizar usuario
    await pool.query(
      "UPDATE usuarios SET ha_completado_encuesta = TRUE WHERE cedula = ?",
      [cedula]
    );

    console.log("✅ Encuesta guardada exitosamente");

    res.json({ 
      success: true, 
      message: "Encuesta guardada exitosamente" 
    });
  } catch (error) {
    console.error("❌ Error al guardar encuesta:", error);
    res.status(500).json({ message: "Error al guardar la encuesta" });
  }
});

// ============================================
// ENDPOINTS PARA ADMIN (CRUD)
// ============================================

// Login admin (usa misma tabla lideres con rol admin)
app.post("/api/admin/login", async (req, res) => {
  try {
    const { cedula, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM lideres WHERE cedula = ? AND rol = 'admin'", [cedula]);
    if (rows.length === 0) return res.status(401).json({ error: "Credenciales incorrectas" });
    if (password !== rows[0].password) return res.status(401).json({ error: "Credenciales incorrectas" });
    const { password: _, ...admin } = rows[0];
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// CRUD Usuarios
app.post("/api/admin/usuarios", async (req, res) => {
  try {
    const { cedula, password, nombre, apellido, email, telefono } = req.body;
    if (!cedula || !nombre || !apellido) return res.status(400).json({ message: "Cedula, nombre y apellido son obligatorios" });
    await pool.query("INSERT INTO usuarios (cedula, password, nombre, apellido, email, telefono) VALUES (?, ?, ?, ?, ?, ?)",
      [cedula, password || cedula, nombre, apellido, email || null, telefono || null]);
    res.status(201).json({ success: true, message: "Usuario creado" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Ya existe un usuario con esa cedula" });
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.put("/api/admin/usuarios/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    const fields = req.body;
    delete fields.cedula;
    const updates = Object.keys(fields).map(k => `${k} = ?`);
    const values = Object.values(fields);
    if (updates.length === 0) return res.status(400).json({ message: "No hay datos para actualizar" });
    values.push(cedula);
    await pool.query(`UPDATE usuarios SET ${updates.join(', ')} WHERE cedula = ?`, values);
    res.json({ success: true, message: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", details: error.message });
  }
});

app.delete("/api/admin/usuarios/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    await pool.query("DELETE FROM encuestas_satisfaccion WHERE cedula = ?", [cedula]);
    await pool.query("DELETE FROM tablero_networking WHERE cedula = ?", [cedula]);
    await pool.query("DELETE FROM usuarios WHERE cedula = ?", [cedula]);
    res.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// CRUD Ofertas Laborales
app.get("/api/ofertas", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ofertas_laborales WHERE activa = TRUE ORDER BY fijada DESC, created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

app.get("/api/admin/ofertas", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ofertas_laborales ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

app.post("/api/admin/ofertas", async (req, res) => {
  try {
    const { titulo, empresa, ubicacion, tipo, salario, descripcion, requisitos, contacto, contacto_tipo, imagen_url, oferta_tipo, fijada } = req.body;
    await pool.query(
      "INSERT INTO ofertas_laborales (titulo, empresa, ubicacion, tipo, salario, descripcion, requisitos, contacto, contacto_tipo, imagen_url, oferta_tipo, fijada) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [titulo, empresa, ubicacion, tipo, salario, descripcion, requisitos, contacto, contacto_tipo || 'email', imagen_url, oferta_tipo || 'texto', fijada || false]
    );
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

app.put("/api/admin/ofertas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body; delete fields.id;
    const updates = Object.keys(fields).map(k => `${k} = ?`);
    const values = [...Object.values(fields), id];
    await pool.query(`UPDATE ofertas_laborales SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

app.delete("/api/admin/ofertas/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM ofertas_laborales WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

// CRUD Eventos
app.get("/api/eventos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM eventos WHERE activo = TRUE ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

app.get("/api/admin/eventos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM eventos ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

app.post("/api/admin/eventos", async (req, res) => {
  try {
    const { titulo, descripcion, tipo, tipo_color, fecha, duracion, modalidad, certificado, costo, imagen_url, enlace_inscripcion } = req.body;
    await pool.query(
      "INSERT INTO eventos (titulo, descripcion, tipo, tipo_color, fecha, duracion, modalidad, certificado, costo, imagen_url, enlace_inscripcion) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [titulo, descripcion, tipo, tipo_color || 'bg-blue-100 text-blue-800', fecha, duracion, modalidad, certificado, costo, imagen_url, enlace_inscripcion || null]
    );
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

app.put("/api/admin/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body; delete fields.id;
    const updates = Object.keys(fields).map(k => `${k} = ?`);
    const values = [...Object.values(fields), id];
    await pool.query(`UPDATE eventos SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

app.delete("/api/admin/eventos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM eventos WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

// Listar todas las encuestas de satisfaccion
app.get("/api/admin/encuestas", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM encuestas_satisfaccion ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error al listar encuestas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Resetear encuesta de un usuario
app.post("/api/admin/reset-encuesta/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    await pool.query("DELETE FROM encuestas_satisfaccion WHERE cedula = ?", [cedula]);
    await pool.query("UPDATE usuarios SET ha_completado_encuesta = FALSE WHERE cedula = ?", [cedula]);
    res.json({ success: true, message: "Encuesta reseteada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Resetear perfil de un usuario
app.post("/api/admin/reset-perfil/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    await pool.query(`UPDATE usuarios SET 
      has_completed_profile = FALSE,
      telefono = NULL, email = NULL,
      fecha_nacimiento = NULL, sexo = NULL, estado_civil = NULL,
      pais = NULL, departamento = NULL, municipio = NULL, direccion_correspondencia = NULL,
      programa = NULL, año_graduacion = NULL, fec_grado = NULL, modalidad = NULL,
      postgrados_salud = FALSE, diplomados_actualizacion = FALSE, cursos_sena = FALSE, 
      ningun_estudio_adicional = FALSE, estudios_adicionales = NULL,
      habla_otro_idioma = FALSE, cual_idioma = NULL,
      condicion_laboral = NULL, ciudad_trabajo = NULL, tiempo_experiencia = NULL,
      lugar_residencia_primer_empleo = NULL, acceso_primer_empleo = NULL, 
      medio_obtencion_empleo = NULL, otro_medio_empleo = NULL,
      labora_actualmente_en = NULL, otra_labor = NULL, ingreso_mensual = NULL,
      dificultad_conseguir_trabajo = NULL, otra_dificultad = NULL, 
      area_desempeno = NULL, otra_area_desempeno = NULL,
      cantidad_empleos = NULL,
      ha_recibido_reconocimiento = FALSE, tipo_reconocimiento = NULL, otro_reconocimiento = NULL,
      participa_redes = NULL, tipo_red = NULL, otra_red = NULL,
      libros_publicados = FALSE, capitulos_libros = FALSE, patentes = FALSE, 
      politicas_publicas = FALSE, ninguna_produccion = FALSE, otra_produccion = NULL,
      estuvo_exterior_estudio = FALSE, pais_estudio = NULL,
      estuvo_exterior_trabajo = FALSE, pais_trabajo = NULL, tiempo_exterior_trabajo = NULL,
      area_desempeno_exterior = NULL, otra_area_exterior = NULL,
      donde_realizar_estudios = NULL, cursaria_estudios_unimar = NULL, tipo_formacion_futura = NULL
      WHERE cedula = ?`, [cedula]);
    res.json({ success: true, message: "Perfil reseteado completamente" });
  } catch (error) {
    console.error("Error al resetear perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ============================================
// ENDPOINTS PARA EMPLEOS Y EVENTOS (CRUD)
// ============================================

// Listar empleos activos (publico)
app.get("/api/empleos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ofertas_empleo WHERE activa = TRUE ORDER BY fijada DESC, created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

// CRUD empleos (admin)
app.post("/api/admin/empleos", async (req, res) => {
  try {
    const { titulo, empresa, ubicacion, tipo, salario, descripcion, contacto, contacto_tipo, imagen_url, es_imagen, fijada } = req.body;
    await pool.query("INSERT INTO ofertas_empleo (titulo, empresa, ubicacion, tipo, salario, descripcion, contacto, contacto_tipo, imagen_url, es_imagen, fijada) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [titulo, empresa, ubicacion, tipo, salario, descripcion, contacto, contacto_tipo || 'email', imagen_url, es_imagen || false, fijada || false]);
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error al crear empleo" }); }
});

app.put("/api/admin/empleos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body; delete fields.id;
    const updates = Object.keys(fields).map(k => `${k} = ?`);
    const values = [...Object.values(fields), id];
    await pool.query(`UPDATE ofertas_empleo SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error al actualizar" }); }
});

app.delete("/api/admin/empleos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM ofertas_empleo WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error al eliminar" }); }
});

// ============================================
// ENDPOINTS PARA TABLERO DE NETWORKING
// ============================================

// Obtener todas las tarjetas del tablero
app.get("/api/networking", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.id, t.cedula, t.rol_profesional, t.que_ofrece, t.que_necesita, t.created_at,
              u.nombre, u.apellido, u.email, u.programa, u.foto_url
       FROM tablero_networking t
       JOIN usuarios u ON t.cedula = u.cedula
       WHERE t.activo = TRUE
       ORDER BY t.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener tablero:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Crear o actualizar tarjeta de networking
app.post("/api/networking", async (req, res) => {
  try {
    const { cedula, rol_profesional, que_ofrece, que_necesita } = req.body;

    if (!cedula || !rol_profesional || !que_ofrece || !que_necesita) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si ya tiene una tarjeta
    const [existing] = await pool.query(
      "SELECT id FROM tablero_networking WHERE cedula = ?", [cedula]
    );

    if (existing.length > 0) {
      // Actualizar
      await pool.query(
        `UPDATE tablero_networking SET rol_profesional = ?, que_ofrece = ?, que_necesita = ?, activo = TRUE, updated_at = CURRENT_TIMESTAMP
         WHERE cedula = ?`,
        [rol_profesional, que_ofrece, que_necesita, cedula]
      );
    } else {
      // Crear nueva
      await pool.query(
        `INSERT INTO tablero_networking (cedula, rol_profesional, que_ofrece, que_necesita) VALUES (?, ?, ?, ?)`,
        [cedula, rol_profesional, que_ofrece, que_necesita]
      );
    }

    res.json({ success: true, message: "Tarjeta publicada exitosamente" });
  } catch (error) {
    console.error("Error al guardar tarjeta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Eliminar tarjeta propia
app.delete("/api/networking/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    await pool.query("UPDATE tablero_networking SET activo = FALSE WHERE cedula = ?", [cedula]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar tarjeta:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Eliminar tarjeta (admin)
app.delete("/api/admin/networking/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM tablero_networking WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

// Listar todas las tarjetas de networking (admin)
app.get("/api/admin/networking", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*, u.nombre, u.apellido, u.email 
       FROM tablero_networking t JOIN usuarios u ON t.cedula = u.cedula 
       ORDER BY t.created_at DESC`
    );
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

// ============================================
// ENDPOINTS PARA RECURSOS (clicks/descargas)
// ============================================

// Registrar click en un recurso
app.post("/api/recursos/click", async (req, res) => {
  try {
    const { recurso_id, tipo } = req.body;
    // tipo: 'descarga' o 'enlace'
    if (!recurso_id || !tipo) {
      return res.status(400).json({ error: "recurso_id y tipo son requeridos" });
    }

    await pool.query(
      "INSERT INTO recursos_clicks (recurso_id, tipo) VALUES (?, ?)",
      [recurso_id, tipo]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error al registrar click:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener estadísticas de clicks para el dashboard
app.get("/api/leader/recursos-stats", async (req, res) => {
  try {
    const [porRecurso] = await pool.query(
      `SELECT recurso_id, tipo, COUNT(*) as total 
       FROM recursos_clicks 
       GROUP BY recurso_id, tipo 
       ORDER BY total DESC`
    );

    const [totales] = await pool.query(
      `SELECT tipo, COUNT(*) as total FROM recursos_clicks GROUP BY tipo`
    );

    res.json({ porRecurso, totales });
  } catch (error) {
    console.error("Error al obtener stats de recursos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ============================================
// ENDPOINTS PARA ROL LÍDER
// ============================================

// Login de líder
app.post("/api/leader/login", async (req, res) => {
  try {
    const { cedula, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM lideres WHERE cedula = ?", [cedula]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const leader = rows[0];

    if (password !== leader.password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const { password: _, ...leaderWithoutPassword } = leader;
    res.json({ success: true, leader: leaderWithoutPassword });
  } catch (error) {
    console.error("Error en login de líder:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener datos completos para gráficas del dashboard
app.get("/api/leader/charts", async (req, res) => {
  try {
    // Distribución por condición laboral
    const [laboralRows] = await pool.query(
      `SELECT COALESCE(condicion_laboral, 'Sin especificar') as nombre, COUNT(*) as cantidad 
       FROM usuarios GROUP BY condicion_laboral`
    );

    // Distribución por año de graduación
    const [anioRows] = await pool.query(
      `SELECT COALESCE(año_graduacion, 'N/A') as anio, COUNT(*) as cantidad 
       FROM usuarios GROUP BY año_graduacion ORDER BY año_graduacion`
    );

    // Promedios de satisfacción por categoría
    const [satisfaccionRows] = await pool.query(
      `SELECT 
         ROUND(AVG(calidad_academica), 1) as calidad_academica,
         ROUND(AVG(pertinencia_contenidos), 1) as pertinencia_contenidos,
         ROUND(AVG(nivel_docentes), 1) as nivel_docentes,
         ROUND(AVG(aplicabilidad_conocimientos), 1) as aplicabilidad_conocimientos,
         ROUND(AVG(acompanamiento_institucional), 1) as acompanamiento_institucional,
         ROUND(AVG(cumplimiento_expectativas), 1) as cumplimiento_expectativas,
         ROUND(AVG(satisfaccion_general), 1) as satisfaccion_general
       FROM encuestas_satisfaccion`
    );

    const satisfaccion = satisfaccionRows[0] || {};
    const satisfaccionData = [
      { nombre: 'Calidad Académica', valor: satisfaccion.calidad_academica || 0 },
      { nombre: 'Pertinencia', valor: satisfaccion.pertinencia_contenidos || 0 },
      { nombre: 'Docentes', valor: satisfaccion.nivel_docentes || 0 },
      { nombre: 'Aplicabilidad', valor: satisfaccion.aplicabilidad_conocimientos || 0 },
      { nombre: 'Acompañamiento', valor: satisfaccion.acompanamiento_institucional || 0 },
      { nombre: 'Expectativas', valor: satisfaccion.cumplimiento_expectativas || 0 },
      { nombre: 'General', valor: satisfaccion.satisfaccion_general || 0 },
    ];

    // Distribución por ingreso mensual
    const [ingresoRows] = await pool.query(
      `SELECT COALESCE(ingreso_mensual, 'Sin especificar') as nombre, COUNT(*) as cantidad 
       FROM usuarios WHERE ingreso_mensual IS NOT NULL AND ingreso_mensual != '' 
       GROUP BY ingreso_mensual`
    );

    // Distribución por tiempo de experiencia
    const [experienciaRows] = await pool.query(
      `SELECT COALESCE(tiempo_experiencia, 'Sin especificar') as nombre, COUNT(*) as cantidad 
       FROM usuarios WHERE tiempo_experiencia IS NOT NULL AND tiempo_experiencia != '' 
       GROUP BY tiempo_experiencia`
    );

    // Distribución por sexo
    const [sexoRows] = await pool.query(
      `SELECT COALESCE(sexo, 'Sin especificar') as nombre, COUNT(*) as cantidad 
       FROM usuarios GROUP BY sexo`
    );

    // Distribución por modalidad
    const [modalidadRows] = await pool.query(
      `SELECT COALESCE(modalidad, 'Sin especificar') as nombre, COUNT(*) as cantidad 
       FROM usuarios WHERE modalidad IS NOT NULL AND modalidad != '' 
       GROUP BY modalidad`
    );

    // Recomendaría la universidad
    const [recomendariaRows] = await pool.query(
      `SELECT COALESCE(recomendaria, 'Sin respuesta') as nombre, COUNT(*) as cantidad 
       FROM encuestas_satisfaccion GROUP BY recomendaria`
    );

    // Perfiles completados vs pendientes
    const [perfilRows] = await pool.query(
      `SELECT 
         SUM(CASE WHEN has_completed_profile = TRUE THEN 1 ELSE 0 END) as completados,
         SUM(CASE WHEN has_completed_profile = FALSE OR has_completed_profile IS NULL THEN 1 ELSE 0 END) as pendientes
       FROM usuarios`
    );

    res.json({
      condicionLaboral: laboralRows,
      graduacionPorAnio: anioRows,
      satisfaccion: satisfaccionData,
      ingresoMensual: ingresoRows,
      experiencia: experienciaRows,
      sexo: sexoRows,
      modalidad: modalidadRows,
      recomendaria: recomendariaRows,
      perfilStatus: [
        { nombre: 'Completados', cantidad: perfilRows[0]?.completados || 0 },
        { nombre: 'Pendientes', cantidad: perfilRows[0]?.pendientes || 0 },
      ]
    });
  } catch (error) {
    console.error("Error al obtener datos de gráficas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener estadísticas del dashboard
app.get("/api/leader/stats", async (req, res) => {
  try {
    // Total de egresados
    const [totalResult] = await pool.query("SELECT COUNT(*) as total FROM usuarios");
    const totalEgresados = totalResult[0].total;

    // Perfiles completados
    const [perfilesResult] = await pool.query(
      "SELECT COUNT(*) as total FROM usuarios WHERE has_completed_profile = TRUE"
    );
    const perfilesCompletados = perfilesResult[0].total;

    // Encuestas completadas
    const [encuestasResult] = await pool.query(
      "SELECT COUNT(*) as total FROM usuarios WHERE ha_completado_encuesta = TRUE"
    );
    const encuestasCompletadas = encuestasResult[0].total;

    // Promedio de satisfacción
    const [promedioResult] = await pool.query(
      "SELECT AVG(satisfaccion_general) as promedio FROM encuestas_satisfaccion"
    );
    const promedioSatisfaccion = promedioResult[0].promedio || 0;

    res.json({
      totalEgresados,
      perfilesCompletados,
      encuestasCompletadas,
      promedioSatisfaccion: parseFloat(promedioSatisfaccion)
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener lista de egresados
app.get("/api/leader/egresados", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT cedula, nombre, apellido, email, telefono, programa, año_graduacion, 
       condicion_laboral, has_completed_profile, ha_completado_encuesta, foto_url 
       FROM usuarios 
       ORDER BY apellido, nombre`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al listar egresados:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener detalle completo de un egresado (perfil + encuesta)
app.get("/api/leader/egresado/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [cedula]);
    if (rows.length === 0) return res.status(404).json({ error: "Egresado no encontrado" });
    const { password, ...egresadoData } = rows[0];
    
    // Obtener encuesta de satisfaccion
    const [encRows] = await pool.query("SELECT * FROM encuestas_satisfaccion WHERE cedula = ?", [cedula]);
    const encuesta = encRows.length > 0 ? encRows[0] : null;
    
    res.json({ ...egresadoData, encuesta_satisfaccion: encuesta });
  } catch (error) {
    console.error("Error al obtener egresado:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener TODOS los egresados con TODA su info para reportes
app.get("/api/leader/egresados-completo", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.*, e.calidad_academica, e.pertinencia_contenidos, e.nivel_docentes,
              e.aplicabilidad_conocimientos, e.acompanamiento_institucional, e.cumplimiento_expectativas,
              e.satisfaccion_general, e.aspecto_mas_valorado, e.aspecto_mejorar as enc_aspecto_mejorar, e.recomendaria
       FROM usuarios u
       LEFT JOIN encuestas_satisfaccion e ON u.cedula = e.cedula
       ORDER BY u.apellido, u.nombre`
    );
    res.json(rows.map(r => { const { password, ...data } = r; return data; }));
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Resetear clicks de recursos
app.delete("/api/leader/reset-clicks", async (req, res) => {
  try {
    await pool.query("DELETE FROM recursos_clicks");
    res.json({ success: true, message: "Clicks reseteados" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ============================================
// ENDPOINTS PARA DIRECTORIO (HU018 y HU019)
// ============================================

// ============================================
// ENDPOINTS PARA RECURSOS PROFESIONALES
// ============================================

// Listar recursos activos (público para egresados)
app.get("/api/recursos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recursos WHERE activo = TRUE ORDER BY categoria, titulo");
    res.json(rows);
  } catch (error) {
    res.json([]);
  }
});

// Admin: listar todos los recursos
app.get("/api/admin/recursos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recursos ORDER BY categoria, titulo");
    res.json(rows);
  } catch (error) { res.json([]); }
});

// Admin: crear recurso
app.post("/api/admin/recursos", async (req, res) => {
  try {
    const { titulo, descripcion, categoria, tipo, url, imagen_url } = req.body;
    if (!titulo || !url) return res.status(400).json({ message: "Título y URL son obligatorios" });
    await pool.query(
      "INSERT INTO recursos (titulo, descripcion, categoria, tipo, url, imagen_url) VALUES (?,?,?,?,?,?)",
      [titulo, descripcion, categoria || 'General', tipo || 'enlace', url, imagen_url || null]
    );
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// Admin: editar recurso
app.put("/api/admin/recursos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, tipo, url, imagen_url, activo } = req.body;
    await pool.query(
      "UPDATE recursos SET titulo=?, descripcion=?, categoria=?, tipo=?, url=?, imagen_url=?, activo=? WHERE id=?",
      [titulo, descripcion, categoria, tipo, url, imagen_url, activo !== undefined ? activo : true, id]
    );
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// Admin: eliminar recurso
app.delete("/api/admin/recursos/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM recursos WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// ============================================
// ENDPOINTS PARA TESTIMONIOS/VIDEOS
// ============================================

// Listar testimonios activos (público)
app.get("/api/testimonios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonios WHERE activo = TRUE ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    // Si la tabla no existe, devolver array vacío
    res.json([]);
  }
});

// Admin: listar todos los testimonios
app.get("/api/admin/testimonios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonios ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) { res.status(500).json({ error: "Error en el servidor" }); }
});

// Admin: crear testimonio
app.post("/api/admin/testimonios", async (req, res) => {
  try {
    const { titulo, descripcion, youtube_url, nombre_egresado, cargo } = req.body;
    if (!titulo || !youtube_url) return res.status(400).json({ message: "Título y URL de YouTube son obligatorios" });
    await pool.query(
      "INSERT INTO testimonios (titulo, descripcion, youtube_url, nombre_egresado, cargo) VALUES (?,?,?,?,?)",
      [titulo, descripcion, youtube_url, nombre_egresado, cargo]
    );
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// Admin: editar testimonio
app.put("/api/admin/testimonios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, youtube_url, nombre_egresado, cargo, activo } = req.body;
    await pool.query(
      "UPDATE testimonios SET titulo=?, descripcion=?, youtube_url=?, nombre_egresado=?, cargo=?, activo=? WHERE id=?",
      [titulo, descripcion, youtube_url, nombre_egresado, cargo, activo !== undefined ? activo : true, id]
    );
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// Admin: eliminar testimonio
app.delete("/api/admin/testimonios/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM testimonios WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) { res.status(500).json({ message: "Error en el servidor" }); }
});

// ============================================
// ENDPOINT PARA SUBIR IMÁGENES (Base64 en BD)
// ============================================

app.post("/api/upload", upload.single("imagen"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }
    // Convertir a Base64 data URL
    const base64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const dataUrl = `data:${mimeType};base64,${base64}`;
    res.json({ success: true, url: dataUrl });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
});

// ============================================
// ENDPOINTS PARA ENCUESTAS INSTITUCIONALES (HU017)
// ============================================

// Listar encuestas institucionales activas
app.get("/api/encuestas-institucionales", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, titulo, descripcion, tiempo_estimado, activa FROM encuestas_institucionales WHERE activa = TRUE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al listar encuestas institucionales:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Verificar si un egresado ya respondió una encuesta institucional
app.get("/api/encuestas-institucionales/:id/verificar/:cedula", async (req, res) => {
  try {
    const { id, cedula } = req.params;
    const [rows] = await pool.query(
      "SELECT id FROM respuestas_encuestas_institucionales WHERE encuesta_id = ? AND cedula = ?",
      [id, cedula]
    );
    res.json({ yaRespondio: rows.length > 0 });
  } catch (error) {
    console.error("Error al verificar respuesta:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Responder una encuesta institucional
app.post("/api/encuestas-institucionales/:id/responder", async (req, res) => {
  try {
    const { id } = req.params;
    const { cedula, respuestas } = req.body;

    if (!cedula || !respuestas) {
      return res.status(400).json({ message: "Cédula y respuestas son obligatorios" });
    }

    // Verificar que la encuesta existe y está activa
    const [encuesta] = await pool.query(
      "SELECT id FROM encuestas_institucionales WHERE id = ? AND activa = TRUE", [id]
    );
    if (encuesta.length === 0) {
      return res.status(404).json({ message: "Encuesta no encontrada o inactiva" });
    }

    // Verificar que no haya respondido ya
    const [existing] = await pool.query(
      "SELECT id FROM respuestas_encuestas_institucionales WHERE encuesta_id = ? AND cedula = ?",
      [id, cedula]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Ya has respondido esta encuesta" });
    }

    // Guardar respuesta
    await pool.query(
      "INSERT INTO respuestas_encuestas_institucionales (encuesta_id, cedula, respuestas) VALUES (?, ?, ?)",
      [id, cedula, JSON.stringify(respuestas)]
    );

    res.json({ success: true, message: "Respuesta guardada exitosamente" });
  } catch (error) {
    console.error("Error al guardar respuesta institucional:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Admin: listar todas las encuestas institucionales con conteo de respuestas
app.get("/api/admin/encuestas-institucionales", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ei.*, COUNT(rei.id) as total_respuestas
       FROM encuestas_institucionales ei
       LEFT JOIN respuestas_encuestas_institucionales rei ON ei.id = rei.encuesta_id
       GROUP BY ei.id
       ORDER BY ei.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al listar encuestas institucionales (admin):", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Admin: crear encuesta institucional
app.post("/api/admin/encuestas-institucionales", async (req, res) => {
  try {
    const { titulo, descripcion, tiempo_estimado } = req.body;
    if (!titulo) return res.status(400).json({ message: "El título es obligatorio" });
    await pool.query(
      "INSERT INTO encuestas_institucionales (titulo, descripcion, tiempo_estimado) VALUES (?, ?, ?)",
      [titulo, descripcion || null, tiempo_estimado || null]
    );
    res.status(201).json({ success: true, message: "Encuesta creada" });
  } catch (error) {
    console.error("Error al crear encuesta institucional:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Admin: editar encuesta institucional
app.put("/api/admin/encuestas-institucionales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, tiempo_estimado, activa } = req.body;
    await pool.query(
      "UPDATE encuestas_institucionales SET titulo = ?, descripcion = ?, tiempo_estimado = ?, activa = ? WHERE id = ?",
      [titulo, descripcion, tiempo_estimado, activa !== undefined ? activa : true, id]
    );
    res.json({ success: true, message: "Encuesta actualizada" });
  } catch (error) {
    console.error("Error al actualizar encuesta institucional:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Admin: eliminar encuesta institucional
app.delete("/api/admin/encuestas-institucionales/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM encuestas_institucionales WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Encuesta eliminada" });
  } catch (error) {
    console.error("Error al eliminar encuesta institucional:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Admin/Líder: ver respuestas de una encuesta institucional
app.get("/api/admin/encuestas-institucionales/:id/respuestas", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT r.id, r.cedula, r.respuestas, r.fecha_respuesta, u.nombre, u.apellido, u.email
       FROM respuestas_encuestas_institucionales r
       JOIN usuarios u ON r.cedula = u.cedula
       WHERE r.encuesta_id = ?
       ORDER BY r.fecha_respuesta DESC`,
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener respuestas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Admin: eliminar una respuesta individual
app.delete("/api/admin/encuestas-institucionales/respuesta/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM respuestas_encuestas_institucionales WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Respuesta eliminada" });
  } catch (error) {
    console.error("Error al eliminar respuesta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ============================================
// ENDPOINTS PARA DIRECTORIO (HU018 y HU019)
// ============================================

// Directorio de egresados - búsqueda pública para egresados autenticados
app.get("/api/directorio/egresados", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT cedula, nombre, apellido, email, telefono, programa, año_graduacion,
              condicion_laboral, ciudad_trabajo, labora_actualmente_en, otra_labor, area_desempeno, otra_area_desempeno, foto_url
       FROM usuarios 
       WHERE has_completed_profile = TRUE
       ORDER BY apellido, nombre`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener directorio de egresados:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Directorio de empresas - agrupa egresados por empresa donde laboran
app.get("/api/directorio/empresas", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
              CASE WHEN labora_actualmente_en = 'Otro' AND otra_labor IS NOT NULL AND otra_labor != '' 
                   THEN otra_labor 
                   ELSE labora_actualmente_en 
              END as nombre,
              ciudad_trabajo as ubicacion,
              COUNT(*) as cantidad_egresados,
              GROUP_CONCAT(DISTINCT 
                CASE WHEN area_desempeno = 'Otro' AND otra_area_desempeno IS NOT NULL AND otra_area_desempeno != ''
                     THEN otra_area_desempeno
                     WHEN area_desempeno IS NOT NULL AND area_desempeno != '' AND area_desempeno != 'Otro'
                     THEN area_desempeno
                     ELSE NULL
                END
                SEPARATOR ', '
              ) as areas
       FROM usuarios 
       WHERE labora_actualmente_en IS NOT NULL 
         AND labora_actualmente_en != '' 
         AND has_completed_profile = TRUE
         AND condicion_laboral IN ('Empleado', 'Independiente', 'Empleado e independiente')
       GROUP BY 
         CASE WHEN labora_actualmente_en = 'Otro' AND otra_labor IS NOT NULL AND otra_labor != '' 
              THEN otra_labor 
              ELSE labora_actualmente_en 
         END,
         ciudad_trabajo
       ORDER BY cantidad_egresados DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener directorio de empresas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
});
