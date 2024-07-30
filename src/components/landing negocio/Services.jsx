import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const Services = ({ services }) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className={`${nunito.className} text-2xl sm:text-3xl md:text-4xl font-black`}>Servicios</h2>
      <div className="flex gap-5">
        {services.map(service => (
          <div key={service.id} className="flex flex-col gap-5 p-5 border rounded-lg">
            <h3 className={`${nunito.className} text-xl md:text-2xl font-bold text-center`}>{service.name}</h3>
            <p className="text-md md:text-lg">{service.description || "Descripción del servicio..."}</p>
            <p className="text-md md:text-lg font-bold">Precio: ${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Services;