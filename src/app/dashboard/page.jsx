'use client';
import { Inter } from "next/font/google";
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import Loading from "@/components/Loading";
import { useAppointments } from '@/app/api/handlers/handleAppointments';
import { handleUser } from "../api/handlers/handleUser";
import BusinessSummary from "@/components/dashboard/BusinessSummary";
import withAuth from "@/components/withAuth";

const inter = Inter({ subsets: ["latin"] });

const DashboardPage = () => {
  const { userInfo, loading: userLoading, error: userError } = handleUser();
  const { appointments, services, loading: appointmentsLoading, error: appointmentsError } = useAppointments(userInfo?.id);

  if (userLoading || appointmentsLoading) return <Loading />;
  if (userError || appointmentsError) return <div>Error: {userError || appointmentsError}</div>;

  const appointmentList = appointments.appointments;
  const fixedAppointmentList = appointments.fixedAppointments;

  return (
    <div className={`${inter.className} flex text-dark-blue`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Resumen del Negocio</h1>
          <BusinessSummary 
            appointments={appointmentList} 
            fixedAppointments={fixedAppointmentList} 
            services={services} 
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);