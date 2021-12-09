import React from 'react'

const Filter = ({handleSearch, filteredResults}) => {
    return(
        <div>
            <input onChange = {handleSearch} value = {filteredResults}/>
        </div>
    )
}

export default Filter