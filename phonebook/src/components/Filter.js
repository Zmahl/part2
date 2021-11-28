import React from 'react'

const Filter = ({handleSearch}) => {
    return(
        <div>
            <input onChange = {(handleSearch) =>{
                if (handleSearch.length === 0){
                    return ""
                }
                else{
                    return handleSearch
                }
            }}/>
        </div>
    )
}

export default Filter