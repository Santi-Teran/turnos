import { services } from "../api/json/services";
import Link from "next/link";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const Servicios = () => {
  return (
    <div className="flex flex-col items-center py-32 gap-10">
      <h1 className="text-2xl md:text-5xl text-verde-agua font-black">Nuestros Servicios</h1>
      <h2 className={`${nunito.className} text-lg md:text-3xl text-center font-bold mx-4 md:mx-32`}>Descubre cómo podemos ayudarte a destacar en el mundo digital con un trato cercano y personalizado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mx-4 md:mx-20">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center gap-5 p-6 md:p-8 rounded-2xl shadoww">
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-verde-agua rounded-full mb-2 md:mb-4">
              {service.icon}
            </div>
            <h3 className={`${nunito.className} text-verde-agua text-lg md:text-3xl font-bold text-center mb-1 md:mb-2`}>{service.title}</h3>
            <p className="text-center text-base md:text-lg">{service.description}</p>
            <ul className="text-left mt-2 md:mt-4">
              <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Beneficios:</h4>
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="text-base md:text-lg mb-1">{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 

export default Servicios;