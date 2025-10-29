import React from 'react';

const EquipmentFilters = ({ 
  equipmentStartDate,
  setEquipmentStartDate,
  equipmentEndDate,
  setEquipmentEndDate,
  selectedCity, 
  setSelectedCity, 
  cities, 
  onClear 
}) => {
  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setEquipmentStartDate(newStartDate);
    
    if (equipmentEndDate && newStartDate > equipmentEndDate) {
      setEquipmentEndDate('');
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    
    if (!equipmentStartDate || newEndDate >= equipmentStartDate) {
      setEquipmentEndDate(newEndDate);
    }
  };

  return (
    <div className="mb-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={equipmentStartDate}
            onChange={handleStartDateChange}
            max={today}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-[#5682B1] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
            End Date
          </label>
          <input
            type="date"
            value={equipmentEndDate}
            onChange={handleEndDateChange}
            min={equipmentStartDate}
            max={today}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-[#5682B1] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
            Filter by City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-[#5682B1] focus:border-transparent"
          >
            <option value="" className="bg-[#0f0f0f]">All Cities</option>
            {cities?.map((city) => (
              <option key={city} value={city} className="bg-[#0f0f0f]">
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear button - Full width on mobile */}
      <button
        onClick={onClear}
        className="w-full sm:w-auto px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-[#5682B1] font-medium transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EquipmentFilters;
