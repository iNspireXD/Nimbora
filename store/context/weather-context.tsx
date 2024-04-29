import { ReactNode, createContext, useState } from "react";
import { WeatherData } from "../../types/types";

interface WeatherContextData {
  locationData: WeatherData | {};
  fetching: boolean;
  setLocationData: React.Dispatch<React.SetStateAction<WeatherData | {}>>;
  setFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

//temp data
const defaultData: WeatherData = {
  current: {
    cloud: 25,
    condition: {
      code: 1030,
      icon: "//cdn.weatherapi.com/weather/64x64/day/143.png",
      text: "Sunny",
    },
    feelslike_c: 23.8,
    feelslike_f: 74.8,
    gust_kph: 5.4,
    gust_mph: 3.4,
    humidity: 44,
    is_day: 1,
    last_updated: "2024-04-28 09:30",
    last_updated_epoch: 1714275900,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 29.94,
    pressure_mb: 1014,
    temp_c: 25,
    temp_f: 77,
    uv: 7,
    vis_km: 5,
    vis_miles: 3,
    wind_degree: 269,
    wind_dir: "W",
    wind_kph: 3.6,
    wind_mph: 2.2,
  },
  forecast: { forecastday: [[Object]] },
  location: {
    country: "Nepal",
    lat: 27.72,
    localtime: "2024-04-28 9:35",
    localtime_epoch: 1714276231,
    lon: 85.32,
    name: "Kathmandu",
    region: "",
    tz_id: "Asia/Kathmandu",
  },
};

export const WeatherContext = createContext<WeatherContextData>({
  locationData: defaultData,
  fetching: false,
  setLocationData: () => {},
  setFetching: () => {},
});
interface WeatherContexProviderProps {
  children: ReactNode;
}

const WeatherContexProvider: React.FC<WeatherContexProviderProps> = ({
  children,
}) => {
  const [locationData, setLocationData] = useState<WeatherData | {}>(
    defaultData
  );
  const [fetching, setFetching] = useState(false);
  const value = {
    locationData: locationData,
    setLocationData: setLocationData,
    fetching: fetching,
    setFetching: setFetching,
  };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContexProvider;
