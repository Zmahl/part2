import React, { useEffect, useState } from 'react'

import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryInfo = ({filteredCountry}) => {

    const country = filteredCountry[0]

    const [weather, setWeather] = useState([])

    const handleWeather = () => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
        .then((response) => {
          setWeather(response.data)

        })
      }

    useEffect(handleWeather,[country.capital])
    
    return (
        <div key = {country.alpha2Code}>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map(lang => {
                  return(<li key = {lang.iso639_1}>{lang.name}</li>)
                })}
            </ul>
            <img src = {country.flag} style ={{width: "20%"}} alt = {country.name}></img>
            <div>
                {Object.keys(weather).length !== 0 && (
                    <>
                     <h2>Weather in {country.capital}</h2>
                        <p><strong>temperature:</strong> {Math.round(weather.main.temp - 273.15, 2)} Celsius</p>
                        <img
                            src={weather.weather.icon}
                            alt={weather.weather.description}
                        />
                        <p>
                            <strong>wind:</strong> {weather.wind.speed} mph direction {weather.wind.deg}
                        </p>
                    </>
                )}
            </div>
            
        </div>
    )
}
    
export default CountryInfo
