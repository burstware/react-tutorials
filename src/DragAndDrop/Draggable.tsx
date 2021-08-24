import React, { ReactNode } from "react";
import { useDrag } from "react-dnd";

const Draggable = ({ children }: { children: ReactNode }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Draggable",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { id: children },
  }));

  return (
    <div
      ref={drag}
      className="draggable"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p>{children}</p>
    </div>
  );
};

export default Draggable;
