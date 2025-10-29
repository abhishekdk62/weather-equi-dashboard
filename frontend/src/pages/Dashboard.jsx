import React, { useState, useEffect } from "react";
import {
  getEquipmentData,
  getCities,
  getWeatherData,
  getSiteIds,
} from "../services/services";
import EquipmentFilters from "../components/EquipmentFilters";
import EquipmentSummary from "../components/EquipmentSummary";
import EquipmentTable from "../components/EquipmentTable";
import WeatherFilters from "../components/WeatherFilters";
import WeatherChart from "../components/WeatherChart";

const Dashboard = () => {
  const [equipmentData, setEquipmentData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showTemp, setShowTemp] = useState(true);
  const [showHumidity, setShowHumidity] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  useEffect(() => {
    getCities()
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);
  useEffect(() => {
    getSiteIds()
      .then((res) => setSites(res.data))
      .catch((err) => console.error("Error fetching sites:", err));
  }, []);

  useEffect(() => {
    setEquipmentLoading(true);
    getEquipmentData(selectedDate, selectedCity)
      .then((res) => setEquipmentData(res.data))
      .catch((err) => console.error("Error fetching equipment:", err))
      .finally(() => setEquipmentLoading(false));
  }, [selectedCity, selectedDate]);
  useEffect(() => {
    setWeatherLoading(true);
    getWeatherData(startDate, endDate, selectedSites)
      .then((res) => setWeatherData(res.data))
      .catch((err) => console.error("Error fetching weather:", err))
      .finally(() => setWeatherLoading(false));
  }, [selectedSites, startDate, endDate]);

  const handleSiteToggle = (siteId) => {
    setSelectedSites((prev) =>
      prev.includes(siteId)
        ? prev.filter((id) => id !== siteId)
        : [...prev, siteId]
    );
  };

  const clearEquipmentFilters = () => {
    setSelectedCity("");
    setSelectedDate("");
  };

  const clearWeatherFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedSites([]);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFE8DB]">
      <header className="bg-[#5682B1] border-b border-[#2a2a2a] py-6 px-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#FFE8DB]">
          Equipment & Weather Dashboard
        </h1>
        <p className="text-[#FFE8DB] opacity-80 mt-1">
          Real-time analytics and monitoring system
        </p>
      </header>

      <div className="p-8 space-y-8">
        <section className="bg-[#0a0a0a] rounded-lg p-6 border border-[#2a2a2a] shadow-xl">
          <h2 className="text-2xl font-semibold text-[#FFE8DB] mb-6">
            Equipment Summary
          </h2>

          <EquipmentFilters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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

        <section className="bg-[#0a0a0a] rounded-lg p-6 border border-[#2a2a2a] shadow-xl">
          <h2 className="text-2xl font-semibold text-[#FFE8DB] mb-6">
            Weather Analytics
          </h2>

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
