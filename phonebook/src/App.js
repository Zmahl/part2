import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/Person'

import phoneService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() =>{
    phoneService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])

  const search = (person) => {

    if (newSearch === ""){
      return person
    }
    else if (person.name.toLowerCase().includes(newSearch.toLowerCase())){
      return person
    } 
  }

  const handleSubmit = (event) => {
  
    event.preventDefault()
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber
    }

    const personToChangeNumber = persons.find(p => p.name === newName)
    const updatedNumber = {...personToChangeNumber, number: newNumber}

    if (personToChangeNumber){
          if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
            phoneService
            .update(updatedNumber.id, updatedNumber)
            .then((returnedPeople) => {
              setPersons(returnedPeople)
              setNewName('')
              setNewNumber('')
            })     
          }
      }
    
    else {
      phoneService
      .create(personObject)
      .then(returnedPeople => {
        setPersons(persons.concat(returnedPeople))
        setNewName('')
        setNewNumber('')
      })
    }
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

  //Filter needed to delete entry, as concat will pull error of needing li key of deleted element
  //Only will delete from frontend after refreshing the page
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      phoneService
      .deleteEntry(id)
      .then(() => {
        const newList = persons.filter((person) => person.id !== id)
        setPersons(newList)
      })
    }
  }
  const filteredResults = !newSearch
          ? persons
          : persons.filter(search)


  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter handleSearch = {handleSearch} value = {filteredResults}/>
      <PersonForm class = "form" handleSubmit = {handleSubmit} handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}/>
      <PersonList persons = {persons} search = {newSearch} deletePerson = {handleDelete}/>
    </div>
  )
}

export default App
