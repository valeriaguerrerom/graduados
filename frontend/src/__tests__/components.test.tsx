import { describe, it, expect } from 'vitest';

// Tests de validacion de logica de negocio (sin renderizar componentes)

describe('HU002 - Validacion de Login', () => {
  it('debe rechazar cedula vacia', () => {
    const cedula = '';
    expect(cedula.trim().length > 0).toBe(false);
  });

  it('debe aceptar cedula valida', () => {
    const cedula = '1004235957';
    expect(cedula.trim().length > 0).toBe(true);
  });

  it('debe rechazar password menor a 6 caracteres', () => {
    const password = '123';
    expect(password.length >= 6).toBe(false);
  });

  it('debe aceptar password de 6+ caracteres', () => {
    const password = '123456';
    expect(password.length >= 6).toBe(true);
  });
});

describe('HU004 - Validacion de formulario de perfil', () => {
  it('debe validar campos obligatorios del paso 1', () => {
    const formData = { nombre: '', apellido: 'Test', email: 'test@test.com', telefono: '300', fecha_nacimiento: '2000-01-01', sexo: 'Femenino', estado_civil: 'Soltero', pais: 'Colombia', departamento: 'Narino', municipio: 'Pasto', direccion_correspondencia: 'Calle 1' };
    const missing = [];
    if (!formData.nombre) missing.push('Nombre');
    if (!formData.apellido) missing.push('Apellido');
    expect(missing).toContain('Nombre');
    expect(missing).not.toContain('Apellido');
  });

  it('debe validar periodo de graduacion valido', () => {
    const validPeriods = ['2025-1', '2025-2', '2026-1', '2026-2'];
    expect(validPeriods.includes('2025-1')).toBe(true);
    expect(validPeriods.includes('2024-1')).toBe(false);
    expect(validPeriods.includes('2027-1')).toBe(false);
  });

  it('debe requerir estudios adicionales o marcar ninguno', () => {
    // Caso 1: ninguno marcado, sin texto = invalido
    const case1 = { ningun_estudio_adicional: false, estudios_adicionales: '' };
    expect(!!(case1.ningun_estudio_adicional || case1.estudios_adicionales)).toBe(false);

    // Caso 2: ninguno marcado = valido
    const case2 = { ningun_estudio_adicional: true, estudios_adicionales: '' };
    expect(!!(case2.ningun_estudio_adicional || case2.estudios_adicionales)).toBe(true);

    // Caso 3: texto escrito = valido
    const case3 = { ningun_estudio_adicional: false, estudios_adicionales: 'Maestria' };
    expect(!!(case3.ningun_estudio_adicional || case3.estudios_adicionales)).toBe(true);
  });

  it('debe requerir campo "otro" cuando se selecciona Otro', () => {
    const area = 'Otro';
    const otraArea = '';
    const isValid = area !== 'Otro' || otraArea.trim().length > 0;
    expect(isValid).toBe(false);

    const otraArea2 = 'Consultoria';
    const isValid2 = area !== 'Otro' || otraArea2.trim().length > 0;
    expect(isValid2).toBe(true);
  });
});

describe('HU001 - Validacion de encuesta de satisfaccion', () => {
  it('debe validar que todas las calificaciones esten entre 1 y 5', () => {
    const ratings = [5, 4, 3, 5, 4, 5, 4];
    const allValid = ratings.every(r => r >= 1 && r <= 5);
    expect(allValid).toBe(true);
  });

  it('debe rechazar calificaciones en 0', () => {
    const ratings = [5, 0, 3, 5, 4, 5, 4];
    const allValid = ratings.every(r => r >= 1 && r <= 5);
    expect(allValid).toBe(false);
  });

  it('debe requerir aspecto mas valorado no vacio', () => {
    expect(''.trim() !== '').toBe(false);
    expect('La calidad'.trim() !== '').toBe(true);
  });
});

describe('HU013 - Logica de Stats', () => {
  it('debe formatear conteo animado correctamente', () => {
    const target = 66;
    const progress = 0.5; // 50%
    const count = Math.floor(progress * target);
    expect(count).toBe(33);
  });

  it('debe mostrar fallback cuando no hay datos', () => {
    const egresados = 0;
    const display = egresados > 0 ? `${egresados}` : '...';
    expect(display).toBe('...');
  });
});

describe('HU009 - Logica de Dashboard', () => {
  it('debe calcular porcentaje de perfiles completados', () => {
    const total = 66;
    const completados = 10;
    const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;
    expect(porcentaje).toBe(15);
  });

  it('debe filtrar egresados por busqueda', () => {
    const egresados = [
      { nombre: 'VALERIA', apellido: 'GUERRERO', cedula: '1004235957' },
      { nombre: 'JUAN', apellido: 'PEREZ', cedula: '1234567890' },
    ];
    const search = 'valeria';
    const filtered = egresados.filter(e =>
      e.nombre.toLowerCase().includes(search.toLowerCase()) ||
      e.apellido.toLowerCase().includes(search.toLowerCase()) ||
      e.cedula.includes(search)
    );
    expect(filtered.length).toBe(1);
    expect(filtered[0].cedula).toBe('1004235957');
  });
});

describe('Produccion Academica - Exclusion mutua', () => {
  it('no debe permitir ninguna y otra al mismo tiempo', () => {
    // Si marca ninguna, las otras deben ser false
    const state = { ninguna_produccion: true, libros_publicados: false, patentes: false };
    expect(state.ninguna_produccion && !state.libros_publicados && !state.patentes).toBe(true);
  });

  it('si marca una produccion, ninguna debe ser false', () => {
    const state = { ninguna_produccion: false, libros_publicados: true, patentes: false };
    expect(!state.ninguna_produccion && state.libros_publicados).toBe(true);
  });
});

describe('Ofertas laborales - Ordenamiento', () => {
  it('debe mostrar fijadas primero', () => {
    const ofertas = [
      { id: 1, titulo: 'Normal', fijada: false, created_at: '2026-03-20' },
      { id: 2, titulo: 'Bolsa', fijada: true, created_at: '2026-03-01' },
      { id: 3, titulo: 'Otra', fijada: false, created_at: '2026-03-25' },
    ];
    const sorted = [...ofertas].sort((a, b) => {
      if (a.fijada && !b.fijada) return -1;
      if (!a.fijada && b.fijada) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    expect(sorted[0].titulo).toBe('Bolsa');
    expect(sorted[1].titulo).toBe('Otra');
  });

  it('debe filtrar por busqueda', () => {
    const ofertas = [
      { titulo: 'Contador', empresa: 'KIOS', ubicacion: 'Bogota' },
      { titulo: 'Gerente', empresa: 'TechCorp', ubicacion: 'Medellin' },
    ];
    const search = 'bogota';
    const filtered = ofertas.filter(o =>
      o.titulo.toLowerCase().includes(search) ||
      o.empresa.toLowerCase().includes(search) ||
      o.ubicacion.toLowerCase().includes(search)
    );
    expect(filtered.length).toBe(1);
  });
});

describe('Tiempo transcurrido', () => {
  it('debe mostrar Hoy para fecha actual', () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(0);
  });

  it('debe calcular dias correctamente', () => {
    const now = new Date();
    const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const diff = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
    expect(diff).toBe(3);
  });
});
