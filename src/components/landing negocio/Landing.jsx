import { Nunito } from "next/font/google";
import Link from 'next/link';

const nunito = Nunito({ subsets: ["latin"] });

const Landing = ({ config }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center mx-5 sm:mx-10 md:mx-20 gap-10 lg:gap-40 md:mt-32 mt-20">
      <div className="w-full lg:w-1/2 text-center flex flex-col items-center gap-6 sm:gap-12">
        <h1 className={`${nunito.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black`}>{config.userConfiguration.businessName}</h1>
        <h2 className="text-lg md:text-xl">{config.userConfiguration.description}</h2>
        <div className="flex items-center justify-center gap-5">
          <Link href={'/planes/2'} className={`${nunito.className} w-40 md:w-60 md:text-xl font-black gradient py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}>Sacar Turno</Link>
          <Link href={'/planes'} className={`${nunito.className} w-40 md:w-60 md:text-xl font-black bg-dark-blue border py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}>Ver Servicios</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;