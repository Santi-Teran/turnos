import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem('token'); // O de donde estés almacenando el token
      if (!token) {
        router.push('/login'); // Redirige al login si no hay token
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;