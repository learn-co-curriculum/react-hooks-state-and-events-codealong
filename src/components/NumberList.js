import React from "react";
import { randomNumber } from "../utils";

function Numbers() {
  function handleAddNumber() {
    const newNumber = randomNumber();
    console.log(newNumber);
  }

  return (
    <div>
      <button onClick={handleAddNumber}>Add Number</button>
      <ul>{/* list of numbers */}</ul>
    </div>
  );
}

export default Numbers;
