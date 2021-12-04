import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import CountryInfo from './components/CountryInfo'

import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [click, setClick] = useState(false)

  
  const hook = () => {
      axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data)
      })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) => {
    setSearch(event.target.value)
    setClick(true)

    return setSearch('')
  }
  useEffect(hook, [])

  const filterCountries = !countries
		? countries //if countries is empty, therefore false, display all values
		: countries.filter((country) => //else display the filtered countries
				country.name.toLowerCase().includes(search.toLocaleLowerCase())
		  )

  const isTooLong = filterCountries.length > 10
    ? true
    : false
  
  const isOneCountry = filterCountries.length === 1
    ? true
    : false

  const mapFunc = (country) => {
    return(
      <p key = {country.name} value = {country.name}>
        {country.name}
        <button value = {country.name} onClick = {handleClick}>show</button>
      </p>
    )
  }

  //Creates function to display values based on result of too long, called in render
  const displayResults = (checkLong) => {
    if (checkLong){
      return <p>Too many matches, specify another filter</p>
    }

    else{
      return filterCountries.map(mapFunc)
    }
  }

  return (
    <div>
      <p>find countries</p>  
      <Filter handleSearch = {handleSearch} value = {filterCountries}/>
      <div>
        {click || isOneCountry ? 
        <CountryInfo filteredCountry = {filterCountries}/> 
        :
        displayResults(isTooLong)}
      </div>
    </div>
  );
}

export default App
