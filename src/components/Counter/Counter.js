import React, { useState } from "react";
import './Counter.scss';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  function handleCounter(e) {
    setCounter((current) => current + Number(e.target.textContent));
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={handleCounter}>+1</button>
      <button onClick={handleCounter}>-1</button>
    </div>
  );
};

export default Counter;
