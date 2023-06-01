import React, { useEffect, useState } from "react";
import axios from "axios";
import './planer.css';
import { useNavigate } from "react-router-dom";
import NotesList from "./NotesList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function Planer(){
    const [name,setName] = useState('')
    const navigate = useNavigate()

    //FISZKI

    const [fiszkaData, setFiszkaData] = useState({
      nazwaZadania: "",
      dataWykonania: "",
      dataUplywu: "", 
      opisZadania: "",
      nrSali: "",
      uzytkownik: ""
    });
  
    const [fiszki, setFiszki] = useState([]);
  
    const handleInputChange = (e) => {
      setFiszkaData({
        ...fiszkaData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleDateChange = (date) => {
            const formattedDate = date.toISOString().split("T")[0];
            setFiszkaData({
              ...fiszkaData,
              dataUplywu: formattedDate
            });
          };
  
    const handleDodajClick = () => {
      const newFiszka = { ...fiszkaData };
      setFiszki([...fiszki, newFiszka]);
      setFiszkaData({
        nazwaZadania: "",
        dataWykonania: "",
        dataUplywu: "", 
        opisZadania: "",
        nrSali: "",
        uzytkownik: ""
      });
    };

    useEffect(() => {
      const today = new Date().setHours(0, 0, 0, 0);
      const updatedFiszki = fiszki.map((fiszka) => {
        const fiszkaDate = new Date(fiszka.dataUplywu).setHours(0, 0, 0, 0);
        const daysDifference = Math.floor((fiszkaDate - today) / (1000 * 60 * 60 * 24));
        let color = "rgb(115, 255, 127)";
        if (daysDifference < 0) {
          color = "rgb(255, 110, 110)";
        } else if (daysDifference < 3) {
          color = "rgb(255, 246, 126)";
        }
        return { ...fiszka, color };
      });
      const sortedFiszki = updatedFiszki.sort((a, b) => new Date(a.dataUplywu) - new Date(b.dataUplywu));
      setFiszki(sortedFiszki);
    }, [fiszki]);

    
    //KONIEC FISZKI 
    //NOTATKA
    
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState((notes[0]?.id) || '');
  
    useEffect(() => {
      if (notes.length > 0) {
        setCurrentNoteId(notes[0].id);
      } else {
        setCurrentNoteId('');
      }
    }, [notes]);

  async function fetchNotes() {
    try {
      const response = await axios.get('http://localhost:8081/notes');
      const notesArr = response.data;
      setNotes(notesArr);
      if (notesArr.length > 0) {
        setCurrentNoteId(notesArr[0].id);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania notatek:', error);
    }
  }

  async function AddNote(text) {
    const newNote = {
      tresc: text
    };

    try {
      const response = await axios.post('http://localhost:8081/notes', newNote);
      setNotes([...notes, response.data]);
      setCurrentNoteId(response.data.id);
    } catch (error) {
      console.error('Błąd podczas tworzenia nowej notatki:', error);
    }
  }

  async function deleteNote(noteId) {
    try {
      await axios.delete(`http://localhost:8081/notes/${noteId}`);
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      console.log(updatedNotes);
      setNotes(updatedNotes);
      if (currentNoteId === noteId && updatedNotes.length > 0) {
        setCurrentNoteId(updatedNotes[0].id);
      } else if (updatedNotes.length === 0) {
        setCurrentNoteId('');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania notatki:', error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);
    
  
    //LOGOWANIE

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then((res) => {
            if(res.data.valid){
                setName(res.data.login)
            } else{
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    const HandleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then((res) => {
            window.location.reload(true);
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <div className="e">
<div className="gora">
              <div className="lheader">
            <p>Zalogowany jako: {name}</p> 
              <button onClick={HandleLogout}>Wyloguj</button>
              </div>
                <div className="sheader">
                <p>Zadania</p>
                </div>
            <div className="pheader">
            <p>Notatki</p>
            </div>
</div>
    <div className="glowne">
        <div className="lmain">
                <h3>Dodaj fiszkę</h3>
                      <p>Nazwa zadania</p>
                      <input
                        type="text"
                        name="nazwaZadania"
                        value={fiszkaData.nazwaZadania}
                        onChange={handleInputChange}
                      />
                      <p>Data upływu</p>
                      <DatePicker
                        key={fiszkaData.dataUplywu}
                        selected={fiszkaData.dataUplywu ? new Date(fiszkaData.dataUplywu) : null}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                      />
                      <p>Opis zadania</p>
                      <input
                        type="text"
                        name="opisZadania"
                        value={fiszkaData.opisZadania}
                        onChange={handleInputChange}
                      />
                      <p>Nr sali</p>
                      <select
                        name="nrSali"
                        value={fiszkaData.nrSali}
                        onChange={handleInputChange}
                      >
                        <option value="">Nr sali</option>
                        <option value="123">123</option>
                        <option value="321">321</option>
                        <option value="222">222</option>
                      </select>
                      <p>Uzytkownik</p>
                      <select
                        name="uzytkownik"
                        value={fiszkaData.uzytkownik}
                        onChange={handleInputChange}
                      >
                        <option value="Marek">Marek</option>
                        <option value="Tomek">Tomek</option>
                      </select>
                      <br />
                      <br />
                      <button
                        id="dodaj"
                        className="dodajbtn"
                        onClick={handleDodajClick}
                      >
                        Dodaj
                      </button>
        </div>
        <div className="smain">
        <h3>Do wykonania</h3>
        <div className="notki">
          {fiszki.map((fiszka, index) => (
            <div className={`not${index + 1}`} key={index} style={{ backgroundColor: fiszka.color }}>
              <p className="nazwazad">{fiszka.nazwaZadania}</p>
              <p className="opiszad">{fiszka.opisZadania}</p>
              <div className="dolnot">
                <p className="dataupl">
                  {fiszka.dataUplywu
                    ? new Date(fiszka.dataUplywu + "T00:00:00Z")
                      .toLocaleDateString()
                      .split("T")[0]
                    : ""}
                </p>
                <p className="nrsali">Nr sali: {fiszka.nrSali}</p>
                <p className="uzytkownikp">{fiszka.uzytkownik}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        <div className="pmain">
                <h3>Dodaj notatkę</h3> <br></br>
                <div className="container">
                        <NotesList notes={notes} handleAddNote={AddNote} handleDeleteNote={deleteNote}/>
                </div>
        </div>
</div>
</div>
    );
}

export default Planer;