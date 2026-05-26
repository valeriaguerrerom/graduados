// ============================================
// ENDPOINTS PARA ROL LÍDER
// Agrega esto ANTES del app.listen() en server.js
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
      `SELECT cedula, nombre, apellido, email, programa, año_graduacion, 
       condicion_laboral, has_completed_profile, ha_completado_encuesta 
       FROM usuarios 
       ORDER BY apellido, nombre`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al listar egresados:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Obtener detalle de un egresado
app.get("/api/leader/egresado/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [cedula]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Egresado no encontrado" });
    }

    const { password, ...egresadoData } = rows[0];
    res.json(egresadoData);
  } catch (error) {
    console.error("Error al obtener egresado:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
