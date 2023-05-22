import React, { useEffect, useState } from "react";
import axios from "axios";
import './planer.css';
import { useNavigate } from "react-router-dom";


function Planer(){
    const [name,setName] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then((res) => {
            if(res.data.valid){
                setName(res.data.login);
            } else{
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
        });
    }, [])
    return(
        <div>
        <h1>Panel planowania</h1>
    <section id="lewy">
        <h2>Do wykonania</h2>
    </section>
    <section id="srodkowy">
        <h2>Zadania</h2>
    </section>
    <section id="prawy">
    <h2>Notatki</h2>
    </section>
    <footer>
    </footer>
    </div>
    )
}

export default Planer;