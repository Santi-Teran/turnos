import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../Loading";
import { handleUser } from "@/app/api/handlers/handleUser";
import Image from "next/image";
import Notifications from "./Notifications";
import { IoIosLogOut } from "react-icons/io";

const TopBar = () => {
  const { userInfo, loading, error } = handleUser();
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const formatPathname = (path) => {
    const parts = path.split("/").filter((part) => part !== "");
    if (parts[0] === "dashboard" && parts.length === 1) return "Dashboard";
    return (
      parts[parts.length - 1].charAt(0).toUpperCase() +
      parts[parts.length - 1].slice(1)
    );
  };

  const handleLogoutClick = () => {
    setShowModal(true); // Muestra el modal cuando se hace clic en el ícono de logout
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const cancelLogout = () => {
    setShowModal(false); // Cierra el modal si el usuario cancela
  };

  return (
    <div className="bg-white border-b border-grayy text-dark-blue flex justify-between items-center px-10 py-2">
      <h2 className="text-xl font-bold">{formatPathname(pathname)}</h2>
      <div className="flex items-center gap-5">
        <Notifications token={localStorage.token} />
        <IoIosLogOut
          className="text-3xl cursor-pointer"
          onClick={handleLogoutClick}
        />
        {userInfo.userConfiguration.logoData ? (
          <Image
            src={userInfo.userConfiguration.logoData}
            alt="Logo"
            width={50}
            height={50}
            style={{ height: "auto" }}
          />
        ) : (
          <></>
        )}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              ¿Estás seguro de que deseas cerrar sesión?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sí, cerrar sesión
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
