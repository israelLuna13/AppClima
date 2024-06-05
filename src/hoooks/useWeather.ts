import { SearchType } from "../types"
import axios from 'axios'
import {object,string,number,InferOutput,parse} from 'valibot'
//import {z} from 'zod'
export default function useWeather() {


  //type guard o assertion 
  //validamos que la respuesta que obtengamos de la apli tenga esta estructura
  //esta funcion recibira un dato desconocio por el momento

  // function isWeatherResponse(weather:unknown):weather is Weather{
  //   return(
  //     Boolean(weather) && 
  //     typeof weather === 'object' && 
  //     typeof (weather as Weather).name === 'string' &&
  //     typeof (weather as Weather).main.temp === 'number' &&
  //     typeof (weather as Weather).main.temp_max === 'number' &&
  //     typeof (weather as Weather).main.temp_min === 'number'
  //   )
  // }


  // // zod
  // //esquima
  // const Weather = z.object({
  //   name:z.string(),
  //   main:z.object({
  //     temp:z.number(),
  //     temp_max:z.number(),
  //     temp_min:z.number(),
      
  //   })
  // })

  // type Weather = z.infer<typeof Weather>

  //esquema esperado
  const WeatherShema = object({
       name:string(),
       main:object({
          temp:number(),
          temp_max:number(),
          temp_min:number(),
  })
})

type Weather = InferOutput<typeof WeatherShema>
 


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
            
              //zood
              const {data:weatherResult} = await axios(weatherUrl)

              //validamos si la respuesta obtenido tiene la estructura de nuestro esquima
              // const result = Weather.safeParse(weatherResult)
              // if(result.success)
              //   {
              //     console.log(result.data.name)
              //     console.log(result.data.main.temp)


              //   }                  // //castear el type 
            // //type guards 
            // const result = isWeatherResponse(weatherResult)

            // if(result){
            //   console.log(weatherResult.name)
            // }

            //valibot
            //validamos si los esquemas tienen la misma estructura
            const result = parse(WeatherShema,weatherResult)
            if(result){
              console.log(result.name)
            }

        } catch (error) {
            console.log(error)

        }
    }
  return (

    {fetchWeather}
  )
}