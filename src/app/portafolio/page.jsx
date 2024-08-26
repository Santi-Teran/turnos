import projects from "../api/json/projects";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";

const Portafolio = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center pt-32 pb-10 gap-6 md:gap-10">
        <h1 className="text-lg md:text-2xl lg:text-5xl text-verde-agua font-black">
          Nuestro Portafolio
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 bg-arena mx-10 rounded p-5 items-center">
          {projects.map((project) => (
            <Image
              key={project.id}
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              className="rounded"
            />
          ))}
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Portafolio;
