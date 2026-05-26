import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, FileText, TrendingUp, Search, Eye, Download, FileSpreadsheet, MousePointerClick } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SimpleHeader from '../components/navigation/SimpleHeader';
import SimpleFooter from '../components/navigation/SimpleFooter';
import { API_URL } from '../config';

interface Stats { totalEgresados: number; perfilesCompletados: number; encuestasCompletadas: number; promedioSatisfaccion: number; }
interface Egresado { cedula: string; nombre: string; apellido: string; email: string; programa: string; año_graduacion: string; condicion_laboral: string; has_completed_profile: boolean; ha_completado_encuesta: boolean; }
interface ChartData {
  condicionLaboral: { nombre: string; cantidad: number }[];
  graduacionPorAnio: { anio: string; cantidad: number }[];
  satisfaccion: { nombre: string; valor: number }[];
  ingresoMensual: { nombre: string; cantidad: number }[];
  experiencia: { nombre: string; cantidad: number }[];
  sexo: { nombre: string; cantidad: number }[];
  modalidad: { nombre: string; cantidad: number }[];
  recomendaria: { nombre: string; cantidad: number }[];
  perfilStatus: { nombre: string; cantidad: number }[];
}
interface RecursosStats { porRecurso: { recurso_id: string; tipo: string; total: number }[]; totales: { tipo: string; total: number }[]; }

