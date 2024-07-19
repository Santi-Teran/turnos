import Link from "next/link";
import projects from "../api/projects";
import { Nunito } from "next/font/google";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"] });

const Portafolio = () => {
  return (
    <div className="flex flex-col items-center py-32 gap-6 md:gap-10">
      <h1 className="text-lg md:text-2xl lg:text-5xl text-verde-agua font-black">Nuestro Portafolio</h1>
      <h2 className={`${nunito.className} text-sm md:text-lg lg:text-3xl text-center font-bold mx-2 md:mx-32`}>Explora algunos de nuestros proyectos recientes y descubre cómo hemos ayudado a nuestros clientes a alcanzar sus objetivos</h2>
      <div className="flex">
            {projects.map((project) => (
              <div key={project.id} className="embla flex flex-col justify-between w-full md:w-96 bg-white rounded-3xl p-4 md:p-10 gap-4 md:gap-6 dark:text-dark-blue">
                <div className='flex flex-col gap-4'>
                  <Link href={project.url} target='_BLANK' className='hover:text-gray-600'><h3 className='text-base md:text-3xl font-bold'>{project.title}</h3></Link>
                  <hr className='border-2'/>
                  <p className='text-sm md:text-base'>{project.description}</p>
                </div>
                <div className='bg-white rounded-xl overflow-hidden'>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={1080} 
                    height={1080} 
                    layout="responsive"
                    objectFit="cover"
                    className='w-full h-auto'
                  />
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Portafolio;