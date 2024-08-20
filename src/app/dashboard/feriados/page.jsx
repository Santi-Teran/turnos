'use client'
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { useServiceConfiguration } from '@/app/api/handlers/handleHolidays';
import { Inter } from "next/font/google";
import { handleUser } from '@/app/api/handlers/handleUser';
import Loading from '@/components/Loading';
import HolidaysForm from '@/components/dashboard/HolidaysForm';
import HolidaysDetail from '@/components/dashboard/HolidaysDetail';
import withAuth from "@/components/withAuth";

const inter = Inter({ subsets: ["latin"] });

const HolidaysPage = () => {
  const { userInfo, loading, error } = handleUser();
  const { holidays, formData, handleChange, handleSubmit, handleUpdate, handleDelete } = useServiceConfiguration({ id: userInfo?.id });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex text-dark-blue`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-8">
            <HolidaysForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <HolidaysDetail
              holidays={holidays}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(HolidaysPage);