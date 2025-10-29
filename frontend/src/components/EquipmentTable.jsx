import React from "react";

const EquipmentTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Equipment
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              City
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Capacity (kW)
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Efficiency (%)
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Units
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#5682B1]">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 || !data ? (
            <tr>
              <td colSpan="7" className="text-center py-8 text-[#b8b8b8]">
                No data available for this time range
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors"
              >
                <td className="py-3 px-4 text-sm text-[#FFE8DB]">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-sm text-[#b8b8b8]">
                  {item.city}
                </td>
                <td className="py-3 px-4 text-sm text-[#FFE8DB]">
                  {item.capacity.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm text-[#FFE8DB]">
                  {item.efficiency.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm text-[#FFE8DB]">
                  {item.units.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-900 text-green-300"
                        : item.status === "Idle"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[#b8b8b8]">
                  {new Date(item.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
