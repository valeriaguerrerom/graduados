import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, Mail, Phone, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../assets/logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú de usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Inicio', path: '/', protected: false },
    { name: 'Networking', path: '/networking', protected: true },
    { name: 'Directorio', path: '/directory', protected: true },
    { name: 'Recursos', path: '/resources', protected: true },
    { name: 'Empleos', path: '/jobs', protected: true },
    { name: 'Encuestas', path: '/surveys', protected: true },
  ];

  const profileComplete = user?.hasCompletedProfile;

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (isAuthenticated && !profileComplete) {
      e.preventDefault();
      alert('Debes completar tu perfil al 100% antes de navegar por la plataforma.');
      navigate('/complete-profile');
    }
  };

  return (
    <header className="shadow-lg sticky top-0 z-50">
      {/* Barra Superior Institucional */}
      <div className="bg-primary text-white py-2 border-b border-primary-light">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap justify-between items-center text-xs md:text-sm">
            <div className="flex items-center space-x-4">
              <a href="mailto:egresadosespsistintegradosg@umariana.edu.co" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Mail size={14} />
                <span className="hidden sm:inline">egresadosespsistintegradosg@umariana.edu.co</span>
              </a>
              <a href="tel:+576027314923" className="flex items-center space-x-1 hover:text-secondary transition-colors">
                <Phone size={14} />
                <span className="hidden sm:inline">(+57) 602-7314923 Ext. 293</span>
              </a>
            </div>
            <a href="https://www.umariana.edu.co" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-secondary transition-colors">
              <Globe size={14} />
              <span>www.umariana.edu.co</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra Principal de Navegación */}
      <div className="bg-white border-b-4 border-secondary">
        <div className="container mx-auto px-6 lg:px-10 py-4">
          <div className="flex justify-between items-center">
            <div onClick={(e) => {
              if (isAuthenticated && !profileComplete) {
                e.preventDefault();
                alert('Debes completar tu perfil al 100% antes de navegar.');
                navigate('/complete-profile');
              } else {
                navigate('/');
              }
            }} className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                <img 
                  src={logoImg} 
                  alt="Universidad Mariana" 
                  className="h-14 w-14 md:h-16 md:w-16 object-contain"
                  onError={(e) => {
                    // Fallback al ícono si no carga la imagen
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <GraduationCap size={32} className="text-primary hidden" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-lg md:text-xl font-bold leading-tight">Universidad Mariana</span>
                <span className="text-secondary text-xs md:text-sm font-semibold">Esp. Sistemas Integrados de Gestión</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden lg:flex space-x-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        !profileComplete
                          ? 'text-gray-400 cursor-not-allowed'
                          : isActive 
                            ? 'bg-primary text-white' 
                            : 'text-primary hover:bg-primary/10 hover:text-primary-light'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            )}

            {/* User Menu / Login Button */}
            <div className="hidden lg:block relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all duration-200"
                  >
                    {(user as any)?.foto_url ? (
                      <img src={(user as any).foto_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                    <span>{user?.nombre}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to={profileComplete ? '/profile' : '/complete-profile'}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {profileComplete ? 'Mi Perfil' : 'Completar Perfil'}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-secondary hover:bg-secondary-dark text-primary font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                    Iniciar Sesión
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <button
                className="lg:hidden text-primary focus:outline-none hover:text-primary-light transition-colors"
                onClick={toggleMenu}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}
            {!isAuthenticated && (
              <div className="lg:hidden">
                <Link to="/login">
                  <button className="bg-secondary hover:bg-secondary-dark text-primary font-semibold px-4 py-2 rounded-lg shadow-md text-sm">
                    Iniciar Sesión
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isOpen && isAuthenticated && (
            <nav className="lg:hidden mt-4 pb-4 animate-fade-in border-t border-gray-200 pt-4">
              <ul className="flex flex-col space-y-2">
                {navItems.filter(item => !item.protected || isAuthenticated).map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={(e) => { handleNavClick(e, item); if (profileComplete || !isAuthenticated) setIsOpen(false); }}
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg font-medium transition-colors ${
                          isAuthenticated && !profileComplete
                            ? 'text-gray-400 cursor-not-allowed'
                            : isActive
                              ? 'bg-primary text-white'
                              : 'text-primary hover:bg-primary/10'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="block py-3 px-4 rounded-lg font-medium text-primary hover:bg-primary/10 transition-colors mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-colors duration-200"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full text-center bg-secondary hover:bg-secondary-dark text-primary font-semibold px-4 py-3 rounded-lg shadow-md transition-colors duration-200">
                        Iniciar Sesión
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
