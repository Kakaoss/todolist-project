import React from "react";
import "./logowanie.css"
function Zaloguj(){
    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let correctp = "123";
    let correctl = "abc";
    
    if(login === "" || password === ""){
        alert("Oba pola musza byc uzupelnione");
    }
    else if(login !== correctl && password !== correctp){
        alert("Błędny login albo hasło");
    }
    else if(login === correctl && password === correctp){
        alert("Witamy");
        window.location.replace('/planer')
    }
}
function Logowanie(){
    return(
        <div className="logowanie">
        <h1>AMW</h1>
        <h2>Logowanie</h2>
  <div class="center">

  <div id="panel">
          <label for="username">Nazwa użytkownika:</label>
          <input type="text" id="username" name="username"/>
          <label for="password">Hasło:</label>
          <input type="password" id="password" name="password"/>
          <button id="btnlogin" onClick={Zaloguj} >Zaloguj</button>
      </div>
  </div>
</div>
    )
}

export default Logowanie;