import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { Search, Clock, Users, ArrowUpDown, Bus, Navigation } from 'lucide-react';

// --- 1. CONFIGURACIÓN GOOGLE MAPS ---
// Asegúrate de que esta librería esté instalada: npm install @react-google-maps/api
const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const center = { lat: -12.046374, lng: -77.042793 }; // Centro de Lima

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  styles: [ 
    { featureType: "geometry", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  ]
};

// --- 2. BASE DE DATOS DE COORDENADAS ---
const STATIONS_DB = {
  'Naranjal': { lat: -11.975548, lng: -77.061556 },
  'Izaguirre': { lat: -11.990432, lng: -77.060100 }, 
  'Tomas Valle': { lat: -12.008432, lng: -77.058913 },
  'Independencia': { lat: -12.015000, lng: -77.055000 },
  'Uni': { lat: -12.023845, lng: -77.049876 },
  'Caqueta': { lat: -12.035000, lng: -77.045000 },
  'Castilla': { lat: -12.040000, lng: -77.035000 },
  'Jirón de la Unión': { lat: -12.045000, lng: -77.030000 },
  'Colmena': { lat: -12.048000, lng: -77.032000 },
  'España': { lat: -12.052000, lng: -77.034000 },
  'Central': { lat: -12.059293, lng: -77.036667 },
  'Javier Prado': { lat: -12.090487, lng: -77.025684 },
  'Canaval y Moreyra': { lat: -12.096752, lng: -77.021654 },
  'Angamos': { lat: -12.105000, lng: -77.019000 },
  'Benavides': { lat: -12.125000, lng: -77.017000 },
  'Plaza de Flores': { lat: -12.140000, lng: -77.015000 },
  'Matellini': { lat: -12.170668, lng: -77.013531 },
};

const SERVICES = [
  { id: 'A', name: 'Regular A', color: 'bg-blue-600', strokeColor: '#2563eb', stops: ['Naranjal', 'Tomas Valle', 'Uni', 'Caqueta', 'Jirón de la Unión', 'Colmena', 'Central'] },
  { id: 'B', name: 'Regular B', color: 'bg-orange-500', strokeColor: '#f97316', stops: ['Naranjal', 'Izaguirre', 'Independencia', 'Uni', 'España', 'Central', 'Javier Prado', 'Canaval y Moreyra', 'Angamos', 'Benavides', 'Plaza de Flores', 'Matellini'] },
  { id: 'C', name: 'Regular C', color: 'bg-green-600', strokeColor: '#16a34a', stops: ['Castilla', 'Plaza de Flores', 'Benavides', 'Angamos', 'Javier Prado', 'Canaval y Moreyra', 'Central', 'Colmena', 'Jirón de la Unión'] },
  { id: 'EX1', name: 'Expreso 1', color: 'bg-red-600', strokeColor: '#dc2626', stops: ['Matellini', 'Benavides', 'Angamos', 'Canaval y Moreyra', 'Javier Prado', 'Central'] },
];

