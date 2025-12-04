import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RegistroTarjeta from './pages/RegistroTarjeta';
import RecargarSaldo from './pages/RecargarSaldo';

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor flexible para empujar el footer hacia abajo */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* El contenido principal crece para llenar el espacio disponible */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registro-tarjeta" element={<RegistroTarjeta />} />
            <Route path="/recargar" element={<RecargarSaldo />} />
            
            {/* Rutas Placeholder */}
            <Route path="/rutas-vivo" element={
              <div className="flex items-center justify-center h-96 bg-slate-50">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-700">Rutas en Vivo</h2>
                  <p className="text-slate-500">Mapa GPS en construcción...</p>
                </div>
              </div>
            } />
            <Route path="/login" element={
              <div className="flex items-center justify-center h-96 bg-slate-50">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-700">Iniciar Sesión</h2>
                  <p className="text-slate-500">Módulo de autenticación en construcción...</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;