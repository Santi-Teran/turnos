import { BusinessDays, BusinessHours, BusinessSettings } from "./BusinessInputs";
import BusinessLinks from "./BusinessLinks";

const BusinessTurnosDetail = ({ formData, setIsEditing }) => {
  return (
    <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue m-3">
      <BusinessLinks />
      <div className="flex gap-10">
        <div className="flex md:flex-row flex-col gap-8">
          <div className="flex flex-col gap-8 md:w-3/5">
            <BusinessHours formData={formData} />
            <BusinessSettings formData={formData} />
          </div>
          <div className="md:w-2/5">
            <BusinessDays formData={formData} />
          </div>
        </div>
      </div>
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

export default BusinessTurnosDetail;