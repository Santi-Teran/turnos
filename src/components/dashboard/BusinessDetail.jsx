import Image from "next/image";
import { BusinessDescriptionInput, BusinessHours, BusinessNameInput, BusinessSettings } from "./BusinessInputs";
import Link from "next/link";

const BusinessDetail = ({ formData, setIsEditing }) => {
  return (
    <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue w-full m-10">
      <ul className="flex gap-10">
        <Link href='/dashboard/negocio' >Editar Negocio</Link >
        <Link href='/dashboard/negocio/preferencias' >Preferencias</Link >
      </ul>
      <div className="flex gap-20">
        <Image
          src={formData.userConfiguration.logoData}
          alt="Logo"
          width={100}
          height={100}
          className="h-fit"
        />
        <div className="flex gap-20">
          <div className="w-1/2">
            <BusinessNameInput formData={formData} />
            <BusinessDescriptionInput formData={formData} />
            <BusinessHours formData={formData} />
          </div>
          <div className="w-1/2">
            <BusinessSettings formData={formData} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-lg bg-blue-500 text-white font-black px-6 py-2 rounded-lg mt-4 w-fit"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default BusinessDetail;