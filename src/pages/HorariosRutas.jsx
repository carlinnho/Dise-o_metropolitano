import { useState } from 'react';
import { Search, Clock, MapPin, Calendar, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA DE EJEMPLO (Basada en el Metropolitano Real) ---
const SERVICES_DATA = {
  regular: [
    {
      id: 'A',
      name: 'Regular A',
      color: 'bg-blue-600',
      description: 'Naranjal - Estación Central (Vía Emancipación)',
      stops: ['Naranjal', 'Tomas Valle', 'Uni', 'Caqueta', 'Jirón de la Unión', 'Colmena', 'Central'],
      schedule: {
        week: '05:00 - 23:00',
        saturday: '05:00 - 23:00',
        sunday: '05:00 - 22:00'
      }
    },
    {
      id: 'B',
      name: 'Regular B',
      color: 'bg-orange-500',
      description: 'Naranjal - Matellini (Todas las estaciones)',
      stops: ['Naranjal', 'Izaguirre', 'Independencia', 'Uni', 'España', 'Central', 'Javier Prado', 'Canaval y Moreyra', 'Angamos', 'Benavides', 'Plaza de Flores', 'Matellini'],
      schedule: {
        week: '05:00 - 23:00',
        saturday: '05:00 - 23:00',
        sunday: '05:00 - 22:00'
      }
    },
    {
      id: 'C',
      name: 'Regular C',
      color: 'bg-green-600',
      description: 'Ramón Castilla - Matellini (Vía Vía Expresa)',
      stops: ['Castilla', 'Central', 'Javier Prado', 'Canaval y Moreyra', 'Angamos', 'Benavides', 'Plaza de Flores', 'Matellini'],
      schedule: {
        week: '05:00 - 23:00',
        saturday: '05:00 - 23:00',
        sunday: '05:00 - 22:00'
      }
    },
    {
      id: 'D',
      name: 'Regular D',
      color: 'bg-purple-600',
      description: 'Naranjal - Estación Central (Vía Alfonso Ugarte)',
      stops: ['Naranjal', 'Tomas Valle', 'Uni', 'Caqueta', '2 de Mayo', 'Quilca', 'Central'],
      schedule: {
        week: '05:00 - 10:00',
        saturday: 'Sin servicio',
        sunday: 'Sin servicio'
      }
    }
  ],
  expreso: [
    {
      id: 'EX1',
      name: 'Expreso 1',
      color: 'bg-red-600',
      description: 'Matellini - Central (Mañanas) / Central - Matellini (Tardes)',
      stops: ['Matellini', 'Benavides', 'Angamos', 'Canaval y Moreyra', 'Javier Prado', 'Central'],
      schedule: {
        week: '06:00 - 09:00 / 17:00 - 21:00',
        saturday: 'Sin servicio',
        sunday: 'Sin servicio'
      }
    },
    {
      id: 'EX2',
      name: 'Expreso 2',
      color: 'bg-yellow-500',
      description: 'Naranjal - 28 de Julio',
      stops: ['Naranjal', 'Tomas Valle', 'Uni', 'Caqueta', '2 de Mayo', 'Javier Prado', 'Canaval y Moreyra', 'Angamos', 'Benavides', '28 de Julio'],
      schedule: {
        week: '06:00 - 09:00 / 17:00 - 21:00',
        saturday: '06:00 - 13:00',
        sunday: 'Sin servicio'
      }
    }
  ],
  alimentador: [
    {
      id: 'AN-01',
      name: 'Tahuantinsuyo',
      color: 'bg-yellow-400',
      description: 'Estación Naranjal - Tahuantinsuyo',
      stops: ['Naranjal', 'Puno', 'Cusco', 'Tahuantinsuyo'],
      schedule: { week: '05:00 - 23:30', saturday: '05:00 - 23:30', sunday: '05:00 - 23:00' }
    },
    {
      id: 'AS-02',
      name: 'Cedros de Villa',
      color: 'bg-yellow-400',
      description: 'Estación Matellini - Cedros de Villa',
      stops: ['Matellini', 'Guardia Civil', 'Cedros'],
      schedule: { week: '05:00 - 23:30', saturday: '05:00 - 23:30', sunday: '05:00 - 23:00' }
    }
  ]
};

export default function HorariosRutas() {
  const [activeTab, setActiveTab] = useState('regular'); // regular, expreso, alimentador
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoute, setExpandedRoute] = useState(null);

  const toggleRoute = (id) => {
    setExpandedRoute(expandedRoute === id ? null : id);
  };

  const filteredRoutes = SERVICES_DATA[activeTab].filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.stops.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-3">Horarios y Rutas</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Consulta la información oficial actualizada de todos los servicios del Metropolitano.
            Planifica tu viaje conociendo los paraderos y horarios de operación.
          </p>
        </div>

        {/* Buscador y Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
              {['regular', 'expreso', 'alimentador'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all flex-1 md:flex-none ${
                    activeTab === tab 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar ruta o estación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Lista de Rutas */}
        <div className="space-y-4">
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden transition-all hover:shadow-lg">
                
                {/* Cabecera de la Tarjeta (Click para expandir) */}
                <div 
                  onClick={() => toggleRoute(route.id)}
                  className="p-5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${route.color} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform`}>
                      {route.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                        {route.name}
                      </h3>
                      <p className="text-sm text-slate-500">{route.description}</p>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {expandedRoute === route.id ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                {/* Detalles Expandibles */}
                <AnimatePresence>
                  {expandedRoute === route.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-6 grid md:grid-cols-2 gap-8">
                        
                        {/* Columna 1: Horarios */}
                        <div>
                          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-blue-600" /> Horario de Atención
                          </h4>
                          <div className="space-y-3 bg-white p-4 rounded-lg border border-slate-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 flex items-center gap-2"><Calendar size={14}/> Lunes a Viernes</span>
                              <span className="font-semibold text-slate-800">{route.schedule.week}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 flex items-center gap-2"><Calendar size={14}/> Sábados</span>
                              <span className="font-semibold text-slate-800">{route.schedule.saturday}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-500 flex items-center gap-2"><Calendar size={14}/> Domingos/Feriados</span>
                              <span className="font-semibold text-slate-800">{route.schedule.sunday}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-3 border border-blue-100">
                            <Info size={20} className="text-blue-600 mt-0.5" />
                            <p className="text-xs text-blue-800 leading-relaxed">
                              El horario puede variar en días festivos especiales. Las frecuencias de llegada son de 
                              <span className="font-bold"> 3 a 5 minutos</span> en hora punta.
                            </p>
                          </div>
                        </div>

                        {/* Columna 2: Estaciones */}
                        <div>
                          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-red-500" /> Paraderos Autorizados
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-slate-200 max-h-60 overflow-y-auto custom-scrollbar">
                            <ul className="space-y-0 relative">
                              {/* Línea conectora */}
                              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                              
                              {route.stops.map((stop, idx) => (
                                <li key={idx} className="flex items-center gap-3 relative z-10 py-1.5">
                                  <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-400"></div>
                                  <span className="text-sm text-slate-600">{stop}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-600">No se encontraron rutas</h3>
              <p className="text-slate-400 text-sm">Intenta con otro término de búsqueda.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}