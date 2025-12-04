export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-medium">&copy; 2025 Metropolitano de Lima. Todos los derechos reservados.</p>
        <p className="text-sm text-slate-400 mt-2">Sistema de Gestión Digital - Versión 1.0</p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-slate-300">
          <a href="#" className="hover:text-sky-400">Términos y Condiciones</a>
          <span>|</span>
          <a href="#" className="hover:text-sky-400">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}