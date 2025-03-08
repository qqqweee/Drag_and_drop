import React, { useState } from 'react';
import Note from '../components/Note';

const Column = ({ title, column, notes, setNotes, latest_id, setlatest_id, setdropid, handleDrop }) => {
    const [notetext, settext] = useState('');
    const [active, setActive] = useState(false);

    const handleclick = (e, col) => {
        e.preventDefault();
        const newnote = { id: latest_id + 1, text: notetext, column: col };
        setNotes([...notes, newnote]);
        setlatest_id(latest_id + 1);
        settext('');
        setActive(false);
    };

    const handlefocus = () => {
        setActive(true);
    };

    const handleclose = () => {
        setActive(false);
    };

    return (
        <div className='column' onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, column)}>
            <h2>{title}</h2>
            <div className='notes'>
                {notes.map((note) => {
                    if (note.column === column) {
                        return (
                            <Note
                                key={note.id}
                                id={note.id}
                                text={note.text}
                                column={note.column}
                                setdropid={setdropid}
                            />
                        );
                    }
                })}
                <div className='adder' >
                    {active ? <>
                        <textarea value={notetext} onChange={(e) => settext(e.target.value)} placeholder='Add a new task'></textarea>
                        <div className="add">
                            {active && <button onClick={handleclose} className='button'>Close</button>}
                            <button style={{backgroundColor:"whitesmoke",color:"black"}} onClick={(e) => handleclick(e, column)} className='button'>
                                Add +
                            </button>
                        </div>
                    </> : <button onFocus={handlefocus} className='button1'>
                        Add Task ▶
                    </button>}

                </div>
            </div>
        </div>
    );
};

export default Column;
