import React from 'react'

const Filter = ({handleSearch, filterCountries}) => {
    return(
        <div>
            <input onChange = {handleSearch} value = {filterCountries}/>
        </div>
    )
}

export default Filter