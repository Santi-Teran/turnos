import Image from "next/image";
import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import { MdDesignServices, MdOutlineWork, MdSettings } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='w-1/6 bg-white text-dark-blue border-r border-light-gray'>
      <Image src='/mareatech.png' alt="Marea Tech" width={200} height={100} className="mx-auto my-5" />
      <ul className='flex flex-col gap-8 pl-12 my-20'>
        <Link className="flex gap-2 items-center text-lg" href='/dashboard'><FaHouse className="text-2xl" />Dashboard</Link>
        <Link className="flex gap-2 items-center text-lg" href='/dashboard/negocio'><MdOutlineWork  className="text-2xl" />Negocio</Link>
        <Link className="flex gap-2 items-center text-lg" href='/dashboard/servicios'><MdDesignServices className="text-2xl" />Servicios</Link>
        <Link className="flex gap-2 items-center text-lg" href='/dashboard/configuracion'><MdSettings className="text-2xl" /> Configuracion</Link>
      </ul>
    </div>
  )
}

export default Sidebar;