import React, {useEffect} from 'react'
import Note from './Note'
import AddNote from './AddNote';
const NotesList = ({ notes, handleAddNote, handleDeleteNote}) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => (
        <Note
          tresc={note.tresc}
          handleDeleteNote={handleDeleteNote}
          key={note.id} // Dodaj unikalny klucz
          note={note}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;
