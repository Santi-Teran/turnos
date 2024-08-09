import BusinessLinks from "./BusinessLinks";
import { ProfileNameInput, ProfilePasswordInput } from "./ProfileInputs";

const ProfileDetail = ({ formData, setIsEditing }) => {
  return (
    <div className="flex flex-col gap-8 my-10 p-8 rounded-lg shadow-md bg-white text-dark-blue w-fit m-10">
      <BusinessLinks />
      <ProfileNameInput formData={formData} />
      <ProfilePasswordInput formData={formData} />
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

export default ProfileDetail;