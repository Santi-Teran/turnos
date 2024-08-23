"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Nunito } from "next/font/google";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"] });

const PlansDetail = () => {
  return (
    <div>
      <NavBar />
      <div
        className={`${nunito.className} flex justify-center items-center h-screen px-4 bg-blue`}
      >
        <div className="flex flex-col gap-4 w-full max-w-2xl p-6 rounded-lg shadow-lg bg-dark-blue">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Plan Básico</h1>
            <p className="text-2xl font-semibold">$10.000/mes</p>
          </div>
          <p>
            Un plan ideal para pequeñas empresas que buscan funcionalidades
            básicas para gestionar sus reservas y clientes.
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Características:</h2>
            <ul className="list-disc list-inside">
              <li>Gestión de reservas ilimitadas</li>
              <li>Personalización de horarios</li>
              <li>Reportes detallados</li>
              <li>Soporte 24/7</li>
            </ul>
          </div>
          <Link
            href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808490c3cfb60190cc6b955f02bd"
            className="w-fit font-black bg-arena text-black py-2 px-4 rounded-lg hover:scale-105 transition-all"
          >
            Continuar
          </Link>
          <p className="text-center text-sm mx-10">Al hacer click en este botón, acepto que he leído la <Link href={'/legal'} className="hover:underline">Política de privacidad</Link> y permito que Marea Tech almacene mis datos para poder procesar la solicitud.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlansDetail;
