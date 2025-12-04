import { useState } from 'react';
import { User, CreditCard, Mail, Phone, BookOpen, Fingerprint } from 'lucide-react';

export default function RegistroTarjeta() {
  const [formData, setFormData] = useState({
    cardCode: '',
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    userType: 'general',
    universityCode: ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de conexión al backend
    console.log('Datos enviados:', formData);
    alert('Tarjeta registrada exitosamente (Simulación)');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          <div className="bg-blue-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-sky-300" />
              Registrar Tarjeta
            </h2>
            <p className="mt-2 text-blue-100">Asocia tu tarjeta del Metropolitano para proteger tu saldo.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Código de Tarjeta */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Código de Tarjeta (Reverso)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.cardCode}
                    onChange={(e) => handleChange('cardCode', e.target.value)}
                    placeholder="Ej: 22561764610"
                    className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Nombre Completo */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Nombres y Apellidos"
                    className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* DNI */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">DNI</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={formData.dni}
                    onChange={(e) => handleChange('dni', e.target.value)}
                    placeholder="12345678"
                    className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="usuario@ejemplo.com"
                    className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={9}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="987654321"
                    className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Tipo de Usuario */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Usuario</label>
                <select
                  value={formData.userType}
                  onChange={(e) => handleChange('userType', e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="general">Usuario General</option>
                  <option value="student">Estudiante (Medio Pasaje)</option>
                </select>
              </div>

              {/* Código Universitario (Condicional) */}
              {formData.userType === 'student' && (
                <div className="col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100 animate-fade-in">
                  <label className="block text-sm font-semibold text-blue-800 mb-2">Código Universitario</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.universityCode}
                      onChange={(e) => handleChange('universityCode', e.target.value)}
                      placeholder="U2020XXXX"
                      className="pl-10 block w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <p className="text-xs text-blue-600 mt-2">* Se requerirá validación presencial del carné.</p>
                </div>
              )}

            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:-translate-y-1"
              >
                Completar Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}