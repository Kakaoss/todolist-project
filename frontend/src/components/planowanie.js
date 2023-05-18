import React, { useEffect, useState } from "react";
import './planer.css';

function Planer(){
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8081/uzytkownicy')
        .then(res => res.json())
        .then(data=> setData(data))
        .catch(err => console.log(err));
    }, [])

    return(
        <div>
        <h1>Panel planowania</h1>
        <table>
        {data.map((d, i) => (
            <tr key={i}>
                <td>{d.id}</td>
                <td>{d.login}</td>
                <td>{d.haslo}</td>
            </tr>
        ))}
        </table>
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