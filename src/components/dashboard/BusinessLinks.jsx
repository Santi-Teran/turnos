import Link from "next/link";
import { usePathname } from "next/navigation";

const BusinessLinks = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <ul className="flex gap-10">
      <Link className={isActive('/dashboard/negocio') ? 'text-cyan-500 font-bold border-b-2 border-cyan-500' : 'text-gray-400'} href='/dashboard/negocio'>General</Link>
      <Link className={isActive('/dashboard/negocio/turnos') ? 'text-cyan-500 font-bold border-b-2 border-cyan-500' : 'text-gray-400'} href='/dashboard/negocio/turnos'>Turnos</Link>
      <Link className={isActive('/dashboard/negocio/preferencias') ? 'text-cyan-500 font-bold border-b-2 border-cyan-500' : 'text-gray-400'} href='/dashboard/negocio/preferencias'>Preferencias</Link>
    </ul>
  )
}

export default BusinessLinks;
