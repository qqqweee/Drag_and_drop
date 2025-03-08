import React, { useState } from 'react';
import './App.css';
import Column from '../components/Column';

function App() {
  const Default_notes = [
    { id: 1, text: "note1", column: "todo" },
    { id: 2, text: "note2", column: "completed" },
    { id: 3, text: "note3", column: "todo" },
    { id: 4, text: "note4", column: "doing" },
    { id: 5, text: "note5", column: "todo" },
    { id: 6, text: "note6", column: "completed" },
    { id: 7, text: "note7", column: "doing" },
    { id: 8, text: "note8", column: "todo" },
    { id: 9, text: "note9", column: "completed" },
    { id: 10, text: "note10", column: "todo" },
  ];

  const [latest_id, setlatest_id] = useState(10);
  const [dropid, setdropid] = useState();
  const [notes, setNotes] = useState(Default_notes);
  const [active1, setactive1] = useState('');

  const handleDragEnd = (e) => {
    const noteId = e.dataTransfer.getData("text/plain");
    const noteIdNum = parseInt(noteId);
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteIdNum));
    setactive1("");
  };

  const handledragenter = () => {
    setactive1("rgb(255, 0, 0)");
  };

  const handleDrop = (e, column) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("text/plain");
    const noteIdNum = parseInt(noteId);
    let updatedNotes = notes.filter(note => note.id !== noteIdNum);
    const draggedNote = notes.find(note => note.id === noteIdNum);
    if (draggedNote) {
      draggedNote.column = column;
      if (dropid !== null) {
        updatedNotes.splice((dropid - 2), 0, draggedNote);
      } else {
        updatedNotes.push(draggedNote);
      }
    }
    setNotes(updatedNotes);
  };

  return (
    <>
      <div className='board'>
        <Column
          title="Todo"
          column="todo"
          notes={notes}
          setNotes={setNotes}
          latest_id={latest_id}
          setlatest_id={setlatest_id}
          setdropid={setdropid}
          handleDrop={handleDrop}
        />
        <Column
          title="Completed"
          column="completed"
          notes={notes}
          setNotes={setNotes}
          latest_id={latest_id}
          setlatest_id={setlatest_id}
          setdropid={setdropid}
          handleDrop={handleDrop}
        />
        <Column
          title="Doing"
          column="doing"
          notes={notes}
          setNotes={setNotes}
          latest_id={latest_id}
          setlatest_id={setlatest_id}
          setdropid={setdropid}
          handleDrop={handleDrop}
        />
        <div className='delete' style={{ backgroundColor: active1 }} onDragLeave={() => setactive1(false)} onDragEnter={handledragenter} onDragOver={(e) => e.preventDefault()} onDrop={handleDragEnd}>
          <div className='mover'>
            {
              "delete.delete.".split("").map((item, i) => (
                <span key={i} style={{ "--pos": i + 1 }} className='span'>{item}</span>
              ))
            }
            🔥
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
