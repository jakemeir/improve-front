import React, { useState } from "react";

const CounterTest: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const plus = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <br />
      <button onClick={plus}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={minus}>+</button>
    </div>
  );
};

export default CounterTest;
