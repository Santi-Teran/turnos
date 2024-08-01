import { useBusinessConfiguration } from "@/app/api/handlers/handleBusiness";
import { BusinessDescriptionInput, BusinessHistoryInput, BusinessLogoInput, BusinessMisionInput, BusinessNameInput, BusinessVisionInput } from "./BusinessInputs";
import BusinessGeneralDetail from "./BusinessGeneralDetail";

const BusinessGeneralForm = ({ initialData }) => {
  const { formData, handleChange, handleSubmit, isEditing, setIsEditing } = useBusinessConfiguration(initialData);

  return (
    <div className="flex justify-center items-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white text-dark-blue flex flex-col gap-8 my-10 p-8 rounded-lg shadow-lg w-fit m-10">
          <h1 className='font-black'>Configurar</h1>
          <div className="flex gap-10">
            <BusinessLogoInput formData={formData} handleChange={handleChange} />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <BusinessNameInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
                <BusinessDescriptionInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
              </div>
              <div className="flex gap-5">
                <BusinessMisionInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
                <BusinessVisionInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
                <BusinessHistoryInput formData={formData} handleChange={handleChange} isEditing={isEditing} />
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
        <BusinessGeneralDetail 
          formData={formData} 
          handleChange={handleChange} 
          setIsEditing={setIsEditing} 
        />
      )}
    </div>
  );
};

export default BusinessGeneralForm;