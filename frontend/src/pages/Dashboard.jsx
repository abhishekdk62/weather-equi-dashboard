import React from "react";
import EquipmentFilters from "../components/EquipmentFilters";
import EquipmentSummary from "../components/EquipmentSummary";
import EquipmentTable from "../components/EquipmentTable";
import WeatherFilters from "../components/WeatherFilters";
import WeatherChart from "../components/WeatherChart";
import CSVUpload from "../components/CSVUpload";
import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const {
    equipmentData,
    cities,
    selectedCity,
    setSelectedCity,
    equipmentStartDate,
    setEquipmentStartDate,
    equipmentEndDate,
    setEquipmentEndDate,
    equipmentLoading,
    clearEquipmentFilters,
    fetchEquipmentData,
    weatherData,
    sites,
    selectedSites,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showTemp,
    setShowTemp,
    showHumidity,
    setShowHumidity,
    weatherLoading,
    handleSiteToggle,
    clearWeatherFilters,
    fetchWeatherData,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFE8DB]">
      {/* Header - Responsive padding */}
      <header className="bg-[#5682B1] border-b border-[#2a2a2a] py-4 px-4 md:py-6 md:px-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-[#FFE8DB]">
          Equipment & Weather Dashboard
        </h1>
        <p className="text-sm md:text-base text-[#FFE8DB] opacity-80 mt-1">
          Real-time analytics and monitoring system
        </p>
      </header>

      {/* Main content - Responsive padding */}
      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Equipment Section */}
        <section className="bg-[#0a0a0a] rounded-lg p-4 md:p-6 border border-[#2a2a2a] shadow-xl">
          <h2 className="text-xl md:text-2xl font-semibold text-[#FFE8DB] mb-4 md:mb-6">
            Equipment Summary
          </h2>

          <CSVUpload type="equipment" onUploadSuccess={fetchEquipmentData} />

          <EquipmentFilters
            equipmentStartDate={equipmentStartDate}
            setEquipmentStartDate={setEquipmentStartDate}
            equipmentEndDate={equipmentEndDate}
            setEquipmentEndDate={setEquipmentEndDate}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            onClear={clearEquipmentFilters}
          />

          {equipmentLoading ? (
            <div className="text-center py-8 text-[#b8b8b8]">Loading...</div>
          ) : equipmentData ? (
            <>
              <EquipmentSummary summary={equipmentData.summary} />
              <EquipmentTable data={equipmentData.tableData} />
            </>
          ) : null}
        </section>

        {/* Weather Section */}
        <section className="bg-[#0a0a0a] rounded-lg p-4 md:p-6 border border-[#2a2a2a] shadow-xl">
          <h2 className="text-xl md:text-2xl font-semibold text-[#FFE8DB] mb-4 md:mb-6">
            Weather Analytics
          </h2>

          <CSVUpload type="weather" onUploadSuccess={fetchWeatherData} />

          <WeatherFilters
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            sites={sites}
            selectedSites={selectedSites}
            handleSiteToggle={handleSiteToggle}
            onClear={clearWeatherFilters}
            showTemp={showTemp}
            setShowTemp={setShowTemp}
            showHumidity={showHumidity}
            setShowHumidity={setShowHumidity}
          />

          <WeatherChart
            weatherData={weatherData}
            showTemp={showTemp}
            showHumidity={showHumidity}
            loading={weatherLoading}
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
