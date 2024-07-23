'use client';
import { Nunito } from "next/font/google";
import { useBusinessConfiguration } from "@/app/api/handlers/handleBusiness";
import { BusinessDescriptionInput, BusinessHours, BusinessLogoInput, BusinessNameInput, BusinessSettings } from "./BusinessInputs";

const nunito = Nunito({ subsets: ["latin"] });

const BusinessForm = () => {
  const { formData, handleChange, handleSubmit } = useBusinessConfiguration();

  return (
    <div className="flex justify-center items-center py-20">
      <form onSubmit={handleSubmit} className="bg-arena text-dark-blue flex flex-col gap-10 mt-20 p-8 rounded-lg shadoww w-full max-w-2xl">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>Configurar Negocio</h1>
        <div className="flex justify-center gap-10">
          <BusinessNameInput formData={formData} handleChange={handleChange} />
          <BusinessLogoInput handleChange={handleChange} />
        </div>
        <BusinessDescriptionInput formData={formData} handleChange={handleChange} />
        <BusinessHours formData={formData} handleChange={handleChange} />
        <BusinessSettings formData={formData} handleChange={handleChange} />
        <button type="submit" className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
