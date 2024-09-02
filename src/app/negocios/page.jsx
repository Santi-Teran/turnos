"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../api/api";
import { Nunito } from "next/font/google";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaInstagram, FaSearch, FaWhatsapp } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const NegociosPage = () => {
  const [business, setBusiness] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await getUsers();
        const info = response.data;
        setBusiness(info);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  // Filtrar por el nombre de negocio, verificando que businessName no sea null o undefined
  const filteredBusiness = business.filter((item) =>
    item.businessName
      ? item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  // Mostrar solo los primeros 10 negocios si no hay término de búsqueda
  const businessToShow = searchTerm ? filteredBusiness : business.slice(0, 10);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center gap-10 pt-32 pb-10">
        <h1 className="text-lg md:text-2xl lg:text-5xl font-black">
          Negocios que utilizan Turnover
        </h1>
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar negocios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-400 text-dark-blue"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {isLoading ? (
            <Loading />
          ) : businessToShow.length > 0 ? (
            businessToShow.map((item) => (
              <div
                key={item.id}
                className={`${nunito.className} flex flex-col gap-4 bg-dark-blue w-60 items-center text-center p-4 shadow-xl rounded-lg`}
              >
                <img src={item.logoData} width={60} alt={item.businessName} />
                <h3 className="text-xl font-bold">{item.businessName}</h3>
                <div className="flex items-center gap-4 text-xl">
                  <Link
                    target="_BLANK"
                    className="hover:scale-125 transition-all"
                    href={item.instagramLink ? item.instagramLink : ""}
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    target="_BLANK"
                    className="hover:scale-125 transition-all"
                    href={`https://wa.me/${item.phone}`}
                  >
                    <FaWhatsapp />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron negocios</p>
          )}
        </div>
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default NegociosPage;
