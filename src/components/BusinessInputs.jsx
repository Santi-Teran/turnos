// BusinessNameInput.jsx
export const BusinessNameInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-4 w-1/2">
    <label>Nombre del negocio</label>
    <input
      type="text"
      name="businessName"
      value={formData.businessName}
      placeholder="Escriba el nombre de su negocio"
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

// BusinessLogoInput.jsx
export const BusinessLogoInput = ({ handleChange }) => (
  <div className="flex flex-col gap-4 w-1/2">
    <label>Logo del negocio</label>
    <input
      type="file"
      name="logoData"
      onChange={handleChange}
      className="bg-transparent p-2 rounded-lg focus:outline-none focus:ring-0"
      required
    />
  </div>
);

// BusinessDescriptionInput.jsx
export const BusinessDescriptionInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-4">
    <label>Descripcion del negocio</label>
    <textarea
      name="description"
      value={formData.description}
      placeholder="Descripcion"
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

// BusinessHours.jsx
export const BusinessHours = ({ formData, handleChange }) => (
  <div className="flex justify-center gap-10">
    <div className="flex flex-col gap-4 w-1/2">
      <label>Horario de Apertura</label>
      <input
        type="number"
        name="dayStartTime"
        value={formData.dayStartTime}
        onChange={handleChange}
        placeholder="Hora de apertura (HH)"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-4 w-1/2">
      <label>Horario de Cierre</label>
      <input
        type="number"
        name="dayEndTime"
        value={formData.dayEndTime}
        onChange={handleChange}
        placeholder="Hora de cierre (HH)"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
  </div>
);

// BusinessSettings.jsx
export const BusinessSettings = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-4">
      <label>Duracion del turno (minutos)</label>
      <input
        type="number"
        name="appointmentDuration"
        value={formData.appointmentDuration}
        onChange={handleChange}
        placeholder="Duracion del turno"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-4">
      <label>Tiempo entre turnos (minutos)</label>
      <input
        type="number"
        name="timeBetweenAppointments"
        value={formData.timeBetweenAppointments}
        onChange={handleChange}
        placeholder="Tiempo entre turnos"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-4">
      <label>Dias cerrados</label>
      <select
        name="daysOff"
        value={formData.daysOff.split(';')}
        onChange={handleChange}
        multiple
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      >
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miercoles">Miercoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
        <option value="sabado">Sabado</option>
        <option value="domingo">Domingo</option>
      </select>
    </div>
    <div className="flex flex-col gap-4">
      <label>Turnos fijos</label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          name="fixedAppointmentsAvailable"
          checked={formData.fixedAppointmentsAvailable}
          onChange={handleChange}
          className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        />
        Sí
      </label>
    </div>
  </div>
);

export default BusinessSettings;