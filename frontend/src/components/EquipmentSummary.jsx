import React from 'react';

const EquipmentSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#5682B1] transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#b8b8b8]">
              Average Capacity
            </p>
            <p className="text-3xl font-bold text-[#5682B1] mt-2">
              {summary.avgCapacity.toFixed(2)}
            </p>
            <p className="text-xs text-[#b8b8b8] mt-1">kW</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#5682B1] transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#b8b8b8]">
              Average Units
            </p>
            <p className="text-3xl font-bold text-[#5682B1] mt-2">
              {summary.avgUnits.toFixed(2)}
            </p>
            <p className="text-xs text-[#b8b8b8] mt-1">units</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#5682B1] transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#b8b8b8]">
              Average Efficiency
            </p>
            <p className="text-3xl font-bold text-[#5682B1] mt-2">
              {summary.avgEfficiency.toFixed(2)}%
            </p>
            <p className="text-xs text-[#b8b8b8] mt-1">efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentSummary;
