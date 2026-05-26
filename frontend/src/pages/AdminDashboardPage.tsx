import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../components/navigation/SimpleFooter';
import SimpleHeader from '../components/navigation/SimpleHeader';
import { Users, Plus, Trash2, Edit2, RotateCcw, Search, X, Save, FileText, Briefcase, Calendar, Handshake, Video, FolderOpen } from 'lucide-react';

import { API_URL as API } from '../config';

interface Usuario { cedula: string; nombre: string; apellido: string; email: string; telefono: string; programa: string; año_graduacion: string; condicion_laboral: string; has_completed_profile: boolean; ha_completado_encuesta: boolean; }
interface Encuesta { id: number; cedula: string; calidad_academica: number; pertinencia_contenidos: number; nivel_docentes: number; aplicabilidad_conocimientos: number; acompanamiento_institucional: number; cumplimiento_expectativas: number; satisfaccion_general: number; aspecto_mas_valorado: string; aspecto_mejorar: string; recomendaria: string; }

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'usuarios' | 'empleos' | 'eventos' | 'encuestas' | 'networking' | 'enc_institucionales' | 'testimonios' | 'recursos'>('usuarios');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);
  const [networkingCards, setNetworkingCards] = useState<any[]>([]);
  const [encInstitucionales, setEncInstitucionales] = useState<any[]>([]);
  const [testimonios, setTestimonios] = useState<any[]>([]);
  const [recursosAdmin, setRecursosAdmin] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<Usuario[]>([]);
  const [filteredEnc, setFilteredEnc] = useState<Encuesta[]>([]);
  const [search, setSearch] = useState('');
  const [searchEnc, setSearchEnc] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateOferta, setShowCreateOferta] = useState(false);
  const [showCreateEvento, setShowCreateEvento] = useState(false);
  const [showCreateEncInst, setShowCreateEncInst] = useState(false);
  const [showCreateTestimonio, setShowCreateTestimonio] = useState(false);
  const [showCreateRecurso, setShowCreateRecurso] = useState(false);
  const [editRecurso, setEditRecurso] = useState<any>(null);
  const [recursoForm, setRecursoForm] = useState({ titulo: '', descripcion: '', categoria: 'General', tipo: 'enlace', url: '', imagen_url: '' });
  const [editTestimonio, setEditTestimonio] = useState<any>(null);
  const [testimonioForm, setTestimonioForm] = useState({ titulo: '', descripcion: '', youtube_url: '', nombre_egresado: '', cargo: '' });
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [form, setForm] = useState({ cedula: '', nombre: '', apellido: '', email: '', telefono: '', password: '' });
  const [ofertaForm, setOfertaForm] = useState({ titulo: '', empresa: '', ubicacion: '', tipo: 'Tiempo completo', salario: '', descripcion: '', requisitos: '', contacto: '', contacto_tipo: 'email', imagen_url: '', oferta_tipo: 'texto' });
  const [eventoForm, setEventoForm] = useState({ titulo: '', descripcion: '', tipo: 'Evento', fecha: '', duracion: '', modalidad: '', certificado: 'Universidad Mariana', costo: 'Por confirmar', imagen_url: '', enlace_inscripcion: '' });
  const [encInstForm, setEncInstForm] = useState({ titulo: '', descripcion: '', tiempo_estimado: '' });

  useEffect(() => {
    if (!localStorage.getItem('admin')) { navigate('/login'); return; }
    fetchAll();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(!s ? usuarios : usuarios.filter(u => u.nombre?.toLowerCase().includes(s) || u.apellido?.toLowerCase().includes(s) || u.cedula?.includes(s) || u.email?.toLowerCase().includes(s)));
  }, [search, usuarios]);

  useEffect(() => {
    const s = searchEnc.toLowerCase();
    setFilteredEnc(!s ? encuestas : encuestas.filter(e => e.cedula?.includes(s)));
  }, [searchEnc, encuestas]);

  const fetchAll = async () => {
    try {
      const [uRes, eRes, oRes, evRes] = await Promise.all([
        fetch(`${API}/leader/egresados`),
        fetch(`${API}/admin/encuestas`),
        fetch(`${API}/empleos`),
        fetch(`${API}/eventos`)
      ]);
      const uData = await uRes.json();
      setUsuarios(uData); setFiltered(uData);
      try { setEncuestas(await eRes.json()); } catch {}
      try { setOfertas(await oRes.json()); } catch {}
      try { setEventos(await evRes.json()); } catch {}
      try { const nRes = await fetch(`${API}/admin/networking`); setNetworkingCards(await nRes.json()); } catch {}
      try { const eiRes = await fetch(`${API}/admin/encuestas-institucionales`); setEncInstitucionales(await eiRes.json()); } catch {}
      try { const tRes = await fetch(`${API}/admin/testimonios`); setTestimonios(await tRes.json()); } catch {}
      try { const rRes = await fetch(`${API}/admin/recursos`); setRecursosAdmin(await rRes.json()); } catch {}
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const showMsg = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000); };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/usuarios`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { showMsg('Usuario creado'); setShowCreate(false); setForm({ cedula: '', nombre: '', apellido: '', email: '', telefono: '', password: '' }); fetchAll(); }
      else showMsg(data.message || 'Error');
    } catch { showMsg('Error de conexion'); }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const res = await fetch(`${API}/admin/usuarios/${editUser.cedula}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: editUser.nombre, apellido: editUser.apellido, email: editUser.email, telefono: editUser.telefono }) });
      if (res.ok) { showMsg('Usuario actualizado'); setEditUser(null); fetchAll(); }
      else showMsg('Error al actualizar');
    } catch { showMsg('Error de conexion'); }
  };

  const handleDelete = async (cedula: string, nombre: string) => {
    if (!window.confirm(`Eliminar a ${nombre}? Se borraran todos sus datos.`)) return;
    try {
      const res = await fetch(`${API}/admin/usuarios/${cedula}`, { method: 'DELETE' });
      if (res.ok) { showMsg('Usuario eliminado'); fetchAll(); } else showMsg('Error');
    } catch { showMsg('Error'); }
  };

  const handleResetEncuesta = async (cedula: string) => {
    if (!window.confirm('Resetear encuesta? Podra llenarla de nuevo.')) return;
    try { await fetch(`${API}/admin/reset-encuesta/${cedula}`, { method: 'POST' }); showMsg('Encuesta reseteada'); fetchAll(); } catch { showMsg('Error'); }
  };

  const handleResetPerfil = async (cedula: string) => {
    if (!window.confirm('Resetear perfil?')) return;
    try { await fetch(`${API}/admin/reset-perfil/${cedula}`, { method: 'POST' }); showMsg('Perfil reseteado'); fetchAll(); } catch { showMsg('Error'); }
  };

  const handleDeleteEncuesta = async (_id: number, cedula: string) => {
    if (!window.confirm('Eliminar esta encuesta?')) return;
    try { await fetch(`${API}/admin/reset-encuesta/${cedula}`, { method: 'POST' }); showMsg('Encuesta eliminada'); fetchAll(); } catch { showMsg('Error'); }
  };

  const handleCreateOferta = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/empleos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...ofertaForm, es_imagen: ofertaForm.oferta_tipo === 'imagen' }) });
      if (res.ok) { showMsg('Oferta creada'); setShowCreateOferta(false); setOfertaForm({ titulo: '', empresa: '', ubicacion: '', tipo: 'Tiempo completo', salario: '', descripcion: '', requisitos: '', contacto: '', contacto_tipo: 'email', imagen_url: '', oferta_tipo: 'texto' }); fetchAll(); }
      else showMsg('Error al crear');
    } catch { showMsg('Error'); }
  };

  const handleDeleteOferta = async (id: number) => {
    if (!window.confirm('Eliminar esta oferta?')) return;
    try { await fetch(`${API}/admin/empleos/${id}`, { method: 'DELETE' }); showMsg('Oferta eliminada'); fetchAll(); } catch { showMsg('Error'); }
  };

  const handleCreateEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/eventos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(eventoForm) });
      if (res.ok) { showMsg('Evento creado'); setShowCreateEvento(false); setEventoForm({ titulo: '', descripcion: '', tipo: 'Evento', fecha: '', duracion: '', modalidad: '', certificado: 'Universidad Mariana', costo: 'Por confirmar', imagen_url: '' }); fetchAll(); }
      else showMsg('Error al crear');
    } catch { showMsg('Error'); }
  };

  const handleDeleteEvento = async (id: number) => {
    if (!window.confirm('Eliminar este evento?')) return;
    try { await fetch(`${API}/admin/eventos/${id}`, { method: 'DELETE' }); showMsg('Evento eliminado'); fetchAll(); } catch { showMsg('Error'); }
  };

  const handleDeleteNetworking = async (id: number) => {
    if (!window.confirm('Eliminar esta tarjeta de networking?')) return;
    try { await fetch(`${API}/admin/networking/${id}`, { method: 'DELETE' }); showMsg('Tarjeta eliminada'); fetchAll(); } catch { showMsg('Error'); }
  };

  // Upload de imagen
  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    setUploadingImg(true);
    try {
      const formData = new FormData();
      formData.append('imagen', file);
      const res = await fetch(`${API}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) { callback(data.url); showMsg('Imagen subida'); }
      else showMsg('Error al subir imagen');
    } catch { showMsg('Error al subir imagen'); }
    finally { setUploadingImg(false); }
  };

  // CRUD Encuestas Institucionales
  const handleCreateEncInst = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/encuestas-institucionales`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(encInstForm) });
      if (res.ok) { showMsg('Encuesta creada'); setShowCreateEncInst(false); setEncInstForm({ titulo: '', descripcion: '', tiempo_estimado: '' }); fetchAll(); }
      else showMsg('Error al crear');
    } catch { showMsg('Error'); }
  };

  const handleDeleteEncInst = async (id: number) => {
    if (!window.confirm('Eliminar esta encuesta y todas sus respuestas?')) return;
    try { await fetch(`${API}/admin/encuestas-institucionales/${id}`, { method: 'DELETE' }); showMsg('Encuesta eliminada'); fetchAll(); } catch { showMsg('Error'); }
  };

  const [editOferta, setEditOferta] = useState<any>(null);
  const [editEvento, setEditEvento] = useState<any>(null);
  const [editEncInst, setEditEncInst] = useState<any>(null);
  const [viewRespuestas, setViewRespuestas] = useState<{ encuesta: any; respuestas: any[] } | null>(null);

  const handleUpdateOferta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOferta) return;
    try {
      const { id, created_at, ...fields } = editOferta;
      const res = await fetch(`${API}/admin/empleos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
      if (res.ok) { showMsg('Oferta actualizada'); setEditOferta(null); fetchAll(); }
      else showMsg('Error al actualizar');
    } catch { showMsg('Error'); }
  };

  const handleUpdateEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvento) return;
    try {
      const { id, created_at, ...fields } = editEvento;
      const res = await fetch(`${API}/admin/eventos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
      if (res.ok) { showMsg('Evento actualizado'); setEditEvento(null); fetchAll(); }
      else showMsg('Error al actualizar');
    } catch { showMsg('Error'); }
  };

  const adminLogout = () => { localStorage.removeItem('admin'); navigate('/'); };

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div></div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SimpleHeader title="Panel Administrativo" variant="admin" onLogout={adminLogout} />
      <div className="flex-1 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {msg && <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 rounded text-sm text-green-700">{msg}</div>}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg shadow p-1">
          {[
            { id: 'usuarios' as const, label: 'Usuarios', icon: <Users size={16} /> },
            { id: 'empleos' as const, label: 'Ofertas Laborales', icon: <Briefcase size={16} /> },
            { id: 'eventos' as const, label: 'Eventos', icon: <Calendar size={16} /> },
            { id: 'networking' as const, label: 'Networking', icon: <Handshake size={16} /> },
            { id: 'encuestas' as const, label: 'Encuestas Satisf.', icon: <FileText size={16} /> },
            { id: 'enc_institucionales' as const, label: 'Enc. Institucionales', icon: <FileText size={16} /> },
            { id: 'testimonios' as const, label: 'Testimonios', icon: <Video size={16} /> },
            { id: 'recursos' as const, label: 'Recursos', icon: <FolderOpen size={16} /> },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* TAB: Usuarios */}
        {tab === 'usuarios' && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
              </div>
              <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nuevo Usuario
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-3 border-b bg-gray-50 text-sm text-gray-600">{filtered.length} usuarios</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cedula</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Perfil</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Encuesta</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filtered.map(u => (
                      <tr key={u.cedula} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm font-mono">{u.cedula}</td>
                        <td className="px-3 py-2 text-sm">{u.nombre} {u.apellido}</td>
                        <td className="px-3 py-2 text-sm text-gray-600">{u.email || '-'}</td>
                        <td className="px-3 py-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.has_completed_profile ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{u.has_completed_profile ? 'Si' : 'No'}</span></td>
                        <td className="px-3 py-2 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.ha_completado_encuesta ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>{u.ha_completado_encuesta ? 'Si' : 'No'}</span></td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => setEditUser(u)} title="Editar" className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                            <button onClick={() => handleResetEncuesta(u.cedula)} title="Resetear encuesta" className="p-1 text-orange-600 hover:bg-orange-50 rounded"><FileText size={14} /></button>
                            <button onClick={() => handleResetPerfil(u.cedula)} title="Resetear perfil" className="p-1 text-purple-600 hover:bg-purple-50 rounded"><RotateCcw size={14} /></button>
                            <button onClick={() => handleDelete(u.cedula, `${u.nombre} ${u.apellido}`)} title="Eliminar" className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB: Networking */}
        {tab === 'networking' && (
          <>
            <div className="mb-4 text-sm text-gray-600">{networkingCards.length} tarjetas publicadas</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {networkingCards.map((t: any) => (
                <div key={t.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{t.nombre} {t.apellido}</h4>
                      <p className="text-xs text-gray-500">{t.rol_profesional}</p>
                      <p className="text-xs text-gray-400">{t.email}</p>
                    </div>
                    <button onClick={() => handleDeleteNetworking(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div><span className="font-semibold text-green-700">Ofrece:</span> <span className="text-gray-600">{t.que_ofrece}</span></div>
                    <div><span className="font-semibold text-blue-700">Necesita:</span> <span className="text-gray-600">{t.que_necesita}</span></div>
                  </div>
                </div>
              ))}
            </div>
            {networkingCards.length === 0 && <div className="text-center py-12 text-gray-400">No hay tarjetas de networking</div>}
          </>
        )}

        {/* TAB: Encuestas */}
        {tab === 'encuestas' && (
          <>
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" placeholder="Buscar por cedula..." value={searchEnc} onChange={(e) => setSearchEnc(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-3 border-b bg-gray-50 text-sm text-gray-600">{filteredEnc.length} encuestas</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cedula</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Calidad</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Pertinencia</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Docentes</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Aplicab.</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Acomp.</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Expect.</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">General</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Recomend.</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Accion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEnc.map(e => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm font-mono">{e.cedula}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.calidad_academica}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.pertinencia_contenidos}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.nivel_docentes}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.aplicabilidad_conocimientos}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.acompanamiento_institucional}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.cumplimiento_expectativas}</td>
                        <td className="px-3 py-2 text-sm text-center font-bold">{e.satisfaccion_general}</td>
                        <td className="px-3 py-2 text-sm text-center">{e.recomendaria}</td>
                        <td className="px-3 py-2 text-center">
                          <button onClick={() => handleDeleteEncuesta(e.id, e.cedula)} title="Eliminar encuesta" className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredEnc.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No hay encuestas</div>}
            </div>
          </>
        )}

        {/* TAB: Encuestas Institucionales */}
        {tab === 'enc_institucionales' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{encInstitucionales.length} encuestas institucionales</p>
              <button onClick={() => setShowCreateEncInst(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nueva Encuesta
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {encInstitucionales.map((ei: any) => (
                <div key={ei.id} className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ei.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{ei.activa ? 'Activa' : 'Inactiva'}</span>
                        <span className="text-xs text-blue-600 font-medium">{ei.total_respuestas || 0} respuestas</span>
                      </div>
                      <h4 className="font-bold text-gray-800">{ei.titulo}</h4>
                      {ei.descripcion && <p className="text-sm text-gray-500 mt-1">{ei.descripcion}</p>}
                      {ei.tiempo_estimado && <p className="text-xs text-gray-400 mt-2">⏱ Tiempo estimado: {ei.tiempo_estimado}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <button onClick={async () => {
                      try {
                        const res = await fetch(`${API}/admin/encuestas-institucionales/${ei.id}/respuestas`);
                        const data = await res.json();
                        setViewRespuestas({ encuesta: ei, respuestas: data });
                      } catch { showMsg('Error al cargar respuestas'); }
                    }} className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded text-xs font-medium"><FileText size={12} />Ver respuestas ({ei.total_respuestas || 0})</button>
                    <button onClick={() => setEditEncInst({...ei})} className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium"><Edit2 size={12} />Editar</button>
                    <button onClick={async () => {
                      await fetch(`${API}/admin/encuestas-institucionales/${ei.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...ei, activa: !ei.activa }) });
                      showMsg(ei.activa ? 'Encuesta desactivada' : 'Encuesta activada'); fetchAll();
                    }} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium ${ei.activa ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}>
                      {ei.activa ? '⏸ Desactivar' : '▶ Activar'}
                    </button>
                    <button onClick={() => handleDeleteEncInst(ei.id)} className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded text-xs font-medium"><Trash2 size={12} />Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            {encInstitucionales.length === 0 && <div className="text-center py-12 text-gray-400">No hay encuestas institucionales</div>}
          </>
        )}

        {/* TAB: Recursos */}
        {tab === 'recursos' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{recursosAdmin.length} recursos</p>
              <button onClick={() => setShowCreateRecurso(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nuevo Recurso
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recursosAdmin.map((r: any) => (
                <div key={r.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{r.activo ? 'Activo' : 'Inactivo'}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{r.categoria}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.tipo === 'descarga' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>{r.tipo}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">{r.titulo}</h4>
                    <p className="text-xs text-gray-500 mt-1">{r.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{r.url}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button onClick={() => setEditRecurso({...r})} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                    <button onClick={async () => {
                      if (!window.confirm('Eliminar este recurso?')) return;
                      await fetch(`${API}/admin/recursos/${r.id}`, { method: 'DELETE' });
                      showMsg('Recurso eliminado'); fetchAll();
                    }} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {recursosAdmin.length === 0 && <div className="text-center py-12 text-gray-400">No hay recursos</div>}
          </>
        )}

        {/* TAB: Testimonios */}
        {tab === 'testimonios' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{testimonios.length} testimonios</p>
              <button onClick={() => setShowCreateTestimonio(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nuevo Testimonio
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonios.map((t: any) => (
                <div key={t.id} className="bg-white rounded-lg shadow p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{t.activo ? 'Activo' : 'Inactivo'}</span>
                      </div>
                      <h4 className="font-bold text-gray-800">{t.titulo}</h4>
                      {t.nombre_egresado && <p className="text-sm text-gray-500">{t.nombre_egresado} — {t.cargo}</p>}
                      {t.descripcion && <p className="text-xs text-gray-400 mt-1">{t.descripcion}</p>}
                    </div>
                  </div>
                  {t.youtube_url && (
                    <div className="mb-3 aspect-video rounded overflow-hidden bg-gray-100">
                      <iframe
                        src={t.youtube_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title={t.titulo}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <button onClick={() => setEditTestimonio({...t})} className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium"><Edit2 size={12} />Editar</button>
                    <button onClick={async () => {
                      if (!window.confirm('Eliminar este testimonio?')) return;
                      await fetch(`${API}/admin/testimonios/${t.id}`, { method: 'DELETE' });
                      showMsg('Testimonio eliminado'); fetchAll();
                    }} className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded text-xs font-medium"><Trash2 size={12} />Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            {testimonios.length === 0 && <div className="text-center py-12 text-gray-400">No hay testimonios</div>}
          </>
        )}

        {/* TAB: Empleos */}
        {tab === 'empleos' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{ofertas.length} ofertas activas</p>
              <button onClick={() => setShowCreateOferta(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nueva Oferta
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ofertas.map((o: any) => (
                <div key={o.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {o.fijada ? <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">Fijada</span> : null}
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{o.tipo}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">{o.titulo}</h4>
                    <p className="text-xs text-gray-500">{o.empresa} — {o.ubicacion}</p>
                    <p className="text-xs text-gray-400 mt-1">{o.contacto}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditOferta({...o})} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                    <button onClick={() => handleDeleteOferta(o.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {ofertas.length === 0 && <div className="text-center py-12 text-gray-400">No hay ofertas</div>}
          </>
        )}

        {/* TAB: Eventos */}
        {tab === 'eventos' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">{eventos.length} eventos activos</p>
              <button onClick={() => setShowCreateEvento(true)} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">
                <Plus size={16} />Nuevo Evento
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventos.map((ev: any) => (
                <div key={ev.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">{ev.tipo}</span>
                    <h4 className="font-bold text-gray-800 text-sm mt-1">{ev.titulo}</h4>
                    <p className="text-xs text-gray-500">{ev.fecha} — {ev.duracion}</p>
                    <p className="text-xs text-gray-400">{ev.modalidad} | {ev.costo}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditEvento({...ev})} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                    <button onClick={() => handleDeleteEvento(ev.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {eventos.length === 0 && <div className="text-center py-12 text-gray-400">No hay eventos</div>}
          </>
        )}

        {/* Modales */}
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nuevo Usuario</h3>
                <button onClick={() => setShowCreate(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-3">
                <input type="text" required placeholder="Cedula *" value={form.cedula} onChange={e => setForm({...form, cedula: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" required placeholder="Nombre *" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" required placeholder="Apellido *" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="tel" placeholder="Telefono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Contrasena (default: cedula)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear</button>
              </form>
            </div>
          </div>
        )}

        {editUser && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar: {editUser.cedula}</h3>
                <button onClick={() => setEditUser(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" required value={editUser.nombre} onChange={e => setEditUser({...editUser, nombre: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Nombre" />
                  <input type="text" required value={editUser.apellido} onChange={e => setEditUser({...editUser, apellido: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Apellido" />
                </div>
                <input type="email" value={editUser.email || ''} onChange={e => setEditUser({...editUser, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Email" />
                <input type="tel" value={editUser.telefono || ''} onChange={e => setEditUser({...editUser, telefono: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Telefono" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar</button>
              </form>
            </div>
          </div>
        )}
        {showCreateOferta && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nueva Oferta Laboral</h3>
                <button onClick={() => setShowCreateOferta(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleCreateOferta} className="space-y-3">
                <input type="text" required placeholder="Titulo *" value={ofertaForm.titulo} onChange={e => setOfertaForm({...ofertaForm, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" required placeholder="Empresa *" value={ofertaForm.empresa} onChange={e => setOfertaForm({...ofertaForm, empresa: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" placeholder="Ubicacion" value={ofertaForm.ubicacion} onChange={e => setOfertaForm({...ofertaForm, ubicacion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Tipo (ej: Tiempo completo)" value={ofertaForm.tipo} onChange={e => setOfertaForm({...ofertaForm, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" placeholder="Salario" value={ofertaForm.salario} onChange={e => setOfertaForm({...ofertaForm, salario: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <textarea placeholder="Descripcion" value={ofertaForm.descripcion} onChange={e => setOfertaForm({...ofertaForm, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Contacto (email o URL)" value={ofertaForm.contacto} onChange={e => setOfertaForm({...ofertaForm, contacto: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <select value={ofertaForm.contacto_tipo} onChange={e => setOfertaForm({...ofertaForm, contacto_tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="email">Email</option>
                    <option value="link">Enlace</option>
                  </select>
                </div>
                <input type="text" placeholder="URL imagen (opcional)" value={ofertaForm.imagen_url} onChange={e => setOfertaForm({...ofertaForm, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setOfertaForm({...ofertaForm, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 O subir desde el computador'}
                  </label>
                  {ofertaForm.imagen_url && <img src={ofertaForm.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear Oferta</button>
              </form>
            </div>
          </div>
        )}

        {showCreateEvento && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nuevo Evento</h3>
                <button onClick={() => setShowCreateEvento(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleCreateEvento} className="space-y-3">
                <input type="text" required placeholder="Titulo *" value={eventoForm.titulo} onChange={e => setEventoForm({...eventoForm, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <textarea placeholder="Descripcion" value={eventoForm.descripcion} onChange={e => setEventoForm({...eventoForm, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Tipo (ej: Simposio, Curso)" value={eventoForm.tipo} onChange={e => setEventoForm({...eventoForm, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" placeholder="Fecha" value={eventoForm.fecha} onChange={e => setEventoForm({...eventoForm, fecha: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Duracion" value={eventoForm.duracion} onChange={e => setEventoForm({...eventoForm, duracion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" placeholder="Modalidad" value={eventoForm.modalidad} onChange={e => setEventoForm({...eventoForm, modalidad: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Certificado" value={eventoForm.certificado} onChange={e => setEventoForm({...eventoForm, certificado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input type="text" placeholder="Costo" value={eventoForm.costo} onChange={e => setEventoForm({...eventoForm, costo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <input type="text" placeholder="URL imagen (opcional)" value={eventoForm.imagen_url} onChange={e => setEventoForm({...eventoForm, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setEventoForm({...eventoForm, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 O subir desde el computador'}
                  </label>
                  {eventoForm.imagen_url && <img src={eventoForm.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <input type="text" placeholder="Enlace de inscripción (opcional)" value={eventoForm.enlace_inscripcion} onChange={e => setEventoForm({...eventoForm, enlace_inscripcion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear Evento</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Oferta */}
        {editOferta && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar Oferta</h3>
                <button onClick={() => setEditOferta(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleUpdateOferta} className="space-y-3">
                <input type="text" required value={editOferta.titulo} onChange={e => setEditOferta({...editOferta, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Titulo" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={editOferta.empresa} onChange={e => setEditOferta({...editOferta, empresa: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Empresa" />
                  <input type="text" value={editOferta.ubicacion || ''} onChange={e => setEditOferta({...editOferta, ubicacion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Ubicacion" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={editOferta.tipo || ''} onChange={e => setEditOferta({...editOferta, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Tipo" />
                  <input type="text" value={editOferta.salario || ''} onChange={e => setEditOferta({...editOferta, salario: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Salario" />
                </div>
                <textarea value={editOferta.descripcion || ''} onChange={e => setEditOferta({...editOferta, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Descripcion" />
                <input type="text" value={editOferta.contacto || ''} onChange={e => setEditOferta({...editOferta, contacto: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Contacto (email o URL)" />
                <select value={editOferta.contacto_tipo || 'email'} onChange={e => setEditOferta({...editOferta, contacto_tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="email">Email</option>
                  <option value="link">Enlace</option>
                </select>
                <input type="text" value={editOferta.imagen_url || ''} onChange={e => setEditOferta({...editOferta, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="URL imagen" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setEditOferta({...editOferta, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 Subir imagen'}
                  </label>
                  {editOferta.imagen_url && <img src={editOferta.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Evento */}
        {editEvento && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar Evento</h3>
                <button onClick={() => setEditEvento(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleUpdateEvento} className="space-y-3">
                <input type="text" required value={editEvento.titulo} onChange={e => setEditEvento({...editEvento, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Titulo" />
                <textarea value={editEvento.descripcion || ''} onChange={e => setEditEvento({...editEvento, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Descripcion" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={editEvento.tipo || ''} onChange={e => setEditEvento({...editEvento, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Tipo" />
                  <input type="text" value={editEvento.fecha || ''} onChange={e => setEditEvento({...editEvento, fecha: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Fecha" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={editEvento.duracion || ''} onChange={e => setEditEvento({...editEvento, duracion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Duracion" />
                  <input type="text" value={editEvento.modalidad || ''} onChange={e => setEditEvento({...editEvento, modalidad: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Modalidad" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={editEvento.certificado || ''} onChange={e => setEditEvento({...editEvento, certificado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Certificado" />
                  <input type="text" value={editEvento.costo || ''} onChange={e => setEditEvento({...editEvento, costo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Costo" />
                </div>
                <input type="text" value={editEvento.imagen_url || ''} onChange={e => setEditEvento({...editEvento, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="URL imagen" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setEditEvento({...editEvento, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 Subir imagen'}
                  </label>
                  {editEvento.imagen_url && <img src={editEvento.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <input type="text" value={editEvento.enlace_inscripcion || ''} onChange={e => setEditEvento({...editEvento, enlace_inscripcion: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enlace de inscripción (opcional)" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Crear Encuesta Institucional */}
        {showCreateEncInst && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nueva Encuesta Institucional</h3>
                <button onClick={() => setShowCreateEncInst(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleCreateEncInst} className="space-y-3">
                <input type="text" required placeholder="Título *" value={encInstForm.titulo} onChange={e => setEncInstForm({...encInstForm, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <textarea placeholder="Descripción" value={encInstForm.descripcion} onChange={e => setEncInstForm({...encInstForm, descripcion: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Tiempo estimado (ej: 10 minutos)" value={encInstForm.tiempo_estimado} onChange={e => setEncInstForm({...encInstForm, tiempo_estimado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear Encuesta</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Encuesta Institucional */}
        {editEncInst && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar Encuesta</h3>
                <button onClick={() => setEditEncInst(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { id, total_respuestas, created_at, ...fields } = editEncInst;
                  const res = await fetch(`${API}/admin/encuestas-institucionales/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
                  if (res.ok) { showMsg('Encuesta actualizada'); setEditEncInst(null); fetchAll(); }
                  else showMsg('Error al actualizar');
                } catch { showMsg('Error'); }
              }} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Título *</label>
                  <input type="text" required value={editEncInst.titulo} onChange={e => setEditEncInst({...editEncInst, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
                  <textarea value={editEncInst.descripcion || ''} onChange={e => setEditEncInst({...editEncInst, descripcion: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tiempo estimado</label>
                  <input type="text" value={editEncInst.tiempo_estimado || ''} onChange={e => setEditEncInst({...editEncInst, tiempo_estimado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Ej: 10 minutos" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="enc_activa" checked={editEncInst.activa} onChange={e => setEditEncInst({...editEncInst, activa: e.target.checked})} className="h-4 w-4 text-primary rounded" />
                  <label htmlFor="enc_activa" className="text-sm text-gray-700">Encuesta activa (visible para graduados)</label>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar cambios</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Ver Respuestas */}
        {viewRespuestas && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Respuestas: {viewRespuestas.encuesta.titulo}</h3>
                  <p className="text-sm text-gray-500">{viewRespuestas.respuestas.length} respuestas recibidas</p>
                </div>
                <button onClick={() => setViewRespuestas(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              {viewRespuestas.respuestas.length > 0 ? (
                <div className="space-y-3">
                  {viewRespuestas.respuestas.map((r: any) => (
                    <div key={r.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-sm text-gray-800">{r.nombre} {r.apellido}</span>
                          <span className="text-xs text-gray-400 ml-2">({r.cedula})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{new Date(r.fecha_respuesta).toLocaleDateString('es-CO')}</span>
                          <button onClick={async () => {
                            if (!window.confirm(`Eliminar respuesta de ${r.nombre} ${r.apellido}?`)) return;
                            try {
                              await fetch(`${API}/admin/encuestas-institucionales/respuesta/${r.id}`, { method: 'DELETE' });
                              setViewRespuestas({ ...viewRespuestas, respuestas: viewRespuestas.respuestas.filter((resp: any) => resp.id !== r.id) });
                              showMsg('Respuesta eliminada'); fetchAll();
                            } catch { showMsg('Error'); }
                          }} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Eliminar respuesta"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      {r.email && <p className="text-xs text-gray-500 mb-2">{r.email}</p>}
                      <div className="bg-white rounded p-3 border">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{typeof r.respuestas === 'string' ? JSON.parse(r.respuestas)?.comentario : r.respuestas?.comentario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <FileText size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Aún no hay respuestas para esta encuesta</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Crear Recurso */}
        {showCreateRecurso && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nuevo Recurso</h3>
                <button onClick={() => setShowCreateRecurso(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(`${API}/admin/recursos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recursoForm) });
                  if (res.ok) { showMsg('Recurso creado'); setShowCreateRecurso(false); setRecursoForm({ titulo: '', descripcion: '', categoria: 'General', tipo: 'enlace', url: '', imagen_url: '' }); fetchAll(); }
                  else showMsg('Error al crear');
                } catch { showMsg('Error'); }
              }} className="space-y-3">
                <input type="text" required placeholder="Título *" value={recursoForm.titulo} onChange={e => setRecursoForm({...recursoForm, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <textarea placeholder="Descripción" value={recursoForm.descripcion} onChange={e => setRecursoForm({...recursoForm, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Categoría (ej: Normas ISO, Plantillas)" value={recursoForm.categoria} onChange={e => setRecursoForm({...recursoForm, categoria: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <select value={recursoForm.tipo} onChange={e => setRecursoForm({...recursoForm, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="enlace">Enlace (abre en nueva pestaña)</option>
                  <option value="descarga">Descarga</option>
                </select>
                <input type="text" required placeholder="URL (Google Drive, sitio web, etc.) *" value={recursoForm.url} onChange={e => setRecursoForm({...recursoForm, url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="URL imagen de portada (opcional)" value={recursoForm.imagen_url} onChange={e => setRecursoForm({...recursoForm, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setRecursoForm({...recursoForm, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 O subir imagen'}
                  </label>
                  {recursoForm.imagen_url && <img src={recursoForm.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear Recurso</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Recurso */}
        {editRecurso && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar Recurso</h3>
                <button onClick={() => setEditRecurso(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { id, created_at, ...fields } = editRecurso;
                  const res = await fetch(`${API}/admin/recursos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
                  if (res.ok) { showMsg('Recurso actualizado'); setEditRecurso(null); fetchAll(); }
                  else showMsg('Error al actualizar');
                } catch { showMsg('Error'); }
              }} className="space-y-3">
                <input type="text" required value={editRecurso.titulo} onChange={e => setEditRecurso({...editRecurso, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Título" />
                <textarea value={editRecurso.descripcion || ''} onChange={e => setEditRecurso({...editRecurso, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Descripción" />
                <input type="text" value={editRecurso.categoria || ''} onChange={e => setEditRecurso({...editRecurso, categoria: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Categoría" />
                <select value={editRecurso.tipo} onChange={e => setEditRecurso({...editRecurso, tipo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="enlace">Enlace</option>
                  <option value="descarga">Descarga</option>
                </select>
                <input type="text" required value={editRecurso.url} onChange={e => setEditRecurso({...editRecurso, url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="URL" />
                <input type="text" value={editRecurso.imagen_url || ''} onChange={e => setEditRecurso({...editRecurso, imagen_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="URL imagen" />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, (url) => setEditRecurso({...editRecurso, imagen_url: url})); }} />
                    {uploadingImg ? 'Subiendo...' : '📷 Subir imagen'}
                  </label>
                  {editRecurso.imagen_url && <img src={editRecurso.imagen_url} alt="preview" className="w-10 h-10 object-cover rounded" />}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rec_activo" checked={editRecurso.activo} onChange={e => setEditRecurso({...editRecurso, activo: e.target.checked})} className="h-4 w-4 rounded" />
                  <label htmlFor="rec_activo" className="text-sm text-gray-700">Activo (visible para graduados)</label>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Crear Testimonio */}
        {showCreateTestimonio && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Nuevo Testimonio</h3>
                <button onClick={() => setShowCreateTestimonio(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(`${API}/admin/testimonios`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(testimonioForm) });
                  if (res.ok) { showMsg('Testimonio creado'); setShowCreateTestimonio(false); setTestimonioForm({ titulo: '', descripcion: '', youtube_url: '', nombre_egresado: '', cargo: '' }); fetchAll(); }
                  else showMsg('Error al crear');
                } catch { showMsg('Error'); }
              }} className="space-y-3">
                <input type="text" required placeholder="Título *" value={testimonioForm.titulo} onChange={e => setTestimonioForm({...testimonioForm, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" required placeholder="URL de YouTube *" value={testimonioForm.youtube_url} onChange={e => setTestimonioForm({...testimonioForm, youtube_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <textarea placeholder="Descripción" value={testimonioForm.descripcion} onChange={e => setTestimonioForm({...testimonioForm, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Nombre del graduado" value={testimonioForm.nombre_egresado} onChange={e => setTestimonioForm({...testimonioForm, nombre_egresado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Cargo / Rol profesional" value={testimonioForm.cargo} onChange={e => setTestimonioForm({...testimonioForm, cargo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium">Crear Testimonio</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar Testimonio */}
        {editTestimonio && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Editar Testimonio</h3>
                <button onClick={() => setEditTestimonio(null)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { id, created_at, ...fields } = editTestimonio;
                  const res = await fetch(`${API}/admin/testimonios/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
                  if (res.ok) { showMsg('Testimonio actualizado'); setEditTestimonio(null); fetchAll(); }
                  else showMsg('Error al actualizar');
                } catch { showMsg('Error'); }
              }} className="space-y-3">
                <input type="text" required value={editTestimonio.titulo} onChange={e => setEditTestimonio({...editTestimonio, titulo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Título" />
                <input type="text" required value={editTestimonio.youtube_url} onChange={e => setEditTestimonio({...editTestimonio, youtube_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="URL de YouTube" />
                <textarea value={editTestimonio.descripcion || ''} onChange={e => setEditTestimonio({...editTestimonio, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Descripción" />
                <input type="text" value={editTestimonio.nombre_egresado || ''} onChange={e => setEditTestimonio({...editTestimonio, nombre_egresado: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Nombre del graduado" />
                <input type="text" value={editTestimonio.cargo || ''} onChange={e => setEditTestimonio({...editTestimonio, cargo: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Cargo" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="test_activo" checked={editTestimonio.activo} onChange={e => setEditTestimonio({...editTestimonio, activo: e.target.checked})} className="h-4 w-4 rounded" />
                  <label htmlFor="test_activo" className="text-sm text-gray-700">Activo (visible para graduados)</label>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2"><Save size={16} />Guardar</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    <SimpleFooter />
    </div>
  );
};

export default AdminDashboardPage;
