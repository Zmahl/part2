import React from 'react'

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, nameVal, numberVal }) => {


  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit = {handleSubmit}>
          <p>name: <input value = {nameVal} onChange = {handleNameChange}/></p>
          <p>number: <input value = {numberVal} onChange = {handleNumberChange}/></p>
        
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  )
}

export default PersonForm