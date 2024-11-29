import moment from "moment";
import { useState } from "react";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";

type HeadersProps = {
  label: string;
  key: string;
};

type TableProps = {
  headers: HeadersProps[];
  data: any[];
  setSelectedId: Function;
  setIsDelete:Function;
};

export default function Table({ headers, data, setSelectedId, setIsDelete }: TableProps) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleOutsideClick = () => {
    setOpenMenuIndex(null); 
  }

  return (
    <div className="overflow-auto shadow-md sm:rounded-lg h-365 my-4 min-h-[26rem]">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* Header Section */}
        <thead className="text-xs text-gray-50 uppercase bg-gray-900 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body Section */}
        <tbody>
          {data.map((key: any, rowIndex: number) => {
            const rowBgColor =
              rowIndex % 2 === 0
                ? "bg-gray-200 dark:bg-gray-700"
                : "bg-white dark:bg-gray-800";

            return (
              <tr
                key={rowIndex}
                className={`${rowBgColor} border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {header.key === "action" ? (
                      <div className="relative">
                        {/* Vertical 3-dot Icon */}
                        <button
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() =>
                            setOpenMenuIndex(
                              openMenuIndex === rowIndex ? null : rowIndex
                            )
                          }
                          onBlur={handleOutsideClick}
                        >
                          <FiMoreVertical className="w-5 h-5" />
                        </button>

                        {/* Overlay Menu */}
                        {openMenuIndex === rowIndex && (
                          <div
                            className="absolute left-0 bottom-full mb-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg items-center px-2 py-1 z-10"
                            onMouseDown={(e) => e.preventDefault()} // Prevent onBlur on menu clicks
                          >
                            {/* Edit Button */}
                            <button
                              className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2"
                              onClick={() => {
                                setSelectedId(key._id);
                              }}
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                              onClick={() => {
                                setIsDelete(true)
                                setSelectedId(key._id);
                              }}
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : header.key === "createdAt" ||
                      header.key === "updatedAt" ? (
                      moment(new Date(key[header.key]).toString()).format(
                        "DD-MM-YYYY"
                      )
                    ) : (
                      String(key[header.key] ?? "N/A")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
