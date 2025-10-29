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
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setEquipmentStartDate(newStartDate);
    
    // If end date is before new start date, clear end date
    if (equipmentEndDate && newStartDate > equipmentEndDate) {
      setEquipmentEndDate('');
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    
    // Only set if it's after or equal to start date
    if (!equipmentStartDate || newEndDate >= equipmentStartDate) {
      setEquipmentEndDate(newEndDate);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
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

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
          End Date
        </label>
        <input
          type="date"
          value={equipmentEndDate}
          onChange={handleEndDateChange}
          min={equipmentStartDate} 
          max={today} // Can't select future dates
          className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-[#5682B1] focus:border-transparent"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
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

      <button
        onClick={onClear}
        className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-[#5682B1] font-medium transition-colors self-end"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EquipmentFilters;
