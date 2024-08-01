export const ProfileNameInput = ({ formData, handleChange, isEditing }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Nombre</label>
      <input
        type="text"
        name="name"
        defaultValue={formData.name || ""}
        placeholder="Nombre"
        onChange={handleChange}
        className="bg-transparent border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const ProfileEmailInput = ({ formData, handleChange, isEditing }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Email</label>
      <input
        type="email"
        name="email"
        defaultValue={formData.email || ""}
        placeholder="Email"
        onChange={handleChange}
        className="bg-transparent border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
        required
      />
    </div>
  );
};

export const ProfilePasswordInput = ({ formData, handleChange, isEditing }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold">Contraseña</label>
      <input
        type="password"
        name="password"
        defaultValue={formData.password || ""}
        placeholder="Contraseña"
        onChange={handleChange}
        className="bg-transparent border-2 p-2 rounded-lg  text-black"
        readOnly={!isEditing}
      />
    </div>
  );
};