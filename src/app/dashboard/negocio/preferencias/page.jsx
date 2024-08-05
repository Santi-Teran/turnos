'use client';
import { handleUser } from "@/app/api/handlers/handleUser";
import BusinessPreferencesForm from "@/components/dashboard/BusinessPreferencesForm";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import Loading from "@/components/Loading";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const PreferencesPage = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <div>
          <BusinessPreferencesForm initialData={userInfo} />
        </div>
      </div>
    </div>
  )
}

export default PreferencesPage;