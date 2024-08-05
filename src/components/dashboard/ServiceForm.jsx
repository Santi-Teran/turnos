'use client';
import { ServiceDescriptionInput, ServiceNameInput, ServiceOverlapInput, ServicePriceInput } from "./ServiceInputs";

const ServiceForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white w-fit flex flex-col gap-6">
      <h2 className="text-xl font-bold">Crear Servicio</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <ServiceNameInput formData={formData} handleChange={handleChange} />
        <ServiceDescriptionInput formData={formData} handleChange={handleChange} />
        <div className="flex md:flex-row flex-col md:items-center gap-5">
          <ServicePriceInput formData={formData} handleChange={handleChange} />
          <ServiceOverlapInput formData={formData} handleChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Crear Servicio
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;