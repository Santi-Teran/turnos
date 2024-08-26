import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      // Verificación inicial del token
      if (!token) {
        router.push('/login'); // Redirige al login si no hay token
      }

      // Borrar el token al cerrar la página (no en recarga)
      const handleUnload = () => {
        localStorage.removeItem('token');
      };

      window.addEventListener('unload', handleUnload);

      // Limpieza del evento al desmontar el componente
      return () => {
        window.removeEventListener('unload', handleUnload);
      };
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;