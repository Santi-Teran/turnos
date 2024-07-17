import { Nunito } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/mareatech.png';

const nunito = Nunito({ subsets: ["latin"] });

const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center mx-5 sm:mx-10 md:mx-20 my-10 gap-10 lg:gap-40 md:mt-32 mt-20">
      <div className="w-full lg:w-1/2 text-center flex flex-col items-center gap-6 sm:gap-12">
        <Link href='/' className='md:w-1/3 w-1/2'>
          <Image src={logo} alt='Marea Tech'/>
        </Link>
        <h1 className={`${nunito.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black`}>Organizá tus turnos sin esfuerzo!</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl">La solución ideal para gestionar turnos en cualquier tipo de negocio</h2>
        <div className="flex items-center justify-center gap-5">
          <Link href={'/servicios'} className={`${nunito.className} w-40 md:w-60 text-base sm:text-lg md:text-xl font-black gradient py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}>Probar Gratis</Link>
          <Link href={'/servicios'} className={`${nunito.className} w-40 md:w-60 text-base sm:text-lg md:text-xl font-black border py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}>Ver planes</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;