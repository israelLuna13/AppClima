import create from 'zustand';
import { SearchType } from './types';
import axios from 'axios';
import { z } from 'zod';

// Definición del esquema de datos del clima con Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

// Tipo para inferir el resultado del esquema
export type Weather = z.infer<typeof Weather>;

// Estado inicial
const initialState = {
  weather: {
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  },
  loading: false,
  notFound: false,
};

// aqui se combina el initialSate y fetchWather , esta es una manera de mantener el codigo separado
type WeatherState = typeof initialState & {
  fetchWeather: (search: SearchType) => Promise<void>;
};

// Crear el store de Zustand
export const useWeatherStore = create<WeatherState>((set) => ({

  //inicializamos nuestro state
  ...initialState,

  // Acción para consultar el clima
  fetchWeather: async (search) => {
    const appId = import.meta.env.VITE_API_KEY;
    //cada vez que se inicie una consulta , reseteamos los state
    set({ loading: true, weather: initialState.weather, notFound: false });

    try {
      //primera consulta a la api , obtenemos la latitud y longuitud de una ciudad
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);

      const {
        coord: { lat, lon },
      } = data;

      //segundo llamado a la api, obtenemos la temperatura
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=imperial`;
      const { data: weatherResult } = await axios(weatherUrl);

      //zod
      //validamos que la respuesta obtenida tenga la misma estructura que nuestro esquema 
      const result = Weather.safeParse(weatherResult);
      //si tiene la misma estructura
      if (result.success) {
        //actualizamos la temperatura
        set({ weather: result.data });
      }
    } catch (error) {
      //valldamos si hay algun error a la hora de obtener una respuesta
      if (axios.isAxiosError(error)) {
        set({ notFound: true });
      }
    } finally {
      //este codigo se va a ejecutar exista el error o no
      //sirve para quitar el spinner de carga cada vez que se haga una consulta correctamente o no
      set({ loading: false });
    }
  },
}));
