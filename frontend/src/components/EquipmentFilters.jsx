import React from 'react';

const EquipmentFilters = ({ 
  selectedDate, 
  setSelectedDate, 
  selectedCity, 
  setSelectedCity, 
  cities, 
  onClear 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
          Filter by Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
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
