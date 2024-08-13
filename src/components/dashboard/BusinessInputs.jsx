"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";

export const BusinessNameInput = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Nombre del negocio</label>
      <input
        type="text"
        name="businessName"
        defaultValue={userConfig.businessName || ""}
        placeholder="Nombre del negocio"
        onChange={handleChange}
        className="bg-transparent border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const BusinessMisionInput = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Mision</label>
      <textarea
        type="text"
        name="mision"
        defaultValue={userConfig.mision || ""}
        placeholder="Mision"
        onChange={handleChange}
        className="bg-transparent h-40 border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const BusinessVisionInput = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Vision</label>
      <textarea
        type="text"
        name="vision"
        defaultValue={userConfig.vision || ""}
        placeholder="Vision"
        onChange={handleChange}
        className="bg-transparent h-40 border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const BusinessHistoryInput = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Historia</label>
      <textarea
        type="text"
        name="history"
        defaultValue={userConfig.history || ""}
        placeholder="Historia"
        onChange={handleChange}
        className="bg-transparent h-40 border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const BusinessLogoInput = ({ formData, handleChange, isEditing }) => {
  const [logo, setLogo] = useState(null);
  const userConfig = formData.userConfiguration || {};

  useEffect(() => {
    if (userConfig.logoData) {
      setLogo(userConfig.logoData);
    }
  }, [userConfig.logoData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
      handleChange({
        ...e,
        target: { ...e.target, name: "logoData", value: reader.result },
      });
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

export const BusinessDescriptionInput = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">Descripcion del negocio</label>
      <textarea
        name="description"
        defaultValue={userConfig.description || ""}
        placeholder="Descripcion"
        onChange={handleChange}
        className="bg-transparent border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const BusinessHours = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex md:flex-row flex-col gap-2 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Horario de Apertura</label>
          <input
            type="number"
            name="dayStartTime"
            defaultValue={userConfig.dayStartTime || ""}
            onChange={handleChange}
            placeholder="Hora de apertura (HH)"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Horario de Cierre</label>
          <input
            type="number"
            name="dayEndTime"
            defaultValue={userConfig.dayEndTime || ""}
            onChange={handleChange}
            placeholder="Hora de cierre (HH)"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-2 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Inicio del descanso</label>
          <input
            type="number"
            name="breakStartHour"
            defaultValue={userConfig.breakStartHour || ""}
            onChange={handleChange}
            placeholder="Inicio del descanso (HH)"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Duracion del descanso</label>
          <input
            type="number"
            name="breakDuration"
            defaultValue={userConfig.breakDuration || ""}
            onChange={handleChange}
            placeholder="Duracion del descanso (HH)"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export const BusinessSettings = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Duracion del turno (minutos)</label>
        <input
          type="number"
          name="appointmentDuration"
          defaultValue={userConfig.appointmentDuration || ""}
          onChange={handleChange}
          placeholder="Duracion del turno"
          className="bg-transparent border-2 p-2 rounded-lg"
          readOnly={!isEditing}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Tiempo entre turnos (minutos)</label>
        <input
          type="number"
          name="timeBetweenAppointments"
          defaultValue={userConfig.timeBetweenAppointments || ""}
          onChange={handleChange}
          placeholder="Tiempo entre turnos"
          className="bg-transparent border-2 p-2 rounded-lg"
          readOnly={!isEditing}
          required
        />
      </div>
    </div>
  );
};

export const BusinessDays = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">Dias cerrados</label>
      <select
        name="daysOff"
        defaultValue={userConfig.daysOff ? userConfig.daysOff.split(";") : []}
        onChange={handleChange}
        multiple
        className="bg-transparent h-40 overflow-hidden border-2 p-2 rounded-lg"
        readOnly={!isEditing}
      >
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miércoles">Miércoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
        <option value="sábado">Sábado</option>
        <option value="domingo">Domingo</option>
      </select>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Turnos fijos</label>
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="fixedAppointmentsAvailable"
            defaultChecked={!!userConfig.fixedAppointmentsAvailable}
            onChange={handleChange}
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
          />
          Sí
        </label>
      </div>
    </div>
  );
};

export const BusinessPreferences = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};

  return (
    <div className="flex flex-col gap-10">
      <div className="flex md:flex-row flex-col gap-10 md:gap-20 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Moneda</label>
          <input
            type="text"
            name="currency"
            defaultValue={userConfig.currency || ""}
            onChange={handleChange}
            placeholder="Moneda"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Lenguaje</label>
          <input
            type="text"
            name="language"
            defaultValue={userConfig.language || ""}
            onChange={handleChange}
            placeholder="Lenguaje"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-10 md:gap-20 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">WhatsApp</label>
          <input
            type="string"
            name="phone"
            defaultValue={userConfig.phone || ""}
            onChange={handleChange}
            placeholder="WhatsApp"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Instagram</label>
          <input
            type="text"
            name="instagramLink"
            defaultValue={userConfig.instagramLink || ""}
            onChange={handleChange}
            placeholder="Instagram"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
      </div>
    </div>
  )
};