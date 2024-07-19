'use client'
import { Nunito } from "next/font/google";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"] });

const PlansDetail = () => {

  return (
    <div className={`${nunito.className} flex justify-center items-center h-screen px-4`}>
      <div className="bg-white text-dark-blue w-full max-w-2xl p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Plan Básico</h1>
          <p className="text-2xl font-semibold">$10.000/mes</p>
        </div>
        <p className="mb-6">Un plan ideal para pequeñas empresas que buscan funcionalidades básicas para gestionar sus reservas y clientes.</p>
        <h2 className="text-xl font-bold mb-2">Características:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Gestión de reservas ilimitadas</li>
          <li>Personalización de horarios</li>
          <li>Reportes detallados</li>
          <li>Soporte 24/7</li>
        </ul>
        <Link href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808490c3cfb60190cc6b955f02bd' className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Continuar</Link>
      </div>
    </div>
  );
};

export default PlansDetail;