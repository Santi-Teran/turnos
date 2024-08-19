import { usePathname } from 'next/navigation';
import Loading from '../Loading';
import { handleUser } from '@/app/api/handlers/handleUser';
import Image from 'next/image';
import Notifications from './Notifications';

const TopBar = () => {
  const { userInfo, loading, error } = handleUser();
  const pathname = usePathname();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const formatPathname = (path) => {
    const parts = path.split('/').filter(part => part !== '');
    if (parts[0] === 'dashboard' && parts.length === 1) return 'Dashboard';
    return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
  };

  return (
    <div className='bg-white border-b border-grayy text-dark-blue flex justify-between items-center px-10 py-2'>
      <h2 className='text-xl font-bold'>{formatPathname(pathname)}</h2>
      <div className='flex items-center gap-5'>
        <Notifications token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYW50aWFnb0BnbWFpbC5jb20iLCJuYmYiOjE3MjQwOTYzNzEsImV4cCI6MTcyNDA5ODE3MSwiaWF0IjoxNzI0MDk2MzcxfQ.3z9KlFbOm4VNQ_L2cvzHMZPMWSBnJ4Wa3yNsmIKdJjM" />
        <p className='md:flex hidden'>Hola {userInfo.name}!</p>
        { userInfo.userConfiguration.logoData ? (
          <Image 
          src={userInfo.userConfiguration.logoData}
          alt='Logo'
          width={50}
          height={50}
          style={{ height: 'auto' }} 
        />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TopBar;