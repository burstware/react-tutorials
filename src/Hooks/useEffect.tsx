import React, { useEffect, useState } from "react";

export default function useEffectComponent() {
  const [content, setContent] = useState("initial content");
  const [timerValue, setTimerValue] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      setContent("changed");
    }, 2000);
  }, []); // <- only runs on initial render

  useEffect(() => {
    // because it runs the effect on inital render too
    if (content !== "initial content") {
      setTimeout(() => {
        setContent("changed again");
      }, 2000);
    }
  }, [content]);

  useEffect(() => {
    if (timerValue > 0) {
      setTimeout(() => {
        setTimerValue(timerValue - 1);
      }, 1000);
    }
  }, [timerValue]);

  return (
    <>
      <p>{content}</p>
      <p>Random value: {Math.floor(Math.random() * (10 - 1 + 1) + 1)}</p>
      <p>{timerValue}</p>
    </>
  );
}
