import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bus, CreditCard, Map, User, LogIn, LogOut, Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-100 transition">
            <Bus size={32} />
            <span>METROPOLITANO</span>
          </Link>

          <div className="hidden md:flex items-center space-x-3">
            <Link to="/" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/')}`}>
              <Bus size={18} /><span>Inicio</span>
            </Link>
            <Link to="/rutas-vivo" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/rutas-vivo')}`}>
              <Map size={18} /><span>En Vivo</span>
            </Link>
            <Link to="/horarios" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/horarios')}`}>
              <Calendar size={18} /><span>Horarios</span>
            </Link>
            <Link to="/recargar" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/recargar')}`}>
              <CreditCard size={18} /><span>Recargar</span>
            </Link>
            <Link to="/registro-tarjeta" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/registro-tarjeta')}`}>
              <User size={18} /><span>Registro</span>
            </Link>

            <div className="h-6 w-px bg-blue-400 mx-2"></div>

            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition shadow-md border border-blue-500">
                  <div className="w-6 h-6 rounded-full bg-sky-400 flex items-center justify-center text-xs font-bold">CH</div>
                  <span>Mi Perfil</span>
                  <ChevronDown size={16}/>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-slate-800 animate-fade-in border border-slate-100">
                    <Link to="/perfil" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 hover:bg-slate-50 font-medium">Dashboard</Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2">
                      <LogOut size={14}/> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded transition shadow-md font-medium">
                <LogIn size={18} /><span>Ingresar</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:bg-blue-700 p-2 rounded">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1 shadow-inner">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2"><Bus size={18}/> Inicio</Link>
          <Link to="/rutas-vivo" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2"><Map size={18}/> Rutas en Vivo</Link>
          <Link to="/horarios" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2"><Calendar size={18}/> Horarios</Link>
          <Link to="/recargar" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2"><CreditCard size={18}/> Recargar</Link>
          
          <div className="border-t border-blue-500 my-2 pt-2">
            {isLoggedIn ? (
               <>
                 <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2 font-bold bg-blue-800/50 mb-2"><User size={18}/> Mi Perfil</Link>
                 <button onClick={() => {handleLogout(); setIsMenuOpen(false);}} className="w-full text-left px-3 py-2 rounded-md hover:bg-red-600 flex items-center gap-2 text-red-200"><LogOut size={18}/> Cerrar Sesión</button>
               </>
            ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md bg-sky-600 text-white font-bold text-center">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}