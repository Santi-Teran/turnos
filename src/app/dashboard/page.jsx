'use client';
import BusinessForm from '@/components/BusinessForm';
import { handleUser } from '../api/handlers/handleUser';

const Dashboard = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='pt-20'>Hola, {userInfo.name}</h1>
      <BusinessForm initialData={userInfo} />
    </div>
  );
};

export default Dashboard;