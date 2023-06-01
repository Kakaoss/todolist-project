import { useState } from "react";

const AddNote = ({handleAddNote}) => {
    const[noteText, setNoteText] = useState('');
    const characterLimit = 100;

    const handleChange = (e) => {
        if(characterLimit - e.target.value.length >=0)
            setNoteText(e.target.value);
    }

    const handleSaveClick = () => {
        if(noteText.length > 0)
            handleAddNote(noteText);
    }

    return(
        <div className='note new'>
            <textarea
                rows='8'
                cols='10'
                placeholder="Napisz cos, aby dodac"
                value={noteText}
                onChange={handleChange}
            >
            </textarea>
            <div className='note-footer'>
                <small>Zostało {characterLimit - noteText.length}</small>
                <input type="button" className='save' onClick={handleSaveClick} value="Zapisz"/>
            </div>
        </div>
    )
}

export default AddNote;