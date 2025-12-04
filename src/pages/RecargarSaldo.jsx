import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle,
  Info,
} from "lucide-react";

export default function RecargarSaldo() {
  const [formData, setFormData] = useState({
    cardId: "",
    amount: "",
    paymentMethod: "yape",
  });

  const paymentMethods = [
    {
      id: "yape",
      name: "Yape",
      color: "bg-purple-600",
      icon: Smartphone,
      description: "Escanea QR",
    },
    {
      id: "plin",
      name: "Plin",
      color: "bg-sky-500",
      icon: Smartphone,
      description: "Escanea QR",
    },
    {
      id: "card",
      name: "Tarjeta",
      color: "bg-blue-600",
      icon: CreditCard,
      description: "Débito/Crédito",
    },
    {
      id: "cash",
      name: "Efectivo",
      color: "bg-emerald-600",
      icon: Banknote,
      description: "Generar Código",
    },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePresetAmount = (value) => {
    setFormData({ ...formData, amount: value.toString() });
  };

  const handleSubmit = () => {
    if (formData.cardId && formData.amount) {
      alert(
        `Procesando recarga de S/ ${
          formData.amount
        } con ${formData.paymentMethod.toUpperCase()}...`
      );
    } else {
      alert("Por favor complete el ID de tarjeta y el monto.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Recargar Saldo
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* COLUMNA IZQUIERDA: Formulario */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                1
              </div>
              Datos de la Recarga
            </h3>

            <div className="space-y-6">
              {/* ID Tarjeta */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID de Tarjeta / DNI
                </label>
                <input
                  type="text"
                  value={formData.cardId}
                  onChange={(e) => handleChange("cardId", e.target.value)}
                  placeholder="Ej: 22561764610"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                />
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monto a Recargar (S/)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400 font-bold">
                    S/.
                  </span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none font-bold text-lg text-slate-700"
                  />
                </div>

                {/* Botones de Monto Rápido */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[5, 10, 20, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handlePresetAmount(amount)}
                      className={`py-2 rounded-lg text-sm font-semibold transition ${
                        formData.amount === amount.toString()
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      S/ {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de Método de Pago */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Método de Pago
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleChange("paymentMethod", method.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                        formData.paymentMethod === method.id
                          ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                          : "border-slate-100 bg-white hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div
                          className={`p-2 rounded-full ${method.color} text-white`}
                        >
                          <method.icon size={18} />
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm ${
                              formData.paymentMethod === method.id
                                ? "text-blue-900"
                                : "text-slate-700"
                            }`}
                          >
                            {method.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      {formData.paymentMethod === method.id && (
                        <div className="absolute top-2 right-2 text-blue-600">
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.cardId || !formData.amount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 mt-4"
              >
                Pagar S/ {formData.amount || "0.00"}
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Detalles del Pago */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                2
              </div>
              Confirmación
            </h3>

            <div className="flex-1">
              {/* Tarjeta Visual Dinámica */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="font-bold tracking-widest text-sm text-slate-400">
                    METROPOLITANO
                  </div>
                  <CreditCard className="text-white opacity-80" />
                </div>
                <div className="text-2xl font-mono tracking-widest mb-4">
                  {formData.cardId
                    ? formData.cardId.match(/.{1,10}/g)?.join(" ")
                    : "••••••••••"}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-slate-400 uppercase">
                      Saldo a recargar
                    </div>
                    <div className="text-xl font-bold text-sky-400">
                      S/ {formData.amount || "0.00"}
                    </div>
                  </div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">
                    LIMA PASS
                  </div>
                </div>
              </div>

              {/* Instrucciones Dinámicas */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                {formData.paymentMethod === "yape" && (
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
                      <Smartphone className="text-purple-600" />
                    </div>
                    <h4 className="font-bold text-purple-900">
                      Pagar con Yape
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Escanea el QR o yapea al número oficial.
                    </p>
                    <div className="bg-slate-100 w-32 h-32 mx-auto rounded-lg flex items-center justify-center text-xs text-slate-400 font-mono border-2 border-dashed border-slate-300">
                      QR CODE
                    </div>
                    <p className="font-mono font-bold text-slate-800 mt-2">
                      960-142-988
                    </p>
                  </div>
                )}
                {formData.paymentMethod === "plin" && (
                  <div className="text-center">
                    <div className="bg-sky-100 p-3 rounded-full inline-block mb-3">
                      <Smartphone className="text-sky-600" />
                    </div>
                    <h4 className="font-bold text-sky-900">Pagar con Plin</h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Escanea el QR desde tu app bancaria.
                    </p>
                    <div className="bg-slate-100 w-32 h-32 mx-auto rounded-lg flex items-center justify-center text-xs text-slate-400 font-mono border-2 border-dashed border-slate-300">
                      QR CODE
                    </div>
                    <p className="font-mono font-bold text-slate-800 mt-2">
                      960-142-988
                    </p>
                  </div>
                )}
                {formData.paymentMethod === "card" && (
                  <div className="text-left space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <CreditCard size={16} className="text-blue-600" />
                      </div>
                      <h4 className="font-bold text-blue-900">
                        Tarjeta Débito/Crédito
                      </h4>
                    </div>
                    <input
                      type="text"
                      placeholder="Número de Tarjeta"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      disabled
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        disabled
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                      <Info size={12} /> Pasarela segura de PayU
                    </p>
                  </div>
                )}
                {formData.paymentMethod === "cash" && (
                  <div className="text-center">
                    <div className="bg-emerald-100 p-3 rounded-full inline-block mb-3">
                      <Banknote className="text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-emerald-900">
                      Pago en Efectivo
                    </h4>
                    <p className="text-sm text-slate-600">
                      Se generará un código CIP.
                    </p>
                    <div className="mt-4 bg-slate-100 p-3 rounded border border-slate-200">
                      <p className="text-xs text-slate-500 uppercase">
                        Código CIP (Simulado)
                      </p>
                      <p className="font-mono text-xl font-bold tracking-wider text-slate-800">
                        2938 4921
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resumen Final */}
            {formData.amount && (
              <div className="mt-6 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-medium">S/ {formData.amount}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-500">Comisión:</span>
                  <span className="font-medium text-emerald-600">S/ 0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-800">
                  <span>Total a Pagar:</span>
                  <span>S/ {formData.amount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
