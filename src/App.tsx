import styles from "./App.module.css";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hoooks/useWeather";
function App() {
  const { fetchWeather, weather, hasWeatherData, loading } = useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {loading && (
          <p>
            <Spinner />.
          </p>
        )}
        {hasWeatherData && <WeatherDetail weather={weather} />}
      </div>
    </>
  );
}

export default App;
