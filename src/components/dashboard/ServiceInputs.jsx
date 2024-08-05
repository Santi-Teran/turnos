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
      type="number"
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
    <label>Turnos a la vez</label>
    <input
      type="number"
      name="overlapNumber"
      value={formData.overlapNumber}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);