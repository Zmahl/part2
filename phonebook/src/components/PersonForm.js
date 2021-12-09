import React from 'react'

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange }) => {


  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit = {handleSubmit}>
          <p>name: <input onChange = {handleNameChange}/></p>
          <p>number: <input onChange = {handleNumberChange}/></p>
        
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  )
}

export default PersonForm