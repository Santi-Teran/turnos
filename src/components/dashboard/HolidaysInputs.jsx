export const HolidayNameInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1">
    <label>Nombre del Feriado</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

export const HolidayDateInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1">
    <label>Fecha del Feriado</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);