import React from "react";
import './errorMessage.css'
import error from './error.jpeg';

const ErrorMessage =() => {
    return (
        <>
            <img src={error} alr='error'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;