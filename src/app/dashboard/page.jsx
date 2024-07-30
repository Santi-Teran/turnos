'use client';
import { Inter } from "next/font/google";
import { handleUser } from '../api/handlers/handleUser';
import BusinessForm from '@/components/BusinessForm';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const inter = Inter({ subsets: ["latin"] });

const Dashboard = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className='bg-grayy w-5/6'>
        <TopBar />
        <div className="py-20">
          {userInfo.id}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;