import React, { useState } from 'react';

const WeatherFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sites,
  selectedSites,
  handleSiteToggle,
  onClear,
  showTemp,
  setShowTemp,
  showHumidity,
  setShowHumidity
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [dateError, setDateError] = useState('');

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    if (endDate && newStartDate > endDate) {
      setEndDate('');
      setDateError('');
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    
    if (startDate && newEndDate < startDate) {
      setDateError('End date cannot be before start date');
      setEndDate(newEndDate);
    } else {
      setDateError('');
      setEndDate(newEndDate);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Date Filters - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
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
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
            max={today}
            className={`w-full px-4 py-2 bg-[#0f0f0f] border ${
              dateError ? 'border-red-500' : 'border-[#2a2a2a]'
            } rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-${
              dateError ? 'red-500' : '[#5682B1]'
            } focus:border-transparent`}
          />
          {dateError && (
            <p className="text-red-500 text-sm mt-1">{dateError}</p>
          )}
        </div>

        {/* Clear button - full width on mobile, auto on larger screens */}
        <div className="sm:col-span-2 lg:col-span-1 flex items-end">
          <button
            onClick={onClear}
            className="w-full px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-[#5682B1] font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Site Selection - Responsive Grid */}
      <div>
        <label className="block text-sm font-medium text-[#b8b8b8] mb-3">
          Select Sites (Multiple)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {sites?.map((site) => (
            <button
              key={site}
              onClick={() => handleSiteToggle(site)}
              className={`px-3 md:px-4 py-2 rounded-lg border font-medium text-sm transition-all ${
                selectedSites.includes(site)
                  ? 'bg-[#5682B1] border-[#5682B1] text-[#FFE8DB] shadow-lg'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#b8b8b8] hover:border-[#5682B1]'
              }`}
            >
              Site {site}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature and Humidity Toggles - Full width on mobile, auto on large screens */}
      <div>
        <label className="block text-sm font-medium text-[#b8b8b8] mb-3">
          Data Display
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setShowTemp(!showTemp)}
            className={`w-full lg:w-auto px-6 py-2 rounded-lg font-medium transition-all ${
              showTemp
                ? 'bg-[#5682B1] text-[#FFE8DB] shadow-lg'
                : 'bg-[#1a1a1a] text-[#b8b8b8] border border-[#2a2a2a] hover:border-[#5682B1]'
            }`}
          >
            Temperature
          </button>
          <button
            onClick={() => setShowHumidity(!showHumidity)}
            className={`w-full lg:w-auto px-6 py-2 rounded-lg font-medium transition-all ${
              showHumidity
                ? 'bg-[#FF8C00] text-[#FFE8DB] shadow-lg'
                : 'bg-[#1a1a1a] text-[#b8b8b8] border border-[#2a2a2a] hover:border-[#FF8C00]'
            }`}
          >
            Humidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherFilters;
