"use client";
import { handleUser } from "@/app/api/handlers/handleUser";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Preferences = ({ formData, setIsEditing }) => {
  const { loading, error } = handleUser();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className="bg-grayy w-5/6">
        <TopBar />
        <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue m-10">
          <ul className="flex gap-10">
            <Link href="/dashboard/negocio">Editar Negocio</Link>
            <Link href="/dashboard/negocio/preferencias">Preferencias</Link>
          </ul>
          <div className="flex gap-20">
            <div className="w-1/2">
              <div className="flex flex-col w-full gap-2">
                <label>Moneda</label>
                <input
                  type="text"
                  name="businessName"
                  // value={formData.userConfiguration.businessName}
                  placeholder=
                  //{
                  //   formData.userConfiguration.businessName
                  //     ? formData.userConfiguration.businessName
                      "Pesos"
                  //}
                  //onChange={handleChange}
                  className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
            <div className="flex flex-col w-full gap-2">
                <label>Lenguaje</label>
                <input
                  type="text"
                  name="businessName"
                  // value={formData.userConfiguration.businessName}
                  placeholder=
                  //{
                  //   formData.userConfiguration.businessName
                  //     ? formData.userConfiguration.businessName
                      "Español"
                  //}
                  //onChange={handleChange}
                  className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              //onClick={() => setIsEditing(true)}
              className="text-lg bg-blue-500 text-white font-black px-6 py-2 rounded-lg mt-4 w-fit"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
