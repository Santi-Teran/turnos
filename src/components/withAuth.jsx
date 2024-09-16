import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      // Verificación inicial del token
      if (!token) {
        router.push("/login"); // Redirige al login si no hay token
      }

      // No eliminar el token en recarga o cierre de página
      // Eliminamos este listener para que no borre el token en ningún caso
      // El token debería ser eliminado solo cuando el usuario hace un logout explícito
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
