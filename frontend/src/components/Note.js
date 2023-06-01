import {MdDeleteForever} from 'react-icons/md'
const Note = ({tresc, handleDeleteNote, note}) => {
    const handleDelete = () => {
        handleDeleteNote(note.id);
        console.log(note.id);
      };
    return(
        <div className="note">  
            <span>{tresc}</span>
            <div className="note-footer">
                <MdDeleteForever onClick={handleDelete} className='delete-icon' size='1.3em' />
            </div>
        </div>
    )
};

export default Note;