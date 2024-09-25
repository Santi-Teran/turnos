import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-4 overflow-x-auto">
      {/* FLECHA IZQUIERDA */}
      <button
        onClick={() => paginate(currentPage - 1)}
        className={`text-gray-400 p-2 mx-1 border transition-all rounded ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:text-black hover:border-black"
        }`}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {/* NÚMEROS DE PÁGINA */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-8 h-8 mx-1 border transition-all rounded ${
            currentPage === number
              ? "border-blue-600 text-blue-600"
              : "border-gray-200 hover:bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}

      {/* FLECHA DERECHA */}
      <button
        onClick={() => paginate(currentPage + 1)}
        className={`text-gray-400 p-2 mx-1 border transition-all rounded ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:text-black hover:border-black"
        }`}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
