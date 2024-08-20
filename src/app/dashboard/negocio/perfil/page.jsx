'use client';
import { Inter } from "next/font/google";
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import Loading from "@/components/Loading";
import { handleUser } from "@/app/api/handlers/handleUser";
import ProfileForm from "@/components/dashboard/ProfileForm";
import withAuth from "@/components/withAuth";

const inter = Inter({ subsets: ["latin"] });

const ProfilePage = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={`${inter.className} flex`}>
      <Sidebar />
      <div className='bg-grayy md:w-5/6'>
        <TopBar />
        <ProfileForm initialData={userInfo} />
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);