import { useState, useEffect, useCallback } from 'react';
import {
  getEquipmentData,
  getCities,
  getWeatherData,
  getSiteIds,
} from '../services/services';

const useDashboard = () => {
  const [equipmentData, setEquipmentData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [equipmentStartDate, setEquipmentStartDate] = useState('');
  const [equipmentEndDate, setEquipmentEndDate] = useState('');
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  
  const [weatherData, setWeatherData] = useState(null);
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [weatherStartDate, setWeatherStartDate] = useState('');
  const [weatherEndDate, setWeatherEndDate] = useState('');
  const [showTemp, setShowTemp] = useState(true);
  const [showHumidity, setShowHumidity] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Fetch cities on mount
  useEffect(() => {
    fetchCities();
  }, []);

  // Fetch sites on mount
  useEffect(() => {
    fetchSites();
  }, []);

  // Fetch equipment data when filters change
  useEffect(() => {
    fetchEquipmentData();
  }, [selectedCity, equipmentStartDate, equipmentEndDate]);

  // Fetch weather data when filters change
  useEffect(() => {
    fetchWeatherData();
  }, [selectedSites, weatherStartDate, weatherEndDate]);

  // ============ REFRESH FUNCTIONS ============
  
  const fetchEquipmentData = useCallback(() => {
    setEquipmentLoading(true);
    getEquipmentData(equipmentStartDate, equipmentEndDate, selectedCity)
      .then((res) => setEquipmentData(res.data))
      .catch((err) => console.error('Error fetching equipment:', err))
      .finally(() => setEquipmentLoading(false));
  }, [equipmentStartDate, equipmentEndDate, selectedCity]);

  const fetchWeatherData = useCallback(() => {
    setWeatherLoading(true);
    getWeatherData(weatherStartDate, weatherEndDate, selectedSites)
      .then((res) => setWeatherData(res.data))
      .catch((err) => console.error('Error fetching weather:', err))
      .finally(() => setWeatherLoading(false));
  }, [weatherStartDate, weatherEndDate, selectedSites]);

  const fetchCities = useCallback(() => {
    getCities()
      .then((res) => setCities(res.data))
      .catch((err) => console.error('Error fetching cities:', err));
  }, []);

  const fetchSites = useCallback(() => {
    getSiteIds()
      .then((res) => setSites(res.data))
      .catch((err) => console.error('Error fetching sites:', err));
  }, []);

  // ============ HANDLERS ============

  const handleSiteToggle = (siteId) => {
    setSelectedSites((prev) =>
      prev.includes(siteId)
        ? prev.filter((id) => id !== siteId)
        : [...prev, siteId]
    );
  };

  const clearEquipmentFilters = () => {
    setSelectedCity('');
    setEquipmentStartDate('');
    setEquipmentEndDate('');
  };

  const clearWeatherFilters = () => {
    setWeatherStartDate('');
    setWeatherEndDate('');
    setSelectedSites([]);
  };

  // ============ RETURN VALUES ============

  return {
    // Equipment state
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
    
    // Weather state
    weatherData,
    sites,
    selectedSites,
    weatherStartDate,
    setWeatherStartDate,
    weatherEndDate,
    setWeatherEndDate,
    showTemp,
    setShowTemp,
    showHumidity,
    setShowHumidity,
    weatherLoading,
    handleSiteToggle,
    clearWeatherFilters,
    
    // Refresh functions
    fetchEquipmentData,
    fetchWeatherData,
    fetchCities,  
    fetchSites,  
  };
};

export default useDashboard;
