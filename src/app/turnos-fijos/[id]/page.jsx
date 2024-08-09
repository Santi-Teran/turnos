import { Inter } from "next/font/google";
import Form from '@/components/FormFijos';

const inter = Inter({ subsets: ["latin"] });


const TurnosFijos = ({ params }) => {

  return (
    <div className={`${inter.className} flex justify-center items-center h-screen bg-dark-gray`}>
      <Form userId={params.id} />
    </div>
  )
}

export default TurnosFijos;