'use client';
import { HolidayDateInput, HolidayNameInput } from "./HolidaysInputs";

const HolidaysForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="p-4 border rounded shadow-lg bg-white w-fit flex flex-col gap-6">
      <h2 className="text-xl font-bold">Crear Feriado</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <HolidayNameInput formData={formData} handleChange={handleChange} />
        <HolidayDateInput formData={formData} handleChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Crear Feriado
        </button>
      </form>
    </div>
  );
};

export default HolidaysForm;