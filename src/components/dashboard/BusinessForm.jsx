import { useBusinessConfiguration } from "@/app/api/handlers/handleBusiness";
import { BusinessDescriptionInput, BusinessHours, BusinessLogoInput, BusinessNameInput, BusinessSettings } from "./BusinessInputs";
import BusinessDetail from "./BusinessDetail";

const BusinessForm = ({ initialData }) => {
  const { formData, handleChange, handleSubmit, isEditing, setIsEditing } = useBusinessConfiguration(initialData);

  return (
    <div className="flex justify-center items-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white text-dark-blue flex flex-col gap-8 my-10 p-8 rounded-lg shadow-lg w-full m-10">
          <h1 className='font-black'>Configurar Negocio</h1>
          <div className="flex gap-20">
            <div className="flex flex-col items-center">
              {formData.userConfiguration.logoData ? (
                <BusinessLogoInput formData={formData} handleChange={handleChange} />
              ) : (
                <BusinessLogoInput formData={formData} handleChange={handleChange} />
              )}
            </div>
            <div className="flex gap-20">
              <div className="w-1/2">
                <BusinessNameInput formData={formData} handleChange={handleChange} />
                <BusinessDescriptionInput formData={formData} handleChange={handleChange} />
                <BusinessHours formData={formData} handleChange={handleChange} />
              </div>
              <div className="w-1/2">
                <BusinessSettings formData={formData} handleChange={handleChange} />
              </div>
            </div>
          </div>
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
        <BusinessDetail 
          formData={formData} 
          handleChange={handleChange} 
          setIsEditing={setIsEditing} 
        />
      )}
    </div>
  );
};

export default BusinessForm;