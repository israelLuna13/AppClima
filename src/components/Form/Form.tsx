import { useState } from 'react'
import { countries } from '../../data/countries'
import styles from './Form.module.css'
import { SearchType } from '../../types'
import Alert from '../Alert/Alert'

//definimos los tipos de datos que le llegan a form
type FormProps = {
    fetchWeather:(search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}:FormProps) {
    
    //state para el form
    const [search,setSearch] = useState<SearchType>({
        city:'',
        country:''
    })

    //state para el mensaje de alerta
    const[alert,setAlert] = useState('')



    //escribimos en el state lo que este en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement> ) =>{
        setSearch({
            ... search, [e.target.name]:e.target.value
        })
    }


    //si todos los campos del formulario estan bien, mandamos los datos a fetch weather
    const handleSubmit = ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return  
         }

        fetchWeather(search)
    }

  return (
    <form className={styles.form}
    onSubmit={handleSubmit}
    >
        {/* validamos que esta state tenga algo y mandamos el state como children */}
        {alert && <Alert>{alert}</Alert>}

        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id='city'
                type="text"
                name='city'
                placeholder='Ciudad'
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais:</label>
                <select
                id='country'
                value={search.country}
                name='country'
                onChange={handleChange}
                >
                
            <option value="">---Seleccione un pais---</option>
            {countries.map(country => (
                    <option 
                    value={country.code}
                    key={country.code}
                    >
                        {country.name}
                    </option>
            ))}

                </select>
        </div>

        <input className={styles.submit} type="submit" value='Consultar clima'/>
    </form>
  )
}
