import Link from "next/link";
import { BusinessPreferences } from "./BusinessInputs";

const BusinessPreferencesDetail = ({ formData, setIsEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue w-fit m-10">
      <ul className="flex gap-10">
        <Link href='/dashboard/negocio'>General</Link>
        <Link href='/dashboard/negocio/turnos'>Turnos</Link>
        <Link href='/dashboard/negocio/preferencias'>Preferencias</Link>
      </ul>
      <BusinessPreferences formData={formData} />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-lg bg-blue-500 text-white font-black px-6 py-2 rounded-lg w-fit"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default BusinessPreferencesDetail;