import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Briefcase, GraduationCap, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-4 rounded-full">
                <User className="text-white" size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {user.nombre} {user.apellido}
                </h1>
                <p className="text-gray-600">{user.programa}</p>
              </div>
            </div>
            <Link
              to="/complete-profile"
              className="flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-primary font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Edit size={18} />
              <span>Editar Perfil</span>
            </Link>
          </div>
        </div>

        {/* Información Personal */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <User className="mr-2" size={24} />
            Información Personal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Cédula</p>
              <p className="text-gray-900">{user.cedula}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
              <p className="text-gray-900">{user.email || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Teléfono</p>
              <p className="text-gray-900">{user.telefono || 'No especificado'}</p>
            </div>
          </div>
        </div>

        {/* Información Académica */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <GraduationCap className="mr-2" size={24} />
            Información Académica
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Programa</p>
              <p className="text-gray-900">{user.programa || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Año de Graduación</p>
              <p className="text-gray-900">{user.añoGraduacion || 'No especificado'}</p>
            </div>
          </div>
        </div>

        {/* Información Laboral */}
        {(user.empresa || user.cargo) && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Briefcase className="mr-2" size={24} />
              Información Laboral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.empresa && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Empresa</p>
                  <p className="text-gray-900">{user.empresa}</p>
                </div>
              )}
              {user.cargo && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Cargo</p>
                  <p className="text-gray-900">{user.cargo}</p>
                </div>
              )}
              {user.linkedin && (
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-500 mb-1">LinkedIn</p>
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light"
                  >
                    {user.linkedin}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
