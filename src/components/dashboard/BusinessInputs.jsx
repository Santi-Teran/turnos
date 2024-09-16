"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
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

export const BusinessDescriptionInput = ({
  formData,
  handleChange,
  isEditing,
}) => {
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
  const [breakDuration, setBreakDuration] = useState(
    userConfig.breakDuration || 0
  );

  useEffect(() => {
    setBreakDuration(userConfig.breakDuration || 0);
  }, [userConfig.breakDuration]);

  const handleRangeChange = (e) => {
    const { name, value } = e.target; // Asegúrate de que name está definido
    const intValue = parseInt(value, 10);

    // Actualiza el formData correctamente
    handleChange({
      target: { name, value: intValue }, // Verifica que name no sea undefined
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex md:flex-row flex-col gap-2 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Horario de Apertura</label>
          <input
            type={isEditing ? "time" : "text"}
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
            type={isEditing ? "time" : "text"}
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
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Inicio del descanso</label>
          <input
            type={isEditing ? "time" : "text"}
            name="breakStartHour"
            defaultValue={userConfig.breakStartHour || ""}
            onChange={handleChange}
            placeholder="Inicio del descanso (HH)"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Duracion del descanso</label>
          <div className="flex items-center gap-2">
            <input
              type={isEditing ? "range" : "text"}
              min="0"
              max="60"
              value={breakDuration}
              name="breakDuration"
              onChange={handleRangeChange}
              placeholder="Duracion del descanso (min)"
              className={
                isEditing
                  ? "w-3/4"
                  : "bg-transparent w-full border-2 p-2 rounded-lg"
              }
              readOnly={!isEditing}
            />
            {isEditing ? (
              <span className="w-1/4">{breakDuration} min</span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BusinessSettings = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};
  const [appointmentDuration, setAppointmentDuration] = useState(
    userConfig.appointmentDuration || 0
  );
  const [timeBetweenAppointments, setTimeBetweenAppointments] = useState(
    userConfig.timeBetweenAppointments || 0
  );

  useEffect(() => {
    // Set appointment duration and time between appointments only if user config changes
    setAppointmentDuration(userConfig.appointmentDuration || 0);
    setTimeBetweenAppointments(userConfig.timeBetweenAppointments || 0);
  }, [userConfig.appointmentDuration, userConfig.timeBetweenAppointments]);

  const handleRangeChange = (e) => {
    const { name, value } = e.target; // Asegúrate de que name está definido
    const intValue = parseInt(value, 10);

    // Actualiza el formData correctamente
    handleChange({
      target: { name, value: intValue }, // Verifica que name no sea undefined
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Duracion del turno</label>
        <div className="flex items-center gap-2">
          <input
            type={isEditing ? "range" : "text"}
            name="appointmentDuration"
            min="0"
            max="120"
            value={appointmentDuration}
            onChange={handleRangeChange}
            placeholder="Duracion del turno"
            className={
              isEditing
                ? "w-3/4"
                : "bg-transparent w-full border-2 p-2 rounded-lg"
            }
            readOnly={!isEditing}
            required
          />
          {isEditing ? (
            <span className="w-1/4">{appointmentDuration} min</span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Tiempo entre turnos</label>
        <div className="flex items-center gap-2">
          <input
            type={isEditing ? "range" : "text"}
            min="0"
            max="60"
            name="timeBetweenAppointments"
            value={timeBetweenAppointments}
            onChange={handleRangeChange}
            placeholder="Tiempo entre turnos"
            className={
              isEditing
                ? "w-3/4"
                : "bg-transparent w-full border-2 p-2 rounded-lg"
            }
            readOnly={!isEditing}
            required
          />
          {isEditing ? (
            <span className="w-1/4">{timeBetweenAppointments} min</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export const BusinessDays = ({ formData, handleChange, isEditing }) => {
  const userConfig = formData.userConfiguration || {};
  const [showModal, setShowModal] = useState(false);

  const days = [
    { label: "Lunes", value: "lunes" },
    { label: "Martes", value: "martes" },
    { label: "Miércoles", value: "miércoles" },
    { label: "Jueves", value: "jueves" },
    { label: "Viernes", value: "viernes" },
    { label: "Sábado", value: "sábado" },
    { label: "Domingo", value: "domingo" },
  ];

  const selectedDays = userConfig.daysOff ? userConfig.daysOff.split(";") : [];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDays = checked
      ? [...selectedDays, value]
      : selectedDays.filter((day) => day !== value);

    const event = {
      target: {
        name: "daysOff",
        value: updatedDays.join(";"),
      },
    };
    handleChange(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label className="font-semibold">Días cerrados</label>
        <FaQuestionCircle
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
          className="cursor-pointer"
        />
        {showModal && (
          <div className="z-20 bg-white text-black p-2 border border-gray-300 rounded shadow-lg w-40">
            Seleccione los días en los que estará cerrado.
          </div>
        )}
      </div>

      {/* Checkbox para cada día */}
      <div className="flex flex-col gap-2">
        {days.map((day) => (
          <label key={day.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="daysOff"
              value={day.value}
              checked={selectedDays.includes(day.value)}
              onChange={handleCheckboxChange}
              className="bg-transparent border-2 p-2 rounded-lg"
              disabled={!isEditing}
            />
            {day.label}
          </label>
        ))}
      </div>

      {/* Turnos fijos */}
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
        {/* Moneda */}
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Moneda</label>
          <select
            name="currency"
            defaultValue={userConfig.currency || ""}
            onChange={handleChange}
            className="bg-transparent border-2 p-2 rounded-lg"
            disabled={!isEditing}
            required
          >
            <option value="">Seleccionar moneda</option>
            <option value="ARS">Pesos Argentinos</option>
            <option value="USD">Dólares</option>
          </select>
        </div>

        {/* Lenguaje */}
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Lenguaje</label>
          <select
            name="language"
            defaultValue={userConfig.language || ""}
            onChange={handleChange}
            className="bg-transparent border-2 p-2 rounded-lg"
            disabled={!isEditing}
            required
          >
            <option value="">Seleccionar lenguaje</option>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
      </div>

      {/* WhatsApp e Instagram */}
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

      {/* País y Estado/Provincia */}
      <div className="flex md:flex-row flex-col gap-10 md:gap-20 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">País</label>
          <input
            type="text"
            name="country"
            defaultValue={userConfig.address?.country || ""}
            onChange={handleChange}
            placeholder="Pais"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Estado o Provincia</label>
          <input
            type="text"
            name="state"
            defaultValue={userConfig.address?.state || ""}
            onChange={handleChange}
            placeholder="Estado o Provincia"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
      </div>

      {/* Ciudad y Dirección */}
      <div className="flex md:flex-row flex-col gap-10 md:gap-20 justify-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Ciudad</label>
          <input
            type="text"
            name="city"
            defaultValue={userConfig.address?.city || ""}
            onChange={handleChange}
            placeholder="Ciudad"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>

        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="font-semibold">Dirección</label>
          <input
            type="text"
            name="addressLine"
            defaultValue={userConfig.address?.addressLine || ""}
            onChange={handleChange}
            placeholder="Dirección"
            className="bg-transparent border-2 p-2 rounded-lg"
            readOnly={!isEditing}
            required
          />
        </div>
      </div>
    </div>
  );
};
