import { useMemo } from "react";
import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import { useWeatherStore } from "./storeZustand";
//import useWeather from "./hoooks/useWeather";
function App() {
  //const { fetchWeather, weather, hasWeatherData, loading,notFound } = useWeather();
  const loading = useWeatherStore (state => state.loading)
  const notFound= useWeatherStore(state => state.notFound)
  const weather= useWeatherStore(state => state.weather)

  const hasWeatherData = useMemo(() => weather.name, [weather]);


  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form/>

        {loading && (
          <p>
            <Spinner />.
          </p>
        )}
        {hasWeatherData && <WeatherDetail/>}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
