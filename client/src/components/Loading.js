import React from 'react'

const Loading = (props) => {
    return (
        <div className="h-8 w-screen flex justify-center top-0 left-0 bg-white opacity-75 z-50">
            <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                <i className="fas fa-circle-notch fa-spin fa-5x"></i>
           </span>
        </div>
    )
}

export default Loading;

