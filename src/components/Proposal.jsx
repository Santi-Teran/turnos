import { Nunito } from "next/font/google";
import Image from "next/image";


const nunito = Nunito({ subsets: ["latin"] });

const Proposal = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 md:mx-20 my-10 gap-10">
      <h1 className={`${nunito.className} text-2xl md:text-4xl text-center font-bold mx-8 md:mx-32`}>Así Funciona Nuestra Plataforma</h1>
      <div className={`${nunito.className} grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mx-auto md:mx-40`}>
        <div className="flex flex-col gap-10 p-4 rounded-xl shadoww">
          <h3 className="text-center text-lg md:text-xl font-bold border-b border-dark-blue dark:border-arena">Atención personalizada y cercana</h3>
        </div>
        <div className="flex flex-col gap-10 p-4 rounded-xl shadoww">
          <h3 className="text-center text-lg md:text-xl font-bold border-b border-dark-blue dark:border-arena">Soluciones adaptadas a tus necesidades específicas</h3>
        </div>
        <div className="flex flex-col gap-10 p-4 rounded-xl shadoww">
          <h3 className="text-center text-lg md:text-xl font-bold border-b border-dark-blue dark:border-arena">Compromiso con la calidad y los detalles</h3>
        </div>
        <div className="flex flex-col gap-10 p-4 rounded-xl shadoww">
          <h3 className="text-center text-lg md:text-xl font-bold border-b border-dark-blue dark:border-arena">Experiencia y conocimiento del mercado local</h3>
        </div>
      </div>
      <button className={`${nunito.className} text-lg md:text-xl font-black gradient py-4 px-12 rounded-xl hover:scale-125 transition-transform`}>Contáctanos</button>
    </div>
  )
}

export default Proposal;
