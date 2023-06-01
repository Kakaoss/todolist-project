import React, { useState, useEffect } from "react";
import "./logowanie.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Validation from "./loginValidation";

function Logowanie(){
    const[values, setValues] = useState({
        login: '',
        haslo: ''
    })

    const navigate = useNavigate();

    const[errors, setErrors] = useState({})

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then((res) => {
            if(res.data.valid){
                navigate('/planer')
            } else{
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.login === "" && errors.haslo === ""){
            await axios.post('http://localhost:8081/uzytkownicy', values)
            .then((res) => {
                console.log(res.data); // Sprawdź, co jest zwracane przez serwer
                if (res.data.Logowanie) {
                    navigate('/planer');
                } else {
                    console.log("Brak odpowiednich rekordów");
                }
            }).catch((err) => {
                console.log(err);
            });
        }  
    }

    const handleSubmitt = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/signup', values)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });
    }

    return(
        <div className="logowanie">
        <h1>AMW</h1>
        <h2>Logowanie</h2>
  <div className="center">

  <div id="panel">

        {/* <form onSubmit={handleSubmitt}>
        <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" id="username" name="login" onChange={handleInput}/>
            <label htmlFor="password">Hasło:</label>
            <input type="password" id="password" name="haslo" onChange={handleInput}/>
            <button id="btnlogin" type="Submit">stworz</button>
        </form> */}

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" id="username" name="login" onChange={handleInput}/>
            {errors.login && <span className="text-danger">{errors.login}</span>}
            <label htmlFor="password">Hasło:</label>
            <input type="password" id="password" name="haslo" onChange={handleInput}/>
            {errors.haslo && <span className="text-danger">{errors.haslo}</span>}
            <br/>
            <button id="btnlogin" type="Submit">Zaloguj</button>
          </form>
      </div>
  </div>
</div>
    )
}

export default Logowanie;