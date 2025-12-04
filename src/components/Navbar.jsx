import { Link, useLocation } from 'react-router-dom';
import { Bus, CreditCard, Map, User, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Simulación de estado de sesión (puedes cambiarlo a true para ver el botón de cerrar sesión)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-100 transition">
            <Bus size={32} />
            <span>METROPOLITANO</span>
          </Link>

          {/* Menú Escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/')}`}>
              <Bus size={18} />
              <span>Inicio</span>
            </Link>
            <Link to="/rutas-vivo" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/rutas-vivo')}`}>
              <Map size={18} />
              <span>Rutas en Vivo</span>
            </Link>
            <Link to="/recargar" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/recargar')}`}>
              <CreditCard size={18} />
              <span>Recargar Saldo</span>
            </Link>
            <Link to="/registro-tarjeta" className={`flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition ${isActive('/registro-tarjeta')}`}>
              <User size={18} />
              <span>Registrar Tarjeta</span>
            </Link>

            {/* Separador */}
            <div className="h-6 w-px bg-blue-400 mx-2"></div>

            {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition shadow-md"
              >
                <LogOut size={18} />
                <span>Salir</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded transition shadow-md font-medium">
                <LogIn size={18} />
                <span>Ingresar</span>
              </Link>
            )}
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:bg-blue-700 p-2 rounded">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1 shadow-inner">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2">
            <Bus size={18}/> Inicio
          </Link>
          <Link to="/rutas-vivo" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2">
            <Map size={18}/> Rutas en Vivo
          </Link>
          <Link to="/recargar" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2">
            <CreditCard size={18}/> Recargar Saldo
          </Link>
          <Link to="/registro-tarjeta" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2">
            <User size={18}/> Registrar Tarjeta
          </Link>
          <div className="border-t border-blue-500 my-2 pt-2">
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md bg-sky-600 text-white font-bold text-center">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}