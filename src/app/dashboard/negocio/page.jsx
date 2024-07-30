'use client';
import { handleUser } from "@/app/api/handlers/handleUser";
import BusinessForm from "@/components/dashboard/BusinessForm";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const BussinesPage = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className='bg-grayy w-5/6'>
        <TopBar />
        <div>
          <BusinessForm initialData={userInfo} />
        </div>
      </div>
    </div>
  )
}

export default BussinesPage;