import React, { useState } from "react";

export default function useStateComponent({
  initialValue,
}: {
  initialValue: string;
}) {
  const [someVar, setSomeVar] = useState(initialValue);
  return (
    <div>
      <button onClick={() => setSomeVar("react is cool")}>
        Click Me for 1
      </button>
      <button onClick={() => setSomeVar("look at this")}>Click Me for 2</button>
      <p>{someVar}</p>
    </div>
  );
}
