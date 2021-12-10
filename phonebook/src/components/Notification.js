import React from 'react'

const Notification = ({message, errorCheck}) => {
    if (message == null) {
        return null
    }
    else {
        return (
            
            <div className = {errorCheck ? "error" : "success"}>
                {message}
            </div>
        )
    }
}

export default Notification