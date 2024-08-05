'use client';
import { Inter } from "next/font/google";
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import Loading from "@/components/Loading";
import { useAppointments } from '@/app/api/handlers/handleAppointments';
import { handleUser } from "../api/handlers/handleUser";
import CalendarView from "@/components/dashboard/Calendar";

const inter = Inter({ subsets: ["latin"] });

const DashboardPage = () => {
  const { userInfo, loading: userLoading, error: userError } = handleUser();
  const { appointments, services, loading: appointmentsLoading, error: appointmentsError } = useAppointments(userInfo?.id);

  if (userLoading || appointmentsLoading) return <Loading />;
  if (userError || appointmentsError) return <div>Error: {userError || appointmentsError}</div>;

  const appointmentList = appointments.appointments;

  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <CalendarView 
          appointments={appointmentList} 
          services={services} 
          userConfiguration={userInfo?.userConfiguration} 
        />
      </div>
    </div>
  );
};

export default DashboardPage;