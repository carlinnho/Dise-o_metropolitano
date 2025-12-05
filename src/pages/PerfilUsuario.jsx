import { useState } from 'react';
import { CreditCard, Clock, MapPin, ShieldAlert, ChevronRight, Wallet, History, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function PerfilUsuario() {
  const navigate = useNavigate();
  
  const userData = {
    name: "Carlos Huamán", email: "carlos.huaman@utp.edu.pe",
    cards: [ { id: 1, code: "2938 4912 9982", alias: "Principal", balance: 15.50, type: "general" } ],
    history: [ { id: 1, date: "05 Dic, 08:30 AM", station: "Naranjal", type: "Ingreso", amount: -3.20 } ]
  };

  const handleLogout = () => { localStorage.removeItem('userToken'); window.dispatchEvent(new Event('storage')); navigate('/login'); };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-slate-800 text-white pb-24 pt-12 px-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">CH</div><div><h1 className="text-2xl font-bold">Hola, {userData.name}</h1></div></div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">Cerrar Sesión</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-slate-700 mb-4">Tarjeta Principal</h3>
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-6 text-white mb-6">
                <div className="flex justify-between mb-8"><span className="text-xs tracking-widest">METROPOLITANO</span><CreditCard/></div>
                <div className="text-2xl font-mono mb-2">{userData.cards[0].code}</div>
                <div className="text-3xl font-bold">S/ {userData.cards[0].balance.toFixed(2)}</div>
            </div>
            <Link to="/recargar" className="block w-full bg-blue-600 text-white py-3 rounded-xl text-center font-bold">Recargar Ahora</Link>
        </div>
      </div>
    </div>
  );
}