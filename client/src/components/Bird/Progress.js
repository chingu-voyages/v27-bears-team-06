import React from 'react'

const Progress = (props) => {
    return (
        <div className="h-8 flex justify-center top-0 left-0 bg-white z-50">
            <span className="text-blue-500 top-1/2 my-0 mx-auto block relative w-0 h-0">
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
           </span>
        </div>
    )
}

export default Progress;

