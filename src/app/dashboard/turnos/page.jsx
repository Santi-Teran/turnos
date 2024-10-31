"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { useServiceConfiguration } from "@/app/api/handlers/handleServices";
import { Inter } from "next/font/google";
import { handleUser } from "@/app/api/handlers/handleUser";
import Loading from "@/components/Loading";
import withAuth from "@/components/withAuth";
import TurnosForm from "@/components/dashboard/TurnosForm";
import TurnosDetail from "@/components/dashboard/TurnosDetails";
import { useAppointments } from "@/app/api/handlers/handleAppointments";
import TurnosFijosForm from "@/components/dashboard/TurnosFijosForm";
import { useHolidayConfiguration } from "@/app/api/handlers/handleHolidays";

const inter = Inter({ subsets: ["latin"] });

const TurnosPage = () => {
  const { userInfo, loading, error } = handleUser();
  const { services } = useServiceConfiguration({ id: userInfo?.id });
  const {
    appointments,
    loading: appointmentsLoading,
    handleUpdate,
    handleFixedUpdate,
    handleDelete,
    handleFixedDelete,
  } = useAppointments(userInfo?.id);
  const { holidays } = useHolidayConfiguration({ id: userInfo?.id });

  const appointmentList = appointments.appointments;
  const fixedAppointmentList = appointments.fixedAppointments;

  if (loading) return <Loading />;
  if (appointmentsLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex text-dark-blue`}>
      <Sidebar />
      <div className="bg-grayy md:w-5/6 w-full">
        <TopBar />
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 border-b-2 pb-4">
            <TurnosForm userInfo={userInfo} services={services} />
            <TurnosDetail
              services={services}
              holidays={holidays}
              appointments={appointmentList}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 mb-12">
            <TurnosFijosForm userInfo={userInfo} services={services} />
            <TurnosDetail
              services={services}
              holidays={holidays}
              appointments={fixedAppointmentList}
              handleUpdate={handleFixedUpdate}
              handleDelete={handleFixedDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(TurnosPage);