export default function RutasVivo() {
  // Cargar API KEY (Recuerda poner tu key real aquí o en tu .env)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAkPErvBQquyQLhmRLem7qy5xi6hW5dxu8", // <--- ¡PEGA TU API KEY AQUÍ!
    libraries,
  });

  // Estados
  const [selectedRoute, setSelectedRoute] = useState(SERVICES[1]); 
  const [direction, setDirection] = useState('NS'); // NS: Norte-Sur
  const [activeBuses, setActiveBuses] = useState([]);
  const [searchStation, setSearchStation] = useState('');
  const [selectedBusMap, setSelectedBusMap] = useState(null);

  // --- LÓGICA DE SIMULACIÓN ---
  useEffect(() => {
    // 1. Inicializar Buses
    const initBuses = () => {
      const buses = [];
      const numBuses = 4;
      for (let i = 0; i < numBuses; i++) {
        // Distribuirlos a lo largo de la ruta
        const startIdx = Math.floor((selectedRoute.stops.length - 1) * (i / numBuses));
        buses.push({
          id: 100 + i,
          nextStopIdx: startIdx + 1, // Índice de la estación hacia donde va
          progress: 0, // 0.0 a 1.0 (Progreso entre estación anterior y siguiente)
          lat: STATIONS_DB[selectedRoute.stops[startIdx]].lat,
          lng: STATIONS_DB[selectedRoute.stops[startIdx]].lng,
          occupancy: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low'
        });
      }
      setActiveBuses(buses);
    };
    initBuses();

    // 2. Loop de Movimiento
    const interval = setInterval(() => {
      setActiveBuses(prevBuses => {
        return prevBuses.map(bus => {
          // Obtener lista de paradas según dirección actual
          const stopsList = direction === 'NS' ? selectedRoute.stops : [...selectedRoute.stops].reverse();
          
          // Validación de seguridad por si cambia la ruta
          if (bus.nextStopIdx >= stopsList.length) return { ...bus, nextStopIdx: 1, progress: 0 };

          const prevName = stopsList[bus.nextStopIdx - 1];
          const nextName = stopsList[bus.nextStopIdx];
          
          const startCoords = STATIONS_DB[prevName] || center;
          const endCoords = STATIONS_DB[nextName] || center;

          // Mover progreso
          let newProgress = bus.progress + 0.015; // Velocidad del bus

          // Si llega a la estación destino
          if (newProgress >= 1) {
             const nextIdx = bus.nextStopIdx + 1;
             // Si termina la ruta, reinicia (Loop para demo)
             if (nextIdx >= stopsList.length) {
                 return { ...bus, nextStopIdx: 1, progress: 0, lat: endCoords.lat, lng: endCoords.lng };
             }
             return { ...bus, nextStopIdx: nextIdx, progress: 0, lat: endCoords.lat, lng: endCoords.lng };
          }

          // Interpolación de coordenadas (Matemática para mover el punto suavemente)
          const lat = startCoords.lat + (endCoords.lat - startCoords.lat) * newProgress;
          const lng = startCoords.lng + (endCoords.lng - startCoords.lng) * newProgress;

          return { ...bus, progress: newProgress, lat, lng };
        });
      });
    }, 100); // 100ms refresh rate

    return () => clearInterval(interval);
  }, [selectedRoute, direction]);

  // Lista de nombres de estaciones para renderizar
  const currentStopsNames = direction === 'NS' ? selectedRoute.stops : [...selectedRoute.stops].reverse();
  
  // Generar ruta para el Polyline del mapa
  const routePath = useMemo(() => {
    return currentStopsNames.map(name => STATIONS_DB[name]).filter(Boolean);
  }, [currentStopsNames]);


  // --- RENDER ---
  if (loadError) return <div className="p-10 text-center text-red-500">Error cargando Google Maps</div>;
  if (!isLoaded) return <div className="p-10 text-center flex items-center justify-center h-screen"><span className="animate-spin text-4xl text-blue-600">🌀</span></div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* 1. HEADER DE CONTROL */}
      <div className="bg-white shadow-md z-30 sticky top-0 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Botones de Servicio */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedRoute(service)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                    selectedRoute.id === service.id 
                      ? `${service.color} text-white border-transparent shadow-lg scale-105` 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold">{service.id}</span>
                  <span className="text-xs opacity-90 hidden sm:inline">{service.name}</span>
                </button>
              ))}
            </div>

            {/* Controles de Dirección y Búsqueda */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
               <button 
                  onClick={() => setDirection(direction === 'NS' ? 'SN' : 'NS')}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition text-sm font-semibold whitespace-nowrap"
                >
                  <ArrowUpDown size={16} />
                  {direction === 'NS' ? 'Norte ➔ Sur' : 'Sur ➔ Norte'}
                </button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar estación..."
                        value={searchStation}
                        onChange={(e) => setSearchStation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 grid lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
        
        {/* COLUMNA IZQUIERDA: Lista "Termómetro" */}
        <div className="lg:col-span-4 flex flex-col h-full overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <Clock size={18} className="text-blue-600"/> Ruta en Vivo
                </h3>
                <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {activeBuses.length} Unidades
                </span>
            </div>
            
            <div className="flex-grow overflow-y-auto p-0 relative custom-scrollbar">
                {/* Línea Vertical */}
                <div className="absolute left-[2.25rem] top-4 bottom-4 w-1 bg-slate-200 z-0"></div>

                <div className="divide-y divide-slate-100">
                    {currentStopsNames.map((stationName, index) => {
                        // Filtro de búsqueda
                        if (searchStation && !stationName.toLowerCase().includes(searchStation.toLowerCase())) return null;

                        // --- LÓGICA CORREGIDA DEL TERMÓMETRO ---
                        // Un bus está "en" esta estación (index) si:
                        // 1. Su destino es esta estación (nextStopIdx == index) Y está llegando (progress > 0.8)
                        // 2. O su destino es la siguiente (nextStopIdx == index + 1) Y apenas salió (progress < 0.2)
                        // NOTA: nextStopIdx es el índice en el array `currentStopsNames`
                        const busHere = activeBuses.find(b => {
                           const isArriving = b.nextStopIdx === index && b.progress > 0.8;
                           const isLeaving = b.nextStopIdx === index + 1 && b.progress < 0.2;
                           return isArriving || isLeaving;
                        });

                        return (
                            <div key={stationName} className="relative z-10 p-4 pl-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    {/* Círculo de la estación */}
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center border-4 z-10 bg-white transition-all duration-300
                                        ${busHere ? `border-${selectedRoute.color.replace('bg-', '')} scale-110 shadow-md` : 'border-slate-300'}
                                    `}>
                                        {busHere ? <Bus size={12} className="text-slate-700 animate-bounce"/> : <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h4 className={`text-sm font-bold ${busHere ? 'text-blue-800' : 'text-slate-600'}`}>{stationName}</h4>
                                            {busHere && (
                                                <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-sm shadow-sm">
                                                    BUS {busHere.id}
                                                </span>
                                            )}
                                        </div>
                                        {busHere && (
                                            <div className="flex items-center gap-2 mt-1 animate-fade-in">
                                                <Users size={12} className={
                                                    busHere.occupancy === 'high' ? 'text-red-500' : 
                                                    busHere.occupancy === 'medium' ? 'text-yellow-500' : 'text-emerald-500'
                                                }/>
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {busHere.occupancy === 'high' ? 'Lleno' : 'Asientos Disp.'}
                                                </span>
                                            </div>
                                        )}
                                        {!busHere && <span className="text-[10px] text-slate-400">Estación</span>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-1 text-[10px] text-slate-500 text-center">
                 <div className="flex flex-col items-center"><Users size={14} className="text-emerald-500"/>Libre</div>
                 <div className="flex flex-col items-center"><Users size={14} className="text-yellow-500"/>Medio</div>
                 <div className="flex flex-col items-center"><Users size={14} className="text-red-500"/>Lleno</div>
            </div>
        </div>

        {/* COLUMNA DERECHA: Mapa Google (Con @react-google-maps/api) */}
        <div className="lg:col-span-8 h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative">
             <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={mapOptions}
             >
                {/* 1. Línea de Ruta */}
                <Polyline
                    path={routePath}
                    options={{
                        strokeColor: selectedRoute.strokeColor,
                        strokeOpacity: 0.8,
                        strokeWeight: 6,
                    }}
                />

                {/* 2. Marcadores de Estaciones */}
                {routePath.map((coords, idx) => (
                    <Marker
                        key={`station-${idx}`}
                        position={coords}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 5,
                            fillColor: "#fff",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "#333"
                        }}
                        title={currentStopsNames[idx]}
                    />
                ))}

                {/* 3. Marcadores de Buses (Dinámicos) */}
                {activeBuses.map(bus => (
                    <Marker
                        key={bus.id}
                        position={{ lat: bus.lat, lng: bus.lng }}
                        onClick={() => setSelectedBusMap(bus)}
                        icon={{
                            url: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
                            scaledSize: new window.google.maps.Size(40, 40)
                        }}
                    />
                ))}

                {/* 4. Info Window (Popup) */}
                {selectedBusMap && (
                    <InfoWindow
                        position={{ lat: selectedBusMap.lat, lng: selectedBusMap.lng }}
                        onCloseClick={() => setSelectedBusMap(null)}
                    >
                        <div className="p-2 min-w-[150px]">
                            <h3 className="font-bold text-blue-700 mb-1 flex items-center gap-1">
                                <Bus size={14}/> Unidad {selectedBusMap.id}
                            </h3>
                            <p className="text-xs font-bold text-slate-700 mb-1">{selectedRoute.name}</p>
                            <div className="flex items-center gap-1 text-xs mb-1">
                                <Navigation size={12} className="text-slate-400"/>
                                <span>Destino: {currentStopsNames[currentStopsNames.length - 1]}</span>
                            </div>
                            <div className={`text-xs font-bold px-2 py-1 rounded text-center text-white
                                ${selectedBusMap.occupancy === 'high' ? 'bg-red-500' : 'bg-emerald-500'}
                            `}>
                                {selectedBusMap.occupancy === 'high' ? 'BUS LLENO' : 'ASIENTOS LIBRES'}
                            </div>
                        </div>
                    </InfoWindow>
                )}

                {/* Etiqueta Flotante */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-slate-200">
                     <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                         <Navigation size={16} className="text-blue-600"/>
                         GPS Satelital
                     </h2>
                     <p className="text-[10px] text-slate-500">Actualización: 100ms</p>
                </div>
             </GoogleMap>
        </div>

      </div>
    </div>
  );
}