'use client'
import ServiceForm from '@/components/dashboard/ServiceForm';
import ServiceDetail from '@/components/dashboard/ServiceDetail';
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { useServiceConfiguration } from '@/app/api/handlers/handleServices';
import { Inter } from "next/font/google";
import { handleUser } from '@/app/api/handlers/handleUser';
import Loading from '@/components/Loading';

const inter = Inter({ subsets: ["latin"] });

const ServicePage = () => {
  const { userInfo, loading, error } = handleUser();
  const { services, formData, handleChange, handleSubmit, handleUpdate, handleDelete } = useServiceConfiguration({ id: userInfo?.id });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex text-dark-blue`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <div className="p-4">
          <div className="flex flex-col items-center gap-8">
            <ServiceForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <ServiceDetail
              services={services}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;