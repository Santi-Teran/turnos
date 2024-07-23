import { Nunito } from "next/font/google";
import { useBusinessConfiguration } from "@/app/api/handlers/handleBusiness";
import { BusinessDescriptionInput, BusinessHours, BusinessLogoInput, BusinessNameInput, BusinessSettings } from "./BusinessInputs";

const nunito = Nunito({ subsets: ["latin"] });

const BusinessForm = ({ initialData }) => {
  const { formData, handleChange, handleSubmit, isEditing, setIsEditing } = useBusinessConfiguration(initialData);

  return (
    <div className="flex justify-center items-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-arena text-dark-blue flex flex-col gap-8 my-10 p-8 rounded-lg shadoww w-full max-w-2xl">
          <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Configurar Negocio</h1>
          <div className="flex justify-center gap-10">
            <BusinessNameInput formData={formData} handleChange={handleChange} />
            <BusinessLogoInput handleChange={handleChange} />
          </div>
          <BusinessDescriptionInput formData={formData} handleChange={handleChange} />
          <BusinessHours formData={formData} handleChange={handleChange} />
          <BusinessSettings formData={formData} handleChange={handleChange} />
          <div className="flex justify-end gap-2">
            <button type="submit" className={`${nunito.className} text-lg bg-dark-blue text-arena font-black px-6 py-2 rounded-lg`}>
              Guardar
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className={`${nunito.className} text-lg bg-red-500 text-white px-6 py-2 rounded-lg`}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4 my-10 p-8 rounded-lg shadoww w-full max-w-2xl">
          <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Detalles del Negocio</h1>
          <p><strong>Nombre del negocio:</strong> {formData.userConfiguration.businessName || 'No disponible'}</p>
          <p><strong>Descripción:</strong> {formData.userConfiguration.description || 'No disponible'}</p>
          <p><strong>Horario de inicio:</strong> {formData.userConfiguration.dayStartTime || 'No disponible'}</p>
          <p><strong>Horario de cierre:</strong> {formData.userConfiguration.dayEndTime || 'No disponible'}</p>
          <button 
            type="button" 
            onClick={() => setIsEditing(true)} 
            className={`${nunito.className} text-lg bg-blue-500 text-white font-black px-6 py-2 rounded-lg mt-4`}>
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessForm;
