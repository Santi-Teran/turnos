import testimonies from "@/app/api/json/testimonies";
import { Nunito } from "next/font/google";
import { FaStar } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const Testimonies = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-4 md:mx-20 gap-10">
      <h2 className={`${nunito.className} text-2xl md:text-4xl text-center font-bold mb-10 mx-4 md:mx-32`}>Lo que dicen nuestros clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-4 md:mx-20">
        {testimonies.map((testimony, index) => (
          <div key={index} className="flex flex-col items-center gap-5 p-4 rounded-xl shadoww">
            <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
            <h3 className="text-lg md:text-xl font-bold">{testimony.name}</h3>
            <h4 className="text-sm md:text-base text-gray-500">{testimony.company}</h4>
            <p className="text-sm md:text-base text-center text-gray-400">{testimony.content}</p>
            <div className="flex gap-2 text-verde-agua">
              {Array.from({ length: testimony.stars }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonies;