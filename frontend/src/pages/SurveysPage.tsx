import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { FileText, Clock, CheckCircle, Send, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

import { API_URL } from '../config';

interface EncuestaInstitucional {
  id: number;
  titulo: string;
  descripcion: string;
  tiempo_estimado: string;
  activa: boolean;
}

const SurveysPage: React.FC = () => {
  const { user } = useAuth();
  const [encuestas, setEncuestas] = useState<EncuestaInstitucional[]>([]);
  const [respondidas, setRespondidas] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [selectedEncuesta, setSelectedEncuesta] = useState<EncuestaInstitucional | null>(null);
  const [comentario, setComentario] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchEncuestas();
  }, []);

  const fetchEncuestas = async () => {
    try {
      const res = await fetch(`${API_URL}/encuestas-institucionales`);
      const data = await res.json();
      setEncuestas(data);

      // Verificar cuáles ya respondió el usuario
      if (user?.cedula) {
        const verificaciones: Record<number, boolean> = {};
        await Promise.all(
          data.map(async (enc: EncuestaInstitucional) => {
            try {
              const vRes = await fetch(`${API_URL}/encuestas-institucionales/${enc.id}/verificar/${user.cedula}`);
              const vData = await vRes.json();
              verificaciones[enc.id] = vData.yaRespondio;
            } catch {
              verificaciones[enc.id] = false;
            }
          })
        );
        setRespondidas(verificaciones);
      }
    } catch (err) {
      console.error('Error cargando encuestas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!comentario.trim()) {
      setError('El campo de comentario no puede estar vacío.');
      return;
    }

    if (!user?.cedula || !selectedEncuesta) return;

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/encuestas-institucionales/${selectedEncuesta.id}/responder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cedula: user.cedula,
          respuestas: { comentario: comentario.trim() }
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('¡Gracias! Tu respuesta ha sido registrada exitosamente.');
        setRespondidas(prev => ({ ...prev, [selectedEncuesta.id]: true }));
        setTimeout(() => {
          setSelectedEncuesta(null);
          setComentario('');
          setSuccessMsg('');
        }, 2500);
      } else {
        setError(data.message || 'Error al enviar la respuesta.');
      }
    } catch {
      setError('Error de conexión con el servidor.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando encuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Section
        title="Encuestas Institucionales"
        subtitle="Participa en las encuestas activas y ayúdanos a mejorar nuestros programas y servicios."
        titleCenter
      >
        {encuestas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {encuestas.map((enc) => (
              <div key={enc.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText size={24} className="text-primary" />
                    </div>
                    {respondidas[enc.id] && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} />Ya respondiste
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{enc.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4">{enc.descripcion}</p>
                  {enc.tiempo_estimado && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1.5 text-secondary" />
                      <span>Tiempo estimado: {enc.tiempo_estimado}</span>
                    </div>
                  )}
                </div>
                <div className="px-6 pb-6">
                  {respondidas[enc.id] ? (
                    <div className="w-full text-center bg-green-50 text-green-700 font-medium py-2.5 rounded-lg text-sm">
                      ✓ Encuesta completada
                    </div>
                  ) : (
                    <button
                      onClick={() => { setSelectedEncuesta(enc); setError(''); setComentario(''); }}
                      className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                    >
                      Participar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No hay encuestas institucionales activas en este momento.</p>
          </div>
        )}
      </Section>

      {/* Modal para responder encuesta */}
      {selectedEncuesta && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">{selectedEncuesta.titulo}</h3>
              <button onClick={() => { setSelectedEncuesta(null); setComentario(''); setError(''); }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">{selectedEncuesta.descripcion}</p>

            {successMsg ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <p className="text-green-700 font-medium">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu opinión / comentarios <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Escribe tu opinión aquí..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <Send size={16} />
                    {sending ? 'Enviando...' : 'Enviar respuesta'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedEncuesta(null); setComentario(''); setError(''); }}
                    className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveysPage;
