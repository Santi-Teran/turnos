import { BusinessPreferences } from "./BusinessInputs";
import BusinessLinks from "./BusinessLinks";

const BusinessPreferencesDetail = ({ formData, setIsEditing }) => {
  return (
    <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue m-3">
      <BusinessLinks />
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