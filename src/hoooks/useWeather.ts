// import { SearchType } from "../types";
// import axios from "axios";
// import { useMemo, useState } from "react";
// //import {object,string,number,InferOutput,parse} from 'valibot'
// import { z } from "zod";
// // // zod
// // //esquema
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_max: z.number(),
//     temp_min: z.number(),
//   }),
// });

// export type Weather = z.infer<typeof Weather>;

// //lo pusimos una constante para mandarlo llamar en varias parte del codigo
// const initialWeather = {
//   name:'',
//   main: {
//     temp: 0,
//     temp_max: 0,
//     temp_min: 0
// }
// }

// export default function useWeather() {

//   const [weather, setWeather] = useState<Weather>(initialWeather);//state del clima

//   const [loading, setLoading] = useState(false);//statte del spinner
  
//   const [notFound,setNotFound] = useState(false)//state del error
//   //type guard o assertion
//   //validamos que la respuesta que obtengamos de la apli tenga esta estructura
//   //esta funcion recibira un dato desconocio por el momento

//   // function isWeatherResponse(weather:unknown):weather is Weather{
//   //   return(
//   //     Boolean(weather) &&
//   //     typeof weather === 'object' &&
//   //     typeof (weather as Weather).name === 'string' &&
//   //     typeof (weather as Weather).main.temp === 'number' &&
//   //     typeof (weather as Weather).main.temp_max === 'number' &&
//   //     typeof (weather as Weather).main.temp_min === 'number'
//   //   )
//   // }

//   //esquema esperado
//   //   const WeatherShema = object({
//   //        name:string(),
//   //        main:object({
//   //           temp:number(),
//   //           temp_max:number(),
//   //           temp_min:number(),
//   //   })
//   // })

//   //type Weather = InferOutput<typeof WeatherShema>

//   //consultar clima , es asincrona porque hara una consulta a una api
//   const fetchWeather = async (search: SearchType) => {
//     //api key
//     const appId = import.meta.env.VITE_API_KEY;
//     //activamos el spinner cuando se haga una consulta
//     setLoading(true);
//     //reiniciamos el state de weather
//     setWeather(initialWeather)
//     try {
//       //hacemos el primer llamado a la api
//       const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`;
//       const { data } = await axios(geoUrl);

//       // Desestructuramos el objeto data para obtener las coordenadas
//       const {
//         coord: { lat, lon },
//       } = data;

//       //segundo llamado a la api
//       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=imperial`;

//       //zood
//       const { data: weatherResult } = await axios(weatherUrl);

//       //validamos si la respuesta obtenido tiene la estructura de nuestro esquema
//       const result = Weather.safeParse(weatherResult);
//       if (result.success) {
//         setWeather(result.data);
//       }

//       //castear el type
//       // //type guards
//       // const result = isWeatherResponse(weatherResult)

//       // if(result){
//       //   console.log(weatherResult.name)
//       // }

//       //valibot
//       //validamos si los esquemas tienen la misma estructura
//       // const result = parse(WeatherShema,weatherResult)
//       // if(result){
//       //   console.log(result.name)
//       // }
//     } catch (error) {

//       if (axios.isAxiosError(error)) {
//         //activamos el mensaje de error que se mostrara
//         setNotFound(true)
//       }
//     } finally {
//       //reseteamos el spinn, este codigo se ejcutara exista error o no
//       setLoading(false);
//     }
//   };

//   const hasWeatherData = useMemo(() => weather.name, [weather]);
//   return { fetchWeather, weather, hasWeatherData, loading,notFound };
// }
