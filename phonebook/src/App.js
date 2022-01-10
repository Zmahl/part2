import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/Person'
import Notification from './components/Notification'

import phoneService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorCheck, setErrorCheck] = useState(false)

  useEffect(() =>{
    phoneService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])

  const search = (person) => {

    if (newSearch === ""){
      return persons
    }
    else if (person.name.toLowerCase().includes(newSearch.toLowerCase())){
      return person
    } 
  }

  const handleSubmit = (event) => {
  
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personToChangeNumber = persons.find(p => p.name === newName)

    if (personToChangeNumber){
          if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
            const updatedNumber = {...personToChangeNumber, number: newNumber}
            phoneService
            .update(updatedNumber.id, updatedNumber)
            .then((returnedPeople) => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPeople))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setMessage(
                `Note ${personObject.name} was already deleted from server` 
              )
              setErrorCheck(true)
              setTimeout(() => {
                setMessage(false)
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.name !== newName))
              setNewName('')
              setNewNumber('')
            })     
          }
      }
    
    else {
      console.log(personObject)
      phoneService
      .create(personObject)
      .then(returnedPeople => {
        setPersons(persons.concat(returnedPeople))
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
        const deletedPerson = persons.find(p => p.id === id)
        const newList = persons.filter(p => p.id !== deletedPerson.id)
        
        setPersons(newList)
      })
      .catch(error => {
        setMessage(
          `Note ${name} was already deleted from server` 
        )
        setErrorCheck(true)
        setTimeout(() => {
          setErrorCheck(false)
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const filteredResults = !newSearch
          ? persons
          : persons.filter(search)


  return (
    <div> 
      <h2>Phonebook</h2>
      <Notification message = {message} errorCheck={errorCheck}/>
      <Filter handleSearch = {handleSearch} value = {filteredResults}/>
      <PersonForm nameVal = {newName} numberVal = {newNumber} class = "form" handleSubmit = {handleSubmit} handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}/>
      <PersonList persons = {persons} search = {newSearch} deletePerson = {handleDelete}/>
    </div>
  )
}

export default App
