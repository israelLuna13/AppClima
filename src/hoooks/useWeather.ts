import { SearchType } from "../types"
import axios from 'axios'
export default function useWeather() {

    const fetchWeather=async(search:SearchType) =>{
        try {
            const appId = ''

            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoUrl)

            console.log(data)

        } catch (error) {
            console.log(error)
            
        }
    }
  return (

    {fetchWeather}
  )
}
