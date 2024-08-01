import { useBusinessConfiguration } from "@/app/api/handlers/handleBusiness";
import ProfileDetail from "./ProfileDetail";
import { ProfileNameInput, ProfilePasswordInput } from "./ProfileInputs";

const ProfileForm = ({ initialData }) => {
  const { formData, handleChange, handleSubmit, isEditing, setIsEditing } = useBusinessConfiguration(initialData);

  return (
    <div className="flex justify-center items-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white text-dark-blue flex flex-col gap-8 my-10 p-8 rounded-lg shadow-lg w-fit m-10">
          <ProfileNameInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
          <ProfilePasswordInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
          <div className="flex justify-end gap-2">
            <button type="submit" className='text-lg bg-dark-blue text-arena font-black px-6 py-2 rounded-lg'>
              Guardar
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className='text-lg bg-red-500 text-white px-6 py-2 rounded-lg'>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <ProfileDetail 
          formData={formData} 
          handleChange={handleChange} 
          setIsEditing={setIsEditing} 
        />
      )}
    </div>
  );
};

export default ProfileForm;