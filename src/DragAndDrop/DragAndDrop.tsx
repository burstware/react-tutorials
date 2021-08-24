import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

const originalLeftItems = new Array(10).fill("").map((item, i) => ({
  id: i,
  type: "Draggable",
}));
const originalRightItems = new Array(10).fill("").map((item, i) => ({
  id: i + 10,
  type: "Droppable",
}));

const ReactDnd = () => {
  const [leftItems, setLeftItems] = useState(originalLeftItems);
  const [rightItems, setRightItems] = useState(originalRightItems);

  const handleDrop = (draggableItem: any, droppableItem: any) => {
    console.log("item dropped", draggableItem, 'on to', droppableItem);
    // if (draggableItem)
    // setLeftItems(leftItems[])
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <h2>Draggables</h2>
        {leftItems.map((item) => {
            return item.type === 'Droppable' ? <Droppable onDrop={handleDrop} id={item.id}/> : <Draggable>{item.id}</Draggable>;
        })}
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <h2>Droppables</h2>
        <div style={{ flex: 1, display: "flex", flexDirection: "row", gap: 8 }}>
          {rightItems.map((item) => {
            return item.type === 'Droppable' ? <Droppable onDrop={handleDrop} id={item.id} /> : <Draggable>{item.id}</Draggable>;
          })}
        </div>
      </div>
    </div>
  );
};

const ReactDndWrapper = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactDnd />
    </DndProvider>
  );
};

export default ReactDndWrapper;
