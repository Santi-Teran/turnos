import Link from "next/link";
import { service } from "@/app/api/json/services";
import { Nunito } from "next/font/google";
import { FaArrowRight } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 md:mx-20 gap-10">
      <h1 className={`${nunito.className} text-2xl md:text-4xl text-center font-bold mx-8 md:mx-32`}>Lo que podés hacer!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-4 md:mx-20">
        {service.map((service, index) => (
          <div key={index} className="flex flex-col shadoww items-center gap-4 p-8 rounded-2xl dark:hover:bg-arena dark:hover:text-dark-blue transition-all hover:bg-dark-blue hover:text-arena">
            <div className="bg-verde-agua flex items-center justify-center rounded-full w-20 h-20 z-10">{service.icon}</div>
            <h3 className={`${nunito.className} text-xl font-bold text-center`}>{service.title}</h3>
            <Link href={'/servicios'}><FaArrowRight className="bg-verde-agua p-2 text-4xl rounded-full hover:scale-125 transition-transform" /></Link>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default Services;