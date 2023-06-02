import React, { useState } from "react";

const DraggableElement = (props:any) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event:any) => {
    setIsDragging(true);
    event.dataTransfer.setData("text/plain", props.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event:any) => {
    event.preventDefault();
  };

  const handleDrop = (event:any) => {
    event.preventDefault();
    const targetId = event.dataTransfer.getData("text");
    props.onDrop(targetId, props.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}>
      {props.children}
    </div>
  );
};

const Drag = () => {
  const [elements, setElements] = useState([
    { id: "1", text: "Element 1" },
    { id: "2", text: "Element 2" },
    { id: "3", text: "Element 3" },
  ]);

  const handleDrop = (dragId:any, dropId:any) => {
    if (dragId === dropId) {
      return;
    }

    const dragIndex = elements.findIndex((element) => element.id === dragId);
    const dropIndex = elements.findIndex((element) => element.id === dropId);
    const newElements = [...elements];
    const [dragElement] = newElements.splice(dragIndex, 1);
    newElements.splice(dropIndex, 0, dragElement);
    setElements(newElements);
  };

  return (
    <div>
      {elements.map(({ id, text }) => (
        <DraggableElement key={id} id={id} onDrop={handleDrop}>
          {text}
        </DraggableElement>
      ))}
    </div>
  );
};

export default Drag;