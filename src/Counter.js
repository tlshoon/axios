import React from "react";
import { useCounterStore } from "./store.js/CounterStore";

const Counter = () => {
  const { counter, increment, decrement, multiply, reset } = useCounterStore();
  return (
    <>
      <div>{counter}</div>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
      <button onClick={multiply}>X5</button>
      <button onClick={reset}>reset</button>
    </>
  );
};

export default Counter;
