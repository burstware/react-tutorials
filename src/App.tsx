import React, { useState } from "react";
import "./App.css";
import ReactDnd from "./DragAndDrop/DragAndDrop";
import UseEffectComponent from "./Hooks/useEffect";
import UseMemoComponent from "./Hooks/useMemo";
import UsePrevious from "./Hooks/UsePrevious";
import UseStateComponent from "./Hooks/useState";
import ReactMemoComponent from "./ReactMemo";

function App() {
  const [selection, setSelection] = useState("");
  return (
    <div
      style={{
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <h1 style={{ cursor: "pointer" }} onClick={() => setSelection("")}>
        Tutorials
      </h1>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <li
          style={{
            cursor: "pointer",
            color: selection === "react-memo" ? "red" : "blue",
          }}
          onClick={() => setSelection("react-memo")}
        >
          React.memo
        </li>
        <li
          style={{
            cursor: "pointer",
            color: selection === "react-dnd" ? "red" : "blue",
          }}
          onClick={() => setSelection("react-dnd")}
        >
          react-dnd
        </li>
        <li
          style={{
            cursor: "pointer",
            color: selection === "use-state" ? "red" : "blue",
          }}
          onClick={() => setSelection("use-state")}
        >
          use-state
        </li>
        <li
          style={{
            cursor: "pointer",
            color: selection === "use-memo" ? "red" : "blue",
          }}
          onClick={() => setSelection("use-memo")}
        >
          use-memo
        </li>
        <li
          style={{
            cursor: "pointer",
            color: selection === "use-effect" ? "red" : "blue",
          }}
          onClick={() => setSelection("use-effect")}
        >
          use-effect
        </li>
        <li
          style={{
            cursor: "pointer",
            color: selection === "use-previous" ? "red" : "blue",
          }}
          onClick={() => setSelection("use-previous")}
        >
          use-previous
        </li>
      </ul>
      {selection === "react-dnd" && <ReactDnd />}
      {selection === "React.memo" && <ReactMemoComponent />}
      {selection === "use-previous" && <UsePrevious />}
      {selection === "use-state" && (
        <UseStateComponent initialValue="Some text" />
      )}
      {selection === "use-memo" && <UseMemoComponent />}
      {selection === "use-effect" && <UseEffectComponent />}
    </div>
  );
}

export default App;
