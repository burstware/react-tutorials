import React, { useEffect, useRef, useState } from "react";

function usePrevious(value: number) {
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Counter() {
  const [count, setCount] = useState(0);

  const prev = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prev}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
