import { Nunito } from "next/font/google";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"] });

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-5 md:gap-10 bg-dark-blue dark:bg-arena text-arena dark:text-dark-blue mx-4 md:mx-20 p-6 md:p-12 rounded-3xl">
      <h2
        className={`${nunito.className} text-lg md:text-3xl font-black text-center`}
      >
        ¿Listo para llevar tu negocio al siguiente nivel?
      </h2>
      <div className="flex items-center justify-center gap-5 text-center">
        <Link
          href={"/login-demo"}
          className={`${nunito.className} w-40 md:w-60 md:text-xl font-black gradient py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}
        >
          Probar Gratis
        </Link>
        <Link
          href={"/planes"}
          className={`${nunito.className} w-40 md:w-60 md:text-xl font-black border-2 border-dark-blue py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-xl hover:scale-105 transition-transform`}
        >
          Ver planes
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
