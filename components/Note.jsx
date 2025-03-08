import React, { useState } from 'react'

const Note = ({ id = '', text = '', column = '', setdropid = () => { } }) => {
  const [active, setactive] = useState(false)
  const handleDragStart = (e, noteId) => {
    e.dataTransfer.setData("text/plain", noteId);
    e.dataTransfer.effectAllowed = "move";
  };
  const handledragover = (e, id) => {
    e.preventDefault()
    setdropid(id)
  }
  const handledragend = () => {
    setactive(false)
  }
  const handledragleave = (id) => {
    setactive(false)
  }
  const handledragenter = () => {
    setactive(true)
  }
  const handledrop = () => {
    setactive(false)
  }
  return (
    <>
    <div
       style={{ opacity: active ? 1 : 0 }}
       className='highlight'></div>
      <div
        key={id}
        onDragEnd={handledragend}
        draggable
        onDrop={handledrop}
        onDragLeave={() => handledragleave(id)}
        onDragEnter={handledragenter}
        onDragStart={(e) => handleDragStart(e, id)}
        onDragOver={(e) => { handledragover(e, id) }}
        className='note'>
        {text}</div>
        
    </>
  )
}

export default Note