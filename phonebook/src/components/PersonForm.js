import React from 'react'

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <h2>add a new</h2>,
    <form onSubmit = {addPerson}>
        <div>name: <input onChange = {handleNameChange}/></div>
        <div>number: <input onChange = {handleNumberChange}/></div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm