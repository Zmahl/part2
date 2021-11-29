import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/Person'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  } 

  useEffect(hook, [])

  

  const search = (person) => {

    if (newSearch === ""){
      return person
    }
    else if (person.name.toLowerCase().includes(newSearch.toLowerCase())){
      return person
    } 
  }
  
  
  const mapFunc = (person) => {
      return(
      <li key = {person.id} person = {person.name}>{person.name} {person.number}</li>
      )
    
  }

  const addPerson = (event) => {
  
    event.preventDefault()
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)

    //Loop through names array using "for... in" syntax
    for (const name in names){
      if (names[name] === newName){
          //${newName} format is essentially format string from python -- need backtick
          return (alert(`${newName} already exists!`))
      }
    }
    
    setNewName('')
    setNewNumber('') 
    setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {

    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch = {handleSearch}/>
      <PersonForm class = "form" addPerson = {addPerson} handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}/>
      <PersonList persons = {persons} search = {search} mapFunc = {mapFunc}/>
    </div>
  )
}

export default App
