//import { Weather } from "../../hoooks/useWeather"
import { useWeatherStore } from "../../storeZustand";
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

// //tipamos con el esquema que esta en useWaather , tipamos con zod
// type WeatherDetailProps= {
//     weather : Weather
// }

//export default function WeatherDetail({weather}:WeatherDetailsProps)
export default function WeatherDetail() {
  
  //extraemos el estado de zustand
  const  weather  = useWeatherStore(state  =>  state.weather);

  return (
    <div className={styles.container}>
      <h2>Clima de:{weather.name}</h2>
      <p className={styles.current}>{formatTemperature( weather.main.temp)}&deg;</p>
      <div className={styles.temperatures}>
        <p>Min: <span>{formatTemperature( weather.main.temp_min)}&deg;</span></p>
        <p>Max: <span>{formatTemperature( weather.main.temp_max)}&deg;</span></p>
      </div>
    </div>

  ) 
}
