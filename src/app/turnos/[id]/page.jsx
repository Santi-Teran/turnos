import { Inter } from "next/font/google";
import Form from '@/components/Form';

const inter = Inter({ subsets: ["latin"] });


const Turnos = ({ params }) => {

  return (
    <div className={`${inter.className} flex justify-center items-center h-screen bg-dark-gray`}>
      <Form userId={params.id} />
    </div>
  )
}

export default Turnos;