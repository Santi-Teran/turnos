import { Nunito } from "next/font/google";
import Link from 'next/link';

const nunito = Nunito({ subsets: ["latin"] });

const Services = ({ services, config }) => {
  const numOfServices = services.length;
  const gridColumns = numOfServices <= 1 ? 1 : numOfServices <= 2 ? 2 : numOfServices <= 3 ? 3 : 4;

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className={`${nunito.className} text-2xl sm:text-3xl md:text-4xl font-black`}>Servicios</h2>
      <div className={`grid grid-cols-1 md:grid-cols-${gridColumns} gap-5 p-5`}>
        {services.map(service => (
          <div key={service.id} className="flex flex-col gap-4 p-8 bg-dark-gray shadow-lg rounded-xl text-center">
            <div className="flex flex-col flex-grow gap-2">
              <h3 className={`${nunito.className} text-xl md:text-2xl font-bold`}>{service.name}</h3>
              <p className="text-md">{service.description || "Descripción del servicio..."}</p>
              <p className="text-md md:text-lg font-bold">Precio: ${service.price}</p>
            </div>
            <div className="flex items-end justify-center mt-auto">
              <Link 
                href={`/turnos/${config.id}`} 
                className={`${nunito.className} font-black gradient py-2 px-4 rounded-lg hover:scale-105 transition-transform`}
              >
                Reservar Turno
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;