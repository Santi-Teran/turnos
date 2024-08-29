import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const RestorePassword = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-5 mt-20 p-8 rounded-lg shadow-2xl w-full max-w-md gradient">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>
          Restaurar Contraseña
        </h1>
      </form>
    </div>
  );
};

export default RestorePassword;
