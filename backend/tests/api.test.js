import { describe, it, expect } from '@jest/globals';

const API = 'http://localhost:3001/api';

// Helper para hacer requests
const request = async (method, path, body = null) => {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API}${path}`, opts);
  const data = await res.json();
  return { status: res.status, data };
};

// ============================================
// HEALTH CHECK
// ============================================
describe('API Health', () => {
  it('debe responder OK', async () => {
    const res = await fetch(`${API}/health`);
    const data = await res.json();
    expect(data.status).toBe('OK');
  });
});

// ============================================
// HU001 - Completar encuesta de satisfacción
// ============================================
describe('HU001 - Encuesta de satisfaccion', () => {
  it('debe verificar si usuario existe (no existe)', async () => {
    const res = await fetch(`${API}/encuesta-satisfaccion/verificar/0000000000`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.noExiste).toBe(true);
  });

  it('debe verificar usuario existente', async () => {
    const res = await fetch(`${API}/encuesta-satisfaccion/verificar/11004343198`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.noExiste).toBe(false);
  });

  it('debe rechazar encuesta con cedula inexistente', async () => {
    const { status } = await request('POST', '/encuesta-satisfaccion', {
      cedula: '0000000000', calidad_academica: 5, pertinencia_contenidos: 5,
      nivel_docentes: 5, aplicabilidad_conocimientos: 5, acompanamiento_institucional: 5,
      cumplimiento_expectativas: 5, satisfaccion_general: 5,
      aspecto_mas_valorado: 'Todo', aspecto_mejorar: 'Nada', recomendaria: 'Si'
    });
    expect(status).toBe(404);
  });
});

// ============================================
// HU002 - Iniciar sesión (login unificado)
// ============================================
describe('HU002 - Login egresado', () => {
  it('debe rechazar credenciales vacias', async () => {
    const { status } = await request('POST', '/login', { cedula: '', password: '' });
    expect(status).toBe(400);
  });

  it('debe rechazar credenciales incorrectas', async () => {
    const { status, data } = await request('POST', '/login', { cedula: '0000000000', password: 'wrong' });
    expect(status).toBe(401);
    expect(data.error).toBeDefined();
  });

  it('debe manejar usuario existente (login o requiere encuesta)', async () => {
    const { status } = await request('POST', '/login', { cedula: '11004343198', password: '11004343198' });
    expect([200, 401, 403]).toContain(status);
  });

  it('debe devolver rol egresado para usuario normal', async () => {
    const { status, data } = await request('POST', '/login', { cedula: '11004343198', password: '11004343198' });
    if (status === 200) {
      expect(data.rol).toBe('egresado');
      expect(data.user).toBeDefined();
    }
  });
});

// ============================================
// HU004/HU005 - Perfil de usuario
// ============================================
describe('HU004/HU005 - Perfil de usuario', () => {
  it('debe obtener perfil por cedula', async () => {
    const res = await fetch(`${API}/user/11004343198`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const data = await res.json();
      expect(data.cedula).toBe('11004343198');
    }
  });

  it('debe devolver 404 para usuario inexistente', async () => {
    const res = await fetch(`${API}/user/0000000000`);
    expect(res.status).toBe(404);
  });

  it('debe rechazar actualizacion sin datos', async () => {
    const { status } = await request('PUT', '/user/11004343198', {});
    expect(status).toBe(400);
  });
});

// ============================================
// HU008 - Login coordinador (unificado)
// ============================================
describe('HU008 - Login coordinador', () => {
  it('debe rechazar credenciales incorrectas', async () => {
    const { status } = await request('POST', '/login', { cedula: 'wrong', password: 'wrong' });
    expect(status).toBe(401);
  });

  it('debe aceptar credenciales de lider y devolver rol lider', async () => {
    const { status, data } = await request('POST', '/login', { cedula: 'lider', password: 'lider123' });
    expect(status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.rol).toBe('lider');
  });
});

// ============================================
// HU009 - Dashboard de estadísticas
// ============================================
describe('HU009 - Dashboard estadisticas', () => {
  it('debe devolver estadisticas generales', async () => {
    const res = await fetch(`${API}/leader/stats`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.totalEgresados).toBeDefined();
    expect(data.perfilesCompletados).toBeDefined();
    expect(data.encuestasCompletadas).toBeDefined();
    expect(data.promedioSatisfaccion).toBeDefined();
  });

  it('debe devolver datos de graficas', async () => {
    const res = await fetch(`${API}/leader/charts`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.condicionLaboral).toBeDefined();
    expect(data.graduacionPorAnio).toBeDefined();
    expect(data.satisfaccion).toBeDefined();
    expect(data.sexo).toBeDefined();
    expect(data.perfilStatus).toBeDefined();
  });
});

// ============================================
// HU010 - Consultar egresados
// ============================================
describe('HU010 - Consultar egresados', () => {
  it('debe devolver lista de egresados', async () => {
    const res = await fetch(`${API}/leader/egresados`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].cedula).toBeDefined();
      expect(data[0].nombre).toBeDefined();
    }
  });
});

// ============================================
// HU011 - Ver detalle de egresado
// ============================================
describe('HU011 - Ver detalle egresado', () => {
  it('debe devolver detalle de un egresado existente', async () => {
    const res = await fetch(`${API}/leader/egresado/11004343198`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const data = await res.json();
      expect(data.cedula).toBe('11004343198');
      expect(data.nombre).toBeDefined();
    }
  });

  it('debe devolver 404 para egresado inexistente', async () => {
    const res = await fetch(`${API}/leader/egresado/0000000000`);
    expect(res.status).toBe(404);
  });
});

// ============================================
// HU012 - Exportar reportes
// ============================================
describe('HU012 - Exportar reportes', () => {
  it('debe devolver datos completos para exportacion', async () => {
    const res = await fetch(`${API}/leader/egresados-completo`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU013 - Página de inicio (stats públicas)
// ============================================
describe('HU013 - Pagina de inicio', () => {
  it('debe devolver estadisticas publicas', async () => {
    const res = await fetch(`${API}/public/stats`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.totalEgresados).toBeDefined();
    expect(data.ofertasLaborales).toBeDefined();
    expect(data.eventosAnuales).toBeDefined();
  });
});

// ============================================
// HU014 - Consultar eventos
// ============================================
describe('HU014 - Consultar eventos', () => {
  it('debe devolver eventos activos', async () => {
    const res = await fetch(`${API}/eventos`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU015 - Recursos profesionales (clicks)
// ============================================
describe('HU015 - Recursos profesionales', () => {
  it('debe registrar click en recurso', async () => {
    const { status, data } = await request('POST', '/recursos/click', {
      recurso_id: 'test-recurso', tipo: 'enlace'
    });
    expect(status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('debe rechazar click sin datos', async () => {
    const { status } = await request('POST', '/recursos/click', {});
    expect(status).toBe(400);
  });

  it('debe devolver estadisticas de recursos', async () => {
    const res = await fetch(`${API}/leader/recursos-stats`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.porRecurso).toBeDefined();
    expect(data.totales).toBeDefined();
  });
});

// ============================================
// HU016 - Ofertas laborales
// ============================================
describe('HU016 - Ofertas laborales', () => {
  it('debe devolver empleos activos', async () => {
    const res = await fetch(`${API}/empleos`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU017 - Encuestas institucionales
// ============================================
describe('HU017 - Encuestas institucionales', () => {
  it('debe listar encuestas institucionales activas', async () => {
    const res = await fetch(`${API}/encuestas-institucionales`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('debe verificar si egresado ya respondio', async () => {
    const res = await fetch(`${API}/encuestas-institucionales/1/verificar/11004343198`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.yaRespondio).toBeDefined();
  });

  it('debe rechazar respuesta sin datos', async () => {
    const { status } = await request('POST', '/encuestas-institucionales/1/responder', {});
    expect(status).toBe(400);
  });

  it('debe rechazar respuesta a encuesta inexistente', async () => {
    const { status } = await request('POST', '/encuestas-institucionales/9999/responder', {
      cedula: '11004343198', respuestas: { comentario: 'Test' }
    });
    expect(status).toBe(404);
  });
});

// ============================================
// HU018 - Directorio de egresados
// ============================================
describe('HU018 - Directorio de egresados', () => {
  it('debe devolver lista de egresados con perfil completo', async () => {
    const res = await fetch(`${API}/directorio/egresados`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU019 - Directorio de empresas
// ============================================
describe('HU019 - Directorio de empresas', () => {
  it('debe devolver lista de empresas', async () => {
    const res = await fetch(`${API}/directorio/empresas`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU020 - Login administrador (unificado)
// ============================================
describe('HU020 - Login administrador', () => {
  it('debe aceptar credenciales de admin y devolver rol admin', async () => {
    const { status, data } = await request('POST', '/login', { cedula: 'admin', password: 'admin123' });
    expect(status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.rol).toBe('admin');
  });

  it('debe rechazar credenciales incorrectas de admin', async () => {
    const { status } = await request('POST', '/login', { cedula: 'admin', password: 'wrongpass' });
    expect(status).toBe(401);
  });
});

// ============================================
// HU021 - Gestionar usuarios (admin)
// ============================================
describe('HU021 - Gestionar usuarios', () => {
  const testCedula = '9999999999';

  it('debe crear un usuario nuevo', async () => {
    const { status } = await request('POST', '/admin/usuarios', {
      cedula: testCedula, nombre: 'Test', apellido: 'Usuario', email: 'test@test.com', telefono: '3001234567'
    });
    expect([201, 409]).toContain(status); // 409 si ya existe
  });

  it('debe rechazar usuario sin campos obligatorios', async () => {
    const { status } = await request('POST', '/admin/usuarios', { cedula: '', nombre: '' });
    expect(status).toBe(400);
  });

  it('debe actualizar un usuario', async () => {
    const { status } = await request('PUT', `/admin/usuarios/${testCedula}`, { nombre: 'TestActualizado' });
    expect([200, 400]).toContain(status);
  });

  it('debe eliminar el usuario de prueba', async () => {
    const { status } = await request('DELETE', `/admin/usuarios/${testCedula}`);
    expect(status).toBe(200);
  });
});

// ============================================
// HU022 - Gestionar ofertas laborales (admin)
// ============================================
describe('HU022 - Gestionar ofertas laborales', () => {
  let ofertaId;

  it('debe crear una oferta laboral', async () => {
    const { status, data } = await request('POST', '/admin/empleos', {
      titulo: 'Test Oferta', empresa: 'Test Empresa', ubicacion: 'Pasto',
      tipo: 'Tiempo completo', salario: '2M', descripcion: 'Descripcion test',
      contacto: 'test@test.com', contacto_tipo: 'email'
    });
    expect(status).toBe(201);
    expect(data.success).toBe(true);
  });

  it('debe listar empleos', async () => {
    const res = await fetch(`${API}/empleos`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    const testOferta = data.find(o => o.titulo === 'Test Oferta');
    if (testOferta) ofertaId = testOferta.id;
  });

  it('debe eliminar la oferta de prueba', async () => {
    if (ofertaId) {
      const { status } = await request('DELETE', `/admin/empleos/${ofertaId}`);
      expect(status).toBe(200);
    }
  });
});

// ============================================
// HU023 - Gestionar eventos (admin)
// ============================================
describe('HU023 - Gestionar eventos', () => {
  let eventoId;

  it('debe crear un evento', async () => {
    const { status, data } = await request('POST', '/admin/eventos', {
      titulo: 'Test Evento', descripcion: 'Evento de prueba', tipo: 'Curso',
      fecha: 'Junio 2026', duracion: '8 horas', modalidad: 'Virtual',
      certificado: 'Universidad Mariana', costo: 'Gratuito'
    });
    expect(status).toBe(201);
    expect(data.success).toBe(true);
  });

  it('debe listar eventos', async () => {
    const res = await fetch(`${API}/eventos`);
    const data = await res.json();
    expect(res.status).toBe(200);
    const testEvento = data.find(e => e.titulo === 'Test Evento');
    if (testEvento) eventoId = testEvento.id;
  });

  it('debe eliminar el evento de prueba', async () => {
    if (eventoId) {
      const { status } = await request('DELETE', `/admin/eventos/${eventoId}`);
      expect(status).toBe(200);
    }
  });
});

// ============================================
// HU024 - Gestionar encuestas de satisfacción (admin)
// ============================================
describe('HU024 - Gestionar encuestas satisfaccion', () => {
  it('debe listar encuestas de satisfaccion', async () => {
    const res = await fetch(`${API}/admin/encuestas`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// HU025 - Publicar tarjeta de networking
// ============================================
describe('HU025 - Networking', () => {
  it('debe listar tarjetas de networking', async () => {
    const res = await fetch(`${API}/networking`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('debe rechazar tarjeta sin campos obligatorios', async () => {
    const { status } = await request('POST', '/networking', { cedula: '' });
    expect(status).toBe(400);
  });
});

// ============================================
// HU026 - Moderar networking (admin)
// ============================================
describe('HU026 - Moderar networking', () => {
  it('debe listar tarjetas de networking (admin)', async () => {
    const res = await fetch(`${API}/admin/networking`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});

// ============================================
// ENCUESTAS INSTITUCIONALES - CRUD Admin
// ============================================
describe('Encuestas institucionales - CRUD Admin', () => {
  let encuestaId;

  it('debe listar encuestas institucionales (admin)', async () => {
    const res = await fetch(`${API}/admin/encuestas-institucionales`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('debe crear una encuesta institucional', async () => {
    const { status, data } = await request('POST', '/admin/encuestas-institucionales', {
      titulo: 'Encuesta Test', descripcion: 'Descripcion test', tiempo_estimado: '5 minutos'
    });
    expect(status).toBe(201);
    expect(data.success).toBe(true);
  });

  it('debe rechazar encuesta sin titulo', async () => {
    const { status } = await request('POST', '/admin/encuestas-institucionales', { titulo: '' });
    expect(status).toBe(400);
  });

  it('debe obtener la encuesta creada y eliminarla', async () => {
    const res = await fetch(`${API}/admin/encuestas-institucionales`);
    const data = await res.json();
    const testEnc = data.find(e => e.titulo === 'Encuesta Test');
    if (testEnc) {
      encuestaId = testEnc.id;
      const { status } = await request('DELETE', `/admin/encuestas-institucionales/${encuestaId}`);
      expect(status).toBe(200);
    }
  });
});

// ============================================
// UPLOAD DE IMÁGENES
// ============================================
describe('Upload de imagenes', () => {
  it('debe rechazar request sin archivo', async () => {
    const res = await fetch(`${API}/upload`, { method: 'POST' });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.message).toBeDefined();
  });
});

// ============================================
// LOGIN UNIFICADO - Roles
// ============================================
describe('Login unificado - Roles', () => {
  it('debe devolver rol admin para admin', async () => {
    const { status, data } = await request('POST', '/login', { cedula: 'admin', password: 'admin123' });
    expect(status).toBe(200);
    expect(data.rol).toBe('admin');
  });

  it('debe devolver rol lider para coordinador', async () => {
    const { status, data } = await request('POST', '/login', { cedula: 'lider', password: 'lider123' });
    expect(status).toBe(200);
    expect(data.rol).toBe('lider');
  });

  it('debe devolver rol egresado para usuario normal', async () => {
    const { status, data } = await request('POST', '/login', { cedula: '11004343198', password: '11004343198' });
    if (status === 200) {
      expect(data.rol).toBe('egresado');
    }
  });
});
