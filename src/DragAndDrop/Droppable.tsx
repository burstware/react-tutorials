import React from "react";
import { useDrop } from "react-dnd";
import "./index.css";

const Droppable = ({ onDrop, id }: { onDrop: (draggable: any, droppable: any) => void, id: number }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Draggable",
    drop: (item: any, monitor: any) => onDrop(monitor.getItem(), id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="droppable"
      style={{ backgroundColor: isOver ? "cyan" : "white" }}
    ></div>
  );
};

export default Droppable;
