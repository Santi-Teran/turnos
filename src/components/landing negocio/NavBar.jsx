'use client'
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = ({ config }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-dark-gray flex justify-center items-center fixed w-full z-20 p-6'>
      <div className='absolute left-5'>
        <Image src={config.userConfiguration.logoData} alt={config.userConfiguration.businessName} width={40} height={0} />
      </div>
      <div className='hidden md:flex gap-20 items-center'>
        <Link className='hover:scale-105 hover:border-b border-arena transition-all' href='/'>Inicio</Link>
        <Link className='hover:scale-105 hover:border-b border-arena transition-all' href='/servicios'>Servicios</Link>
        <Link className='hover:scale-105 hover:border-b border-arena transition-all' href='/portafolio'>Turnos</Link>
        <Link className='hover:scale-105 hover:border-b border-arena transition-all' href='/planes'>Contacto</Link>
      </div>
      <div className='md:hidden absolute right-0 m-5'>
        <button onClick={toggleMenu} className='text-3xl focus:outline-none'>
          <FiMenu />
        </button>
      </div>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-80 z-30 flex flex-col items-end md:hidden'>
          <div className='bg-dark-blue rounded-lg shadow-lg w-60 h-full'>
            <button onClick={toggleMenu} className='absolute right-0 m-5 text-3xl'><FiX /></button>
            <nav className='flex flex-col items-start gap-10 p-10 pt-20 text-xl'>
              <Link onClick={toggleMenu} className='hover:scale-105 hover:border-b border-arena transition-all' href='/'>Inicio</Link>
              <Link onClick={toggleMenu} className='hover:scale-105 hover:border-b border-arena transition-all' href='/servicios'>Servicios</Link>
              <Link onClick={toggleMenu} className='hover:scale-105 hover:border-b border-arena transition-all' href='/portafolio'>Turnos</Link>
              <Link onClick={toggleMenu} className='hover:scale-105 hover:border-b border-arena transition-all' href='/planes'>Contacto</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;