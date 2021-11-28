import React from 'react'

const PersonList = ({persons,search, mapFunc}) => {
    return (
    <h2>Numbers</h2>,
        <ul>
            {persons.filter(search).map(mapFunc)}
        </ul>
    )
}

export default PersonList