import React from 'react'

const PersonList = ({persons, search, deletePerson}) => {

    return (
    <div>
        <h2>Numbers</h2>
        <ul>
            {search ?
                persons.filter((person) => person.name.includes(search))
                .map((person) => (
                    <li key = {person.id}>
                        {person.name} {person.number}
                    </li>
                ))
                :
                persons.map((person) =>(
                    <li key = {person.id}>
                        {person.name} {person.number}
                        <button onClick = {() => deletePerson(person.id, person.name)}>
                            Delete
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
    )
}

export default PersonList