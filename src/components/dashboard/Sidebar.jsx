import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { MdDesignServices, MdOutlineWork, MdPerson } from "react-icons/md";

const NavLink = ({ href, icon: Icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={isActive ? 'text-cyan-500 font-bold flex gap-2 items-center text-lg' : 'flex gap-2 items-center text-lg text-gray-400'}
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
    <div className='w-1/6 bg-white text-dark-blue border-r border-light-gray'>
      <Image src='/mareatech.png' alt="Marea Tech" width={200} height={100} className="mx-auto my-5" />
      <ul className='flex flex-col gap-8 pl-12 my-20'>
        <NavLink href='/dashboard' icon={FaHouse} label='Dashboard' isActive={isActive('/dashboard')} />
        <NavLink href='/dashboard/negocio' icon={MdOutlineWork} label='Negocio' isActive={isActive('/dashboard/negocio')} />
        <NavLink href='/dashboard/servicios' icon={MdDesignServices} label='Servicios' isActive={isActive('/dashboard/servicios')} />
        <NavLink href='/dashboard/perfil' icon={MdPerson} label='Perfil' isActive={isActive('/dashboard/perfil')} />
      </ul>
    </div>
  );
};

export default Sidebar;