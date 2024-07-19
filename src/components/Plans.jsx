import { Nunito } from "next/font/google";
import plans from "@/app/api/plans";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"] });

const Plans = () => {
  return (
    <div className={`${nunito.className} flex flex-col gap-20 my-10 mx-6`}>
      <h2 className="text-2xl md:text-4xl font-bold text-center">Planes y Precios</h2>
      <div className="flex flex-col md:flex-row justify-center">
        {plans.map((plan, index) => (
          <div key={index} className={`flex flex-col gap-4 p-8 rounded-lg shadow-2xl gradient ${ index === 1 ? "transform scale-110 relative z-10" : "" }`}>
            <h3 className="text-2xl font-bold ">{plan.title}</h3>
            <p>{plan.description}</p>
            <p className="text-2xl font-bold ">{plan.price}</p>
            <p className="text-xs">{plan.cancellation}</p>
            <ul className="flex flex-col gap-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <FaCheckCircle />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={`/planes/${plan.id}`} className="mx-auto bg-blue-600 font-bold px-6 py-2 rounded-lg hover:bg-blue-800 transition">Elegir Plan</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;