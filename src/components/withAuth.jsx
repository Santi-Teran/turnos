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
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
