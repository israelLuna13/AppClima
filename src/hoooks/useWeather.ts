import { SearchType, Weather } from "../types"
import axios from 'axios'
export default function useWeather() {


  //type guard o assertion 
  //validamos que la respuesta que obtengamos de la apli tenga esta estructura
  //esta funcion recibira un dato desconocio por el momento

  function isWeatherResponse(weather:unknown):weather is Weather{
    return(
      Boolean(weather) && 
      typeof weather === 'object' && 
      typeof (weather as Weather).name === 'string' &&
      typeof (weather as Weather).main.temp === 'number' &&
      typeof (weather as Weather).main.temp_max === 'number' &&
      typeof (weather as Weather).main.temp_min === 'number'
    )
  }



    const fetchWeather=async(search:SearchType) =>{
        try {
          //api key
            const appId =import.meta.env.VITE_API_KEY

            //hacemos el primer llamado a la api
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl)
            // Desestructuramos el objeto data para obtener las coordenadas
            const { coord: { lat, lon } } = data;

            //segundo llamado a la api
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=imperial`
            const {data:weatherResult} = await axios(weatherUrl)

            //castear el type 
            //type guards 
            const result = isWeatherResponse(weatherResult)

            if(result){
              console.log(weatherResult.name)
            }

        } catch (error) {
            console.log(error)

        }
    }
  return (

    {fetchWeather}
  )
}