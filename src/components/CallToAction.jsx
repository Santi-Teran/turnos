import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center my-10 gap-10 bg-dark-blue dark:bg-arena text-arena dark:text-dark-blue mx-4 md:mx-20 p-6 md:p-12 rounded-3xl'>
      <h2 className={`${nunito.className} text-lg md:text-3xl font-black text-center`}>¿Listo para llevar tu negocio al siguiente nivel?</h2>
      <button className={`${nunito.className} text-base md:text-xl font-black gradient w-fit py-3 md:py-4 px-6 md:px-8 rounded-xl hover:scale-125 transition-transform`}>Habla con nosotros!</button>
    </div>
  )
}

export default CallToAction;
