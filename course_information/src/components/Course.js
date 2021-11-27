import React from 'react'

//Needs to define the variable using .exercises!!
const findTotal = (total, amountExercises) => total + amountExercises.exercises


const Header = ({name}) => {
    return (
      <h2> {name} </h2>
    )
  }
  
  const Part = ({name, exercise}) => {
    return (
      <p>{name} {exercise}</p>
    )
  }
  
  
  const Total = ({sum}) => {
    return (
      <p><b>total of {sum} exercises</b></p>
    )
  }
  
  const Content = ({parts}) => {
    console.log(parts)
    return (
      <div>
        {parts.map(part => 
          <Part key = {part.id} name = {part.name} exercise = {part.exercises}/>
          )}
          <Total sum = {parts.reduce(findTotal, 0)}/>
      </div>
    )
  }

const Course = ({course}) => {
    return (
        <div>
            <Header name = {course.name}/>
            <Content parts = {course.parts}/>
        </div>
    )
}

export default Course