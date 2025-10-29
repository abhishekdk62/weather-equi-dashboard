import React from 'react';

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
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#b8b8b8] mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg text-[#FFE8DB] focus:outline-none focus:ring-2 focus:ring-[#5682B1] focus:border-transparent"
          />
        </div>

        <button
          onClick={onClear}
          className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-[#5682B1] font-medium transition-colors self-end"
        >
          Clear Filters
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#b8b8b8] mb-3">
          Select Sites (Multiple)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sites?.map((site) => (
            <button
              key={site}
              onClick={() => handleSiteToggle(site)}
              className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                selectedSites.includes(site)
                  ? 'bg-[#5682B1] border-[#5682B1] text-[#FFE8DB] shadow-lg'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#b8b8b8] hover:border-[#5682B1]'
              }`}
            >
              {site}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowTemp(!showTemp)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            showTemp
              ? 'bg-[#5682B1] text-[#FFE8DB] shadow-lg'
              : 'bg-[#1a1a1a] text-[#b8b8b8] border border-[#2a2a2a] hover:border-[#5682B1]'
          }`}
        >
          Temperature
        </button>
        <button
          onClick={() => setShowHumidity(!showHumidity)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            showHumidity
              ? 'bg-[#739EC9] text-[#FFE8DB] shadow-lg'
              : 'bg-[#1a1a1a] text-[#b8b8b8] border border-[#2a2a2a] hover:border-[#739EC9]'
          }`}
        >
          Humidity
        </button>
      </div>
    </>
  );
};

export default WeatherFilters;
