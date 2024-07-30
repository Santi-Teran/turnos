import { Nunito } from "next/font/google";
import { MdMailOutline, MdOutlineMessage, MdPersonOutline } from "react-icons/md";
import { BiBuildingHouse, BiPhone } from "react-icons/bi";

const nunito = Nunito({ subsets: ["latin"] });

const Contact = ({ config }) => {
  return (
    <div className="flex flex-col items-center gap-20 mx-4 md:mx-40">
      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-40">
        <div className="lg:w-1/3 flex flex-col gap-10">
          <h1 className="text-2xl md:text-4xl text-verde-agua font-black">Contactanos!</h1>
          <h2 className={`${nunito.className} text-lg md:text-xl font-light`}>Estamos aquí para ayudarte. Completa el formulario a continuación o utiliza nuestras vías de contacto</h2>
          <ul className="flex flex-col gap-4 md:gap-10">
            <li className="flex items-center gap-2"><MdMailOutline className="text-lg md:text-xl text-verde-agua" />{config.userConfiguration.email || "Email del negocio..."}</li>
            <li className="flex items-center gap-2"><BiBuildingHouse className="text-lg md:text-xl text-verde-agua" />{config.userConfiguration.address || "Dirección del negocio..."}</li>
            <li className="flex items-center gap-2"><BiPhone className="text-lg md:text-xl text-verde-agua" />{config.userConfiguration.phone || "Teléfono del negocio..."}</li>
          </ul>
        </div>

        <form className="lg:w-1/3 flex flex-col gap-5">
          <div className="flex justify-between items-center p-3 rounded-lg border-2 border-verde-agua bg-transparent">
            <input placeholder="Nombre" className="bg-transparent placeholder:text-gray-300 focus:outline-none focus:ring-0 w-full" />
            <MdPersonOutline className="text-lg md:text-xl"/>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg border-2 border-verde-agua bg-transparent">
            <input placeholder="Mail" className="bg-transparent placeholder:text-gray-300 focus:outline-none focus:ring-0 w-full" />
            <MdMailOutline className="text-lg md:text-xl"/>
          </div>
          <div className="flex justify-between items-start p-3 rounded-lg border-2 border-verde-agua bg-transparent">
            <textarea placeholder="Mensaje" className="w-full bg-transparent placeholder:text-gray-300 focus:outline-none focus:ring-0 resize-none h-32 md:h-40" />
            <MdOutlineMessage className="text-lg md:text-xl"/>
          </div>
          <button className={`${nunito.className} text-lg font-bold gradient w-fit py-3 px-6 md:px-9 rounded-xl hover:scale-105 transition-transform`}>Enviar</button>
        </form>
      </div>
    </div>
  )
}


export default Contact;