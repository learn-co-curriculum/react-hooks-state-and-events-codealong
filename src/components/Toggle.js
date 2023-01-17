import React from "react";
import { useState } from "react";

function Toggle() {
  const [message, setMessage]= useState(false)
  const handleClick=()=>{
    setMessage((isOn)=> !isOn)
  }
  return <button onClick={handleClick}>{ message? "ON": "OFF"}</button>;
}

export default Toggle;
