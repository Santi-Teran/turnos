import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { FaCalendarXmark, FaHouse } from "react-icons/fa6";
import { MdDesignServices, MdOutlineWork } from "react-icons/md";

const NavLink = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={isActive ? 'text-cyan-500 font-bold flex gap-2 items-center text-lg pl-10 py-4 hover:bg-cyan-200 transition-all' : 'flex gap-2 items-center text-lg pl-10 py-4 hover:bg-cyan-200 transition-all text-gray-400'}
    >
      <Icon className="text-2xl" />
      {label}
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
      <div className='w-1/6 bg-white text-dark-blue border-r border-light-gray md:flex flex-col hidden'>
        <Image src='/turnover-letra-dark.svg' alt="Turnover" width={200} height={100} className="mx-auto my-5" priority={true} />
        <ul className='flex flex-col my-10'>
          <NavLink href='/dashboard' icon={FaHouse} label='Dashboard' isActive={isActive('/dashboard')} />
          <NavLink href='/dashboard/calendario' icon={FaCalendarAlt} label='Calendario' isActive={isActive('/dashboard/calendario')} />
          <NavLink href='/dashboard/turnos' icon={FaCalendarCheck} label='Turnos' isActive={isActive('/dashboard/turnos')} />
          <NavLink href='/dashboard/negocio' icon={MdOutlineWork} label='Negocio' isActive={isActive('/dashboard/negocio')} />
          <NavLink href='/dashboard/servicios' icon={MdDesignServices} label='Servicios' isActive={isActive('/dashboard/servicios')} />
          <NavLink href='/dashboard/feriados' icon={FaCalendarXmark} label='Feriados' isActive={isActive('/dashboard/feriados')} />
        </ul>
      </div>

      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-dark-blue z-10'>
        <ul className='text-white flex justify-around'>
          <Link href={'/dashboard'} className='p-4 text-xl '><FaHouse /></Link>
          <Link href={'/dashboard/calendario'} className='p-4 text-xl '><FaCalendarAlt /></Link>
          <Link href={'/dashboard/turnos'} className='p-4 text-xl '><FaCalendarCheck /></Link>
          <Link href={'/dashboard/negocio'} className='p-4 text-xl '><MdOutlineWork /></Link>
          <Link href={'/dashboard/servicios'} className='p-4 text-xl '><MdDesignServices /></Link>
          <Link href={'/dashboard/feriados'} className='p-4 text-xl '><FaCalendarXmark /></Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;