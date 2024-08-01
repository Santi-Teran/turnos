'use client';
import { usePathname } from 'next/navigation';
import Loading from '../Loading';
import { handleUser } from '@/app/api/handlers/handleUser';
import Image from 'next/image';

const TopBar = () => {
  const { userInfo, loading, error } = handleUser();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  const pathname = usePathname();

  const formatPathname = (path) => {
    const parts = path.split('/').filter(part => part !== '');
    if (parts[0] === 'dashboard' && parts.length === 1) return 'Dashboard';
    return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
  };

  return (
    <div className='bg-white border-b border-grayy text-dark-blue flex justify-between items-center px-10 py-2'>
      <h2 className='text-xl font-bold'>{formatPathname(pathname)}</h2>
      <div className='flex items-center gap-5'>
        <p>Hola {userInfo.name}!</p>
        <Image 
          src={userInfo.userConfiguration.logoData}
          alt='Logo'
          width={50}
          height={0}
        />
      </div>
    </div>
  );
}

export default TopBar;