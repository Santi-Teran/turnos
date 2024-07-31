'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";

export const BusinessNameInput = ({ formData, handleChange }) => (
  <div className="flex flex-col w-full gap-2">
    <label>Nombre del negocio</label>
    <input
      type="text"
      name="businessName"
      defaultValue={formData.userConfiguration.businessName}
      placeholder={formData.userConfiguration.businessName ? formData.userConfiguration.businessName : "Nombre del negocio"}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

export const BusinessLogoInput = ({ formData, handleChange }) => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (formData.userConfiguration.logoData) {
      setLogo(formData.userConfiguration.logoData);
    }
  }, [formData.userConfiguration.logoData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
      handleChange({ ...e, target: { ...e.target, name: 'logoData', value: reader.result } });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <input
        type="file"
        name="logoData"
        onChange={handleFileChange}
        className="hidden"
        id="logo-upload"
      />
      <label
        htmlFor="logo-upload"
        className="relative cursor-pointer flex justify-center items-center w-24 h-24"
      >
        {logo ? (
          <div>
            <Image
              src={logo}
              alt="Logo"
              width={10}
              height={10}
              className="rounded-full w-full h-full object-cover"
            />
            <MdEdit className="bg-blue-600 text-white rounded-full p-1 text-2xl absolute right-0 bottom-2" />
          </div>
        ) : (
          <div className="text-center">Subir Logo</div>
        )}
      </label>
    </div>
  );
};

export const BusinessDescriptionInput = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-2">
    <label>Descripcion del negocio</label>
    <textarea
      name="description"
      defaultValue={formData.userConfiguration.description}
      placeholder={formData.userConfiguration.description ? formData.userConfiguration.description : "Descripcion"}
      onChange={handleChange}
      className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0 text-black"
      required
    />
  </div>
);

export const BusinessHours = ({ formData, handleChange }) => (
  <div className="flex justify-center">
    <div className="flex flex-col gap-2 w-1/2">
      <label>Horario de Apertura</label>
      <input
        type="number"
        name="dayStartTime"
        defaultValue={formData.userConfiguration.dayStartTime}
        onChange={handleChange}
        placeholder="Hora de apertura (HH)"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-2 w-1/2">
      <label>Horario de Cierre</label>
      <input
        type="number"
        name="dayEndTime"
        defaultValue={formData.userConfiguration.dayEndTime}
        onChange={handleChange}
        placeholder="Hora de cierre (HH)"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
  </div>
);

export const BusinessSettings = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <label>Duracion del turno (minutos)</label>
      <input
        type="number"
        name="appointmentDuration"
        defaultValue={formData.userConfiguration.appointmentDuration}
        onChange={handleChange}
        placeholder="Duracion del turno"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-2">
      <label>Tiempo entre turnos (minutos)</label>
      <input
        type="number"
        name="timeBetweenAppointments"
        defaultValue={formData.userConfiguration.timeBetweenAppointments}
        onChange={handleChange}
        placeholder="Tiempo entre turnos"
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        required
      />
    </div>
    <div className="flex flex-col gap-2">
      <label>Dias cerrados</label>
      <select
        name="daysOff"
        defaultValue={formData.userConfiguration.daysOff ? formData.userConfiguration.daysOff.split(';') : []}
        onChange={handleChange}
        multiple
        className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
      >
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miércoles">Miércoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
        <option value="sábado">Sábado</option>
        <option value="domingo">Domingo</option>
      </select>
    </div>
    <div className="flex flex-col gap-2">
      <label>Turnos fijos</label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          name="fixedAppointmentsAvailable"
          defaultChecked={formData.userConfiguration.fixedAppointmentsAvailable}
          onChange={handleChange}
          className="bg-transparent border-2 p-2 rounded-lg focus:outline-none focus:ring-0"
        />
        Sí
      </label>
    </div>
  </div>
);

export default BusinessSettings;