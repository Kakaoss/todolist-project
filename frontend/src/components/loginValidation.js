function Validation(values) {
    let error = {}

    if(values.login === ""){
        error.login = "Nazwa powininna być uzupełniona"
    }else {
        error.login = ""
    }

    if(values.haslo === ""){
        error.haslo = "Hasło powinno być uzupełnione"
    }else {
        error.haslo = ""
    }

    return error;
}

export default Validation;