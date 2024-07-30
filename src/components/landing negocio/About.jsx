import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const About = ({ config }) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className={`${nunito.className} text-2xl sm:text-3xl md:text-4xl font-black`}>Sobre Nosotros</h2>
      <p className="text-lg md:text-xl mt-4">{config.userConfiguration.aboutUs || "Información general sobre el negocio..."}</p>
      <div className="flex flex-col gap-5 text-center">
        <div className="">
          <h3 className={`${nunito.className} text-xl md:text-2xl font-bold`}>Misión</h3>
          <p className="text-md md:text-lg">{config.userConfiguration.mission || "Nuestra misión es..."}</p>
        </div>
        <div className="">
          <h3 className={`${nunito.className} text-xl md:text-2xl font-bold`}>Visión</h3>
          <p className="text-md md:text-lg">{config.userConfiguration.vision || "Nuestra visión es..."}</p>
        </div>
        <div className="">
          <h3 className={`${nunito.className} text-xl md:text-2xl font-bold`}>Historia</h3>
          <p className="text-md md:text-lg">{config.userConfiguration.history || "Nuestra historia comienza..."}</p>
        </div>
      </div>
    </div>
  );
}

export default About;