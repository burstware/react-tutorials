import React, { useEffect, useState } from "react";

const ChildComponent = React.memo(({ value }: { value: string }) => {
  useEffect(() => {
    alert(`child component rendered ${value}`);
  });
  return <p>Child Component: {value}</p>;
});

export default function useMemoComponent() {
  const [child1, setChild1] = useState("child 1");
  const [child2, setChild2] = useState("child 2");

  useEffect(() => {
    setTimeout(() => setChild1("changed child 1"), 1000);
  });

  return (
    <>
      <ChildComponent value={child1} />
      <ChildComponent value={child2} />
    </>
  );
}
