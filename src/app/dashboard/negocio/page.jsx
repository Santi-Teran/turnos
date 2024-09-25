"use client";
import { handleUser } from "@/app/api/handlers/handleUser";
import BusinessGeneralForm from "@/components/dashboard/BusinessGeneralForm";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import Loading from "@/components/Loading";
import withAuth from "@/components/withAuth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const BusinessPage = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className="bg-grayy md:w-5/6 w-full">
        <TopBar />
        <BusinessGeneralForm initialData={userInfo} />
      </div>
    </div>
  );
};

export default withAuth(BusinessPage);
