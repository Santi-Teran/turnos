import { Nunito } from "next/font/google";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"] });

const Proposal = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 my-10 md:mx-48 gap-10">
      <h1 className={`${nunito.className} text-2xl md:text-4xl text-center font-bold mx-8`}>Así Funciona Nuestra Plataforma</h1>
      <div className={`${nunito.className} w-full flex flex-col gap-10 md:gap-20`}>
        <div className="flex flex-col md:flex-row justify-center md:gap-20 gap-10 items-center">
          <div className="p-10 border rounded-3xl bg-dark-blue border-blue-900">
            <Image src='/signup.svg' alt="Registrate" width={250} height={100} className="border border-blue-900 rounded-xl gradient p-5"/>
          </div>
          <div className="flex flex-col gap-5 text-center md:text-start">
            <h2 className="text-2xl md:text-4xl font-bold">Registrate</h2>
            <p className="text-lg md:text-xl">Crea tu cuenta y configura tu negocio en minutos</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-center md:gap-20 gap-10 items-center">
          <div className="p-10 border rounded-3xl bg-dark-blue border-blue-900">
            <Image src='/web.svg' alt="Registrate" width={250} height={100} className="border border-blue-900 rounded-xl gradient p-5"/>
          </div>
          <div className="flex flex-col gap-5 text-center md:text-start">
            <h2 className="text-2xl md:text-4xl font-bold">Personaliza</h2>
            <p className="text-lg md:text-xl">Ajusta la apariencia y configuración de tu página según tus necesidades</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:gap-20 gap-10 items-center">
          <div className="p-10 border rounded-3xl bg-dark-blue border-blue-900">
            <Image src='/calendar.svg' alt="Registrate" width={250} height={100} className="border border-blue-900 rounded-xl gradient p-5"/>
          </div>
          <div className="flex flex-col gap-5 text-center md:text-start">
            <h2 className="text-2xl md:text-4xl font-bold">Gestiona Turnos</h2>
            <p className="text-lg md:text-xl">Empeza a recibir y gestionar turnos de tus clientes de forma eficiente</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposal;