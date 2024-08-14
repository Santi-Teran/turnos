import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const About = ({ config }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className={`${nunito.className} text-2xl sm:text-3xl md:text-4xl font-black`}>Sobre Nosotros</h2>
      <div className="flex flex-col md:flex-row gap-5 p-10 text-center">
        <div className="flex flex-col gap-4 p-8 bg-dark-gray shadow-lg rounded-xl text-justify">
          <h3 className={`${nunito.className} text-xl text-center md:text-2xl font-bold`}>Misión</h3>
          <p className="text-md">{config.userConfiguration.mision || "Nuestra misión es..."}</p>
        </div>
        <div className="flex flex-col gap-4 p-8 bg-dark-gray shadow-lg rounded-xl text-justify">
          <h3 className={`${nunito.className} text-xl text-center md:text-2xl font-bold`}>Visión</h3>
          <p className="text-md">{config.userConfiguration.vision || "Nuestra visión es..."}</p>
        </div>
        <div className="flex flex-col gap-4 p-8 bg-dark-gray shadow-lg rounded-xl text-justify">
          <h3 className={`${nunito.className} text-xl text-center md:text-2xl font-bold`}>Historia</h3>
          <p className="text-md">{config.userConfiguration.history || "Nuestra historia comienza..."}</p>
        </div>
      </div>
    </div>
  );
}

export default About;