const COLORS = ['#2563eb', '#16a34a', '#eab308', '#dc2626', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

const LeaderDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ totalEgresados: 0, perfilesCompletados: 0, encuestasCompletadas: 0, promedioSatisfaccion: 0 });
  const [egresados, setEgresados] = useState<Egresado[]>([]);
  const [filteredEgresados, setFilteredEgresados] = useState<Egresado[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resumen' | 'egresados' | 'satisfaccion' | 'recursos' | 'enc_inst'>('resumen');
  const [chartData, setChartData] = useState<ChartData>({ condicionLaboral: [], graduacionPorAnio: [], satisfaccion: [], ingresoMensual: [], experiencia: [], sexo: [], modalidad: [], recomendaria: [], perfilStatus: [] });
  const [recursosStats, setRecursosStats] = useState<RecursosStats>({ porRecurso: [], totales: [] });
  const [encInstitucionales, setEncInstitucionales] = useState<any[]>([]);
  const [viewRespuestas, setViewRespuestas] = useState<{ encuesta: any; respuestas: any[] } | null>(null);

  useEffect(() => { 
    if (!localStorage.getItem('leader')) { navigate('/login'); return; }
    fetchDashboardData(); 
  }, []);
  useEffect(() => { filterEgresados(); }, [searchTerm, egresados]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, egresadosRes, chartsRes, recursosRes] = await Promise.all([
        fetch(`${API_URL}/leader/stats`),
        fetch(`${API_URL}/leader/egresados`),
        fetch(`${API_URL}/leader/charts`),
        fetch(`${API_URL}/leader/recursos-stats`)
      ]);
      setStats(await statsRes.json());
      const eg = await egresadosRes.json();
      setEgresados(eg); setFilteredEgresados(eg);
      setChartData(await chartsRes.json());
      setRecursosStats(await recursosRes.json());
      try { const eiRes = await fetch(`${API_URL}/admin/encuestas-institucionales`); setEncInstitucionales(await eiRes.json()); } catch {}
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const filterEgresados = () => {
    if (!searchTerm) { setFilteredEgresados(egresados); return; }
    setFilteredEgresados(egresados.filter(e =>
      e.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.cedula?.includes(searchTerm) ||
      e.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleLogout = () => { localStorage.removeItem('leader'); navigate('/'); };

  const exportToExcel = async () => {
    try {
      const res = await fetch(`${API_URL}/leader/egresados-completo`);
      const data = await res.json();
      
      // Hoja 1: Datos de egresados
      const egresadosData = data.map((e: any) => ({
        'CEDULA': e.cedula,
        'NOMBRE': e.nombre,
        'APELLIDO': e.apellido,
        'EMAIL': e.email || '',
        'TELEFONO': e.telefono || '',
        'FECHA NACIMIENTO': e.fecha_nacimiento || '',
        'SEXO': e.sexo || '',
        'ESTADO CIVIL': e.estado_civil || '',
        'PAIS': e.pais || '',
        'DEPARTAMENTO': e.departamento || '',
        'MUNICIPIO': e.municipio || '',
        'DIRECCION': e.direccion_correspondencia || '',
        'PROGRAMA': e.programa || '',
        'PERIODO GRADUACION': e.año_graduacion || '',
        'FECHA GRADO': e.fec_grado || '',
        'MODALIDAD': e.modalidad || '',
        'ESTUDIOS ADICIONALES': e.estudios_adicionales || (e.ningun_estudio_adicional ? 'Ninguno' : ''),
        'IDIOMAS': e.cual_idioma || (e.habla_otro_idioma ? 'Si' : 'No'),
        'CONDICION LABORAL': e.condicion_laboral || '',
        'CIUDAD TRABAJO': e.ciudad_trabajo || '',
        'EXPERIENCIA': e.tiempo_experiencia || '',
        'LABORA EN': e.labora_actualmente_en || '',
        'INGRESO MENSUAL': e.ingreso_mensual || '',
        'AREA DESEMPENO': e.area_desempeno || '',
        'CANTIDAD EMPLEOS': e.cantidad_empleos || '',
        'RECONOCIMIENTO': e.ha_recibido_reconocimiento ? 'Si' : 'No',
        'TIPO RECONOCIMIENTO': e.tipo_reconocimiento || '',
        'REDES': e.participa_redes || '',
        'TIPO RED': e.tipo_red || '',
        'PERFIL COMPLETO': e.has_completed_profile ? 'SI' : 'NO',
        'ENCUESTA COMPLETADA': e.ha_completado_encuesta ? 'SI' : 'NO',
      }));

      // Hoja 2: Encuestas de satisfaccion
      const encuestasData = data.filter((e: any) => e.calidad_academica).map((e: any) => ({
        'CEDULA': e.cedula,
        'NOMBRE': `${e.nombre} ${e.apellido}`,
        'CALIDAD ACADEMICA': e.calidad_academica,
        'PERTINENCIA': e.pertinencia_contenidos,
        'DOCENTES': e.nivel_docentes,
        'APLICABILIDAD': e.aplicabilidad_conocimientos,
        'ACOMPANAMIENTO': e.acompanamiento_institucional,
        'EXPECTATIVAS': e.cumplimiento_expectativas,
        'SATISFACCION GENERAL': e.satisfaccion_general,
        'ASPECTO MAS VALORADO': e.aspecto_mas_valorado || '',
        'ASPECTO A MEJORAR': e.enc_aspecto_mejorar || '',
        'RECOMENDARIA': e.recomendaria || '',
      }));

      const wb = XLSX.utils.book_new();
      const ws1 = XLSX.utils.json_to_sheet(egresadosData);
      const ws2 = XLSX.utils.json_to_sheet(encuestasData);
      
      // Ancho de columnas
      ws1['!cols'] = Object.keys(egresadosData[0] || {}).map(() => ({ wch: 20 }));
      ws2['!cols'] = Object.keys(encuestasData[0] || {}).map(() => ({ wch: 22 }));
      
      XLSX.utils.book_append_sheet(wb, ws1, 'Egresados');
      XLSX.utils.book_append_sheet(wb, ws2, 'Encuestas Satisfaccion');
      XLSX.writeFile(wb, `Reporte_Completo_ESIG_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) { console.error('Error exportando:', err); }
  };

  const exportToPDF = async () => {
    try {
      const res = await fetch(`${API_URL}/leader/egresados-completo`);
      const data = await res.json();
      const doc = new jsPDF();
      
      // Titulo
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text('Reporte de Egresados ESIG', 14, 15);
      doc.setFontSize(10);
      doc.text(`Universidad Mariana — ${new Date().toLocaleDateString('es-CO')}`, 14, 23);
      
      // Estadisticas
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text('Resumen General', 14, 40);
      doc.setFontSize(10);
      const total = data.length;
      const perfiles = data.filter((e: any) => e.has_completed_profile).length;
      const encuestas = data.filter((e: any) => e.calidad_academica).length;
      doc.text(`Total graduados: ${total}`, 14, 48);
      doc.text(`Perfiles completados: ${perfiles} (${total > 0 ? Math.round(perfiles/total*100) : 0}%)`, 14, 55);
      doc.text(`Encuestas completadas: ${encuestas} (${total > 0 ? Math.round(encuestas/total*100) : 0}%)`, 14, 62);
      
      // Tabla de egresados
      autoTable(doc, {
        startY: 72,
        head: [['Cedula', 'Nombre', 'Periodo', 'Condicion', 'Ingreso', 'Perfil', 'Encuesta']],
        body: data.map((e: any) => [
          e.cedula, `${e.nombre} ${e.apellido}`, e.año_graduacion || 'N/A',
          e.condicion_laboral || 'N/A', e.ingreso_mensual || 'N/A',
          e.has_completed_profile ? 'Si' : 'No', e.ha_completado_encuesta ? 'Si' : 'No'
        ]),
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [240, 248, 255] },
        styles: { fontSize: 7, cellPadding: 2 },
      });
      
      // Pagina 2: Encuestas
      doc.addPage();
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('Encuestas de Satisfaccion', 14, 15);
      
      const encData = data.filter((e: any) => e.calidad_academica);
      autoTable(doc, {
        startY: 32,
        head: [['Cedula', 'Nombre', 'Calidad', 'Pertin.', 'Docent.', 'Aplic.', 'Acomp.', 'Expect.', 'General', 'Recom.']],
        body: encData.map((e: any) => [
          e.cedula, `${e.nombre} ${e.apellido}`,
          e.calidad_academica, e.pertinencia_contenidos, e.nivel_docentes,
          e.aplicabilidad_conocimientos, e.acompanamiento_institucional,
          e.cumplimiento_expectativas, e.satisfaccion_general, e.recomendaria || ''
        ]),
        theme: 'grid',
        headStyles: { fillColor: [46, 204, 113], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [240, 255, 240] },
        styles: { fontSize: 7, cellPadding: 2 },
      });
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Pagina ${i} de ${pageCount} — Generado el ${new Date().toLocaleDateString('es-CO')}`, 14, 287);
        doc.text('Universidad Mariana — Esp. Sistemas Integrados de Gestion', 105, 287, { align: 'center' });
      }
      
      doc.save(`Reporte_ESIG_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) { console.error('Error exportando PDF:', err); }
  };

  const MiniPie = ({ data, title }: { data: { nombre: string; cantidad: number }[]; title: string }) => (
    <div className="bg-white rounded-lg shadow p-5">
      <h4 className="text-sm font-bold text-gray-700 mb-3">{title}</h4>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="cantidad" nameKey="nombre" cx="50%" cy="50%" outerRadius={70} label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}>
              {data.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      ) : <p className="text-gray-400 text-center py-8 text-sm">Sin datos</p>}
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col">
    <SimpleHeader title="Dashboard de Graduados" variant="leader" onLogout={handleLogout} />
    <div className="flex-1 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-gray-500 mb-1">Total Graduados</p><p className="text-2xl font-bold text-primary">{stats.totalEgresados}</p></div>
              <Users className="text-primary" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-gray-500 mb-1">Perfiles Completados</p><p className="text-2xl font-bold text-green-600">{stats.perfilesCompletados}</p>
              <p className="text-xs text-gray-400">{stats.totalEgresados > 0 ? Math.round((stats.perfilesCompletados / stats.totalEgresados) * 100) : 0}%</p></div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-gray-500 mb-1">Encuestas</p><p className="text-2xl font-bold text-blue-600">{stats.encuestasCompletadas}</p>
              <p className="text-xs text-gray-400">{stats.totalEgresados > 0 ? Math.round((stats.encuestasCompletadas / stats.totalEgresados) * 100) : 0}%</p></div>
              <FileText className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-gray-500 mb-1">Satisfaccion</p><p className="text-2xl font-bold text-yellow-600">{stats.promedioSatisfaccion.toFixed(1)}/5</p></div>
              <TrendingUp className="text-yellow-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg shadow p-1">
          {[
            { id: 'resumen' as const, label: 'Resumen General' },
            { id: 'egresados' as const, label: 'Egresados' },
            { id: 'satisfaccion' as const, label: 'Satisfaccion' },
            { id: 'recursos' as const, label: 'Recursos' },
            { id: 'enc_inst' as const, label: 'Enc. Institucionales' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: Resumen General */}
        {activeTab === 'resumen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MiniPie data={chartData.condicionLaboral} title="Condicion Laboral" />
              <MiniPie data={chartData.sexo} title="Distribucion por Genero" />
              <MiniPie data={chartData.perfilStatus} title="Estado de Perfiles" />
              <MiniPie data={chartData.recomendaria} title="Recomendaria la Universidad?" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-5">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Graduados por Periodo de Graduacion</h4>
                {chartData.graduacionPorAnio.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData.graduacionPorAnio}>
                      <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="anio" tick={{ fontSize: 11 }} /><YAxis allowDecimals={false} />
                      <Tooltip /><Bar dataKey="cantidad" fill="#2563eb" radius={[4, 4, 0, 0]} name="Egresados" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <p className="text-gray-400 text-center py-8 text-sm">Sin datos</p>}
              </div>
              <div className="bg-white rounded-lg shadow p-5">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Ingreso Mensual</h4>
                {chartData.ingresoMensual.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData.ingresoMensual} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" /><XAxis type="number" allowDecimals={false} /><YAxis type="category" dataKey="nombre" tick={{ fontSize: 10 }} width={100} />
                      <Tooltip /><Bar dataKey="cantidad" fill="#16a34a" radius={[0, 4, 4, 0]} name="Egresados" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <p className="text-gray-400 text-center py-8 text-sm">Sin datos</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MiniPie data={chartData.experiencia} title="Tiempo de Experiencia" />
              <MiniPie data={chartData.modalidad} title="Modalidad de Estudio" />
            </div>
          </div>
        )}

        {/* TAB: Satisfaccion */}
        {activeTab === 'satisfaccion' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">Promedios de Satisfaccion por Categoria</h4>
              {chartData.satisfaccion.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={chartData.satisfaccion}>
                    <PolarGrid /><PolarAngleAxis dataKey="nombre" tick={{ fontSize: 12 }} /><PolarRadiusAxis angle={90} domain={[0, 5]} />
                    <Radar name="Promedio" dataKey="valor" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                    <Tooltip /><Legend />
                  </RadarChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-400 text-center py-12">Sin datos de encuestas</p>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Detalle por Categoria</h4>
                <div className="space-y-3">
                  {chartData.satisfaccion.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{s.nombre}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(s.valor / 5) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-primary w-8">{s.valor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <MiniPie data={chartData.recomendaria} title="Recomendaria la Universidad?" />
            </div>
          </div>
        )}

        {/* TAB: Egresados */}
        {activeTab === 'egresados' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Lista de Graduados</h2>
                <div className="flex items-center gap-3">
                  <button onClick={exportToExcel} className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium">
                    <FileSpreadsheet size={16} className="mr-1" />Excel
                  </button>
                  <button onClick={exportToPDF} className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium">
                    <Download size={16} className="mr-1" />PDF
                  </button>
                  <span className="text-xs text-gray-500">{filteredEgresados.length} resultados</span>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="text" placeholder="Buscar por nombre, cedula o email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cedula</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Perfil</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Encuesta</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEgresados.map((e) => (
                    <tr key={e.cedula} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{e.cedula}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{e.nombre} {e.apellido}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{e.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{e.año_graduacion || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{e.condicion_laboral || 'N/A'}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${e.has_completed_profile ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {e.has_completed_profile ? '✓' : '...'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${e.ha_completado_encuesta ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                          {e.ha_completado_encuesta ? '✓' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => navigate(`/leader/egresado/${e.cedula}`)} className="text-primary hover:text-primary-light"><Eye size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredEgresados.length === 0 && <div className="text-center py-12"><p className="text-gray-400">No se encontraron egresados</p></div>}
          </div>
        )}

        {/* TAB: Recursos */}
        {activeTab === 'recursos' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MousePointerClick className="text-primary" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Clicks en Recursos y Empleos</h3>
              </div>
              <button onClick={async () => {
                if (!window.confirm('Resetear todos los clicks?')) return;
                await fetch(`${API_URL}/leader/reset-clicks`, { method: 'DELETE' });
                fetchDashboardData();
              }} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-xs font-medium">
                Resetear clicks
              </button>
            </div>
            {recursosStats.porRecurso.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recurso</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recursosStats.porRecurso.map((r, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{r.recurso_id}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${r.tipo === 'enlace' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                              {r.tipo === 'enlace' ? 'Enlace' : 'Descarga'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-center font-bold text-primary">{r.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex gap-4">
                  {recursosStats.totales.map((t, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg px-4 py-2 text-sm">
                      <span className="text-gray-500">{t.tipo === 'enlace' ? 'Total enlaces:' : 'Total descargas:'}</span>
                      <span className="font-bold text-primary ml-2">{t.total}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <p className="text-gray-400 text-center py-12">Aun no hay clicks registrados</p>}
          </div>
        )}

        {/* TAB: Encuestas Institucionales */}
        {activeTab === 'enc_inst' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Encuestas Institucionales</h3>
            <p className="text-sm text-gray-500">{encInstitucionales.length} encuestas registradas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {encInstitucionales.map((ei: any) => (
                <div key={ei.id} className="bg-white rounded-lg shadow p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ei.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{ei.activa ? 'Activa' : 'Inactiva'}</span>
                    <span className="text-xs text-blue-600 font-medium">{ei.total_respuestas || 0} respuestas</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{ei.titulo}</h4>
                  {ei.descripcion && <p className="text-sm text-gray-500 mt-1">{ei.descripcion}</p>}
                  {ei.tiempo_estimado && <p className="text-xs text-gray-400 mt-2">⏱ {ei.tiempo_estimado}</p>}
                  <button onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/admin/encuestas-institucionales/${ei.id}/respuestas`);
                      const data = await res.json();
                      setViewRespuestas({ encuesta: ei, respuestas: data });
                    } catch { console.error('Error'); }
                  }} className="mt-3 flex items-center gap-1 px-3 py-1.5 text-primary hover:bg-primary/10 rounded text-xs font-medium">
                    <FileText size={12} />Ver respuestas ({ei.total_respuestas || 0})
                  </button>
                </div>
              ))}
            </div>
            {encInstitucionales.length === 0 && <p className="text-gray-400 text-center py-12">No hay encuestas institucionales</p>}
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
                <button onClick={() => setViewRespuestas(null)} className="text-gray-400 hover:text-gray-600"><Eye size={20} /></button>
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
                        <span className="text-xs text-gray-400">{new Date(r.fecha_respuesta).toLocaleDateString('es-CO')}</span>
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
      </div>
    </div>
    <SimpleFooter />
    </div>
  );
};

export default LeaderDashboardPage;
