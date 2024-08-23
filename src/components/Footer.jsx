import Link from 'next/link';
import { FaRegCopyright } from "react-icons/fa6";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {

  const phoneNumber = '5492236343568'; // Reemplaza con tu número de teléfono en formato internacional
  const message = 'Hola, me gustaría obtener más información.'; // Reemplaza con tu mensaje predefinido
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className='flex justify-between p-2 shadoww bg-dark-blue text-arena flex-col items-center md:flex-row'>
      <div className='flex items-center gap-x-2'>
        <FaRegCopyright />
        <p className="text-sm lg:text-base">Turnorver | Powered by <Link href={'https://marea-tech.vercel.app/'} target='_BLANK' className='border-b hover:text-gray-400'>Marea Tech</Link>.</p>
      </div>
      <div className='flex text-lg lg:text-xl items-center gap-x-3'>
          <Link href={'/legal'} className='text-xs hover:underline mx-5'>Legal</Link>
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" ><FaWhatsapp /></Link>
          <Link href={'https://www.linkedin.com/company/marea-tech/'} target='_BLANK'><FaLinkedinIn /></Link>
          <Link href={'https://www.instagram.com/marea__tech/'} target='_BLANK'><FaInstagram /></Link>
      </div>
    </div>
  )
}