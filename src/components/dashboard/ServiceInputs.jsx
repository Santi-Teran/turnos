export const ServiceNameInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1">
    <label>Nombre del Servicio</label>
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

export const ServiceDescriptionInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1">
    <label>Descripcion del Servicio</label>
    <textarea
      type="text"
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="bg-transparent resize-none h-20 border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

export const ServicePriceInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1 md:w-1/2">
    <label>Precio</label>
    <input
      type="text"
      name="price"
      value={formData.price}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

export const ServiceOverlapInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1 md:w-1/2">
    <label className="font-semibold text-gray-700">
      Duración del turno (minutos)
    </label>
    <input
      type="range"
      name="AppointmentDuration"
      min="0"
      max="120"
      step="5"
      value={formData.AppointmentDuration}
      onChange={handleChange}
      className="bg-blue-100 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <span className="text-sm text-gray-600">
      {formData.AppointmentDuration} minutos
    </span>
  </div>
);

export const ServiceDurationInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-1 md:w-1/2">
    <label className="font-semibold text-gray-700">
      Tiempo entre turnos (minutos)
    </label>
    <input
      type="range"
      name="TimeBetweenAppointments"
      min="0"
      max="120"
      step="5"
      value={formData.TimeBetweenAppointments}
      onChange={handleChange}
      className="bg-blue-100 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <span className="text-sm text-gray-600">
      {formData.TimeBetweenAppointments} minutos
    </span>
  </div>
);
