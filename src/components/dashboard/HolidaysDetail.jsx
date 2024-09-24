"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const HolidaysDetail = ({ holidays, handleUpdate, handleDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedHoliday, setEditedHoliday] = useState({
    id: "",
    name: "",
    date: "",
  });

  // Formatear la fecha a dd-mm-aaaa
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Meses van de 0 a 11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedHoliday((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const startEditing = (holiday) => {
    setEditingId(holiday.id);
    setEditedHoliday(holiday);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedHoliday({ id: "", name: "", date: "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(editedHoliday);
    setEditingId(null);
    setEditedHoliday({ id: "", name: "", date: "" });
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Lista de Feriados</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Fecha</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {holidays.map((holiday) => (
            <tr
              key={holiday.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">
                {editingId === holiday.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedHoliday.name}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  holiday.name
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingId === holiday.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editedHoliday.date}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  formatDate(holiday.date)
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === holiday.id ? (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button
                      onClick={handleEditSubmit}
                      className="text-green-500"
                    >
                      <FaSave />
                    </button>
                    <button onClick={cancelEditing} className="text-red-500">
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-lg">
                    <button
                      onClick={() => startEditing(holiday)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(holiday.id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidaysDetail;
