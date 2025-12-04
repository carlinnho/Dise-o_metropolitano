import { Link } from 'react-router-dom';
import { CreditCard, Map, User, ChevronRight, Bus, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Variantes de animación
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Datos de Noticias (Simulados)
const newsData = [
  {
    id: 1,
    title: "Cierran tramo de Grau por obras de nueva Vía Expresa en Lima",
    date: "4 Dic, 2025",
    image: "https://imgmedia.larepublica.pe/1000x590/larepublica/original/2025/09/16/68c9b20bca52e22f020260a9.webp", // URL referencial
    description: "El cierre va hasta el 8 de diciembre y forma parte del proyecto que conectará la estación Central del Metropolitano con el Metro"
  },
  {
    id: 2,
    title: "Nueva forma de recarga con Yape y Plin",
    date: "1 Dic, 2025",
    image: "https://diariolaotracara.com/wp-content/uploads/2023/02/Untitled-design-10.png",
    description: "Ahora puedes recargar tu tarjeta sin colas desde tu aplicativo móvil favorito. ¡Dile adiós al efectivo!"
  },
  {
    id: 3,
    title: "Mantenimiento preventivo en Estación Central",
    date: "28 Nov, 2025",
    image: "https://pbs.twimg.com/media/Gf-EYMyWIAAiSKG?format=jpg&name=large",
    description: "Se realizarán mejoras en la infraestructura de ventilación este fin de semana. Toma precauciones."
  },
  {
    id: 4,
    title: "Desvios en la Ruta C y ruta A por manifestaciones en Lima",
    date: "25 Nov, 2025",
    image: "https://pbs.twimg.com/media/Gf-EYMyWIAAiSKG?format=jpg&name=large",
    description: "Debido a la presencia de manifestantes en el centro de Lima, los buses de la ruta regular C solo llegan hasta la estación Central, y la ruta regular A desvía su recorrido por la av. Alfonso Ugarte, con parada en la estación Quilca–El Peruano."
  }
];

export default function LandingPage() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  // Calcular el ancho arrastrable del carrusel
  useEffect(() => {
    if(carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const features = [
    {
      icon: CreditCard,
      title: 'Recarga en Línea',
      description: 'Recarga tu tarjeta desde cualquier lugar, 24/7, con Yape, Plin o Tarjetas.'
    },
    {
      icon: Map,
      title: 'Rutas en Tiempo Real',
      description: 'Visualiza la ubicación de los buses en vivo y planifica tu viaje sin esperas.'
    },
    {
      icon: User,
      title: 'Gestión de Tarjetas',
      description: 'Registra, personaliza y administra tus tarjetas del Metropolitano de forma segura.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-24 relative overflow-hidden">
        {/* Fondo animado sutil */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
        ></motion.div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Sistema Digital del <span className="text-sky-400">Metropolitano</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light">
              Transforma tu experiencia de viaje. Recarga tu saldo, consulta rutas y viaja seguro con nuestra nueva plataforma.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registro-tarjeta">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center justify-center w-full sm:w-auto transition-colors"
                >
                  Registrar Tarjeta
                  <ChevronRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/recargar">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-700 px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center justify-center w-full sm:w-auto hover:bg-gray-100 transition-colors"
                >
                  Recargar Saldo
                  <CreditCard className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800">Todo lo que necesitas en un solo lugar</h2>
          <p className="text-slate-500 mt-2">Simplificamos tu transporte diario</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <feature.icon size={40} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">{feature.title}</h3>
              <p className="text-slate-600 text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECCIÓN DE NOTICIAS (NUEVA) */}
      <div className="bg-slate-100 py-20 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-800">Noticias Recientes</h2>
              <p className="text-slate-500 mt-2">Mantente informado sobre el servicio</p>
            </motion.div>
            
            {/* Opción Ver más (Visual) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden sm:block"
            >
              <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 transition-colors cursor-default">
                Ver todas las noticias <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

          {/* Carrusel de Cards Arrastrable */}
          <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -width }} 
              className="flex gap-6 pb-4"
            >
              {newsData.map((news) => (
                <motion.div 
                  key={news.id} 
                  className="min-w-[300px] sm:min-w-[350px] bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 overflow-hidden relative">
                     <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                     <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                       NUEVO
                     </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <Calendar size={14} />
                      <span>{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{news.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3">{news.description}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                       <span className="text-sky-600 text-sm font-semibold hover:underline cursor-pointer">Leer artículo completo</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Botón Ver más para Móvil */}
          <div className="mt-6 text-center sm:hidden">
             <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 justify-center transition-colors">
                Ver todas las noticias <ArrowRight size={18} />
              </button>
          </div>

        </div>
      </div>

      {/* Stats Section Animada */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8 text-center text-white divide-y md:divide-y-0 md:divide-x divide-blue-500"
          >
            <StatItem icon={Bus} number="150+" label="Buses en Operación" delay={0} />
            <StatItem icon={Map} number="40+" label="Estaciones Conectadas" delay={0.2} />
            <StatItem icon={User} number="500K+" label="Usuarios Diarios" delay={0.4} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para animar cada estadística individualmente
function StatItem({ icon: Icon, number, label, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-4"
    >
      <div className="flex justify-center mb-2">
        <Icon className="w-8 h-8 opacity-75"/>
      </div>
      <motion.div 
        className="text-5xl font-extrabold mb-1"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: delay + 0.2 }}
      >
        {number}
      </motion.div>
      <div className="text-blue-200 font-medium tracking-wide">{label}</div>
    </motion.div>
  );
}