import React, { useMemo, useState } from "react";

export default function useMemoComponent() {
  const [number, initialNumber] = useState(1);
  // TODO: make a more complex calc for demonstration
  const calculatedValue = useMemo(() => number * 10, [number]);
  return <p>{calculatedValue}</p>;
}
