import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
})

app.get('/', (req,res) => {
    if(req.session.login){
        return res.json({valid: true, login: req.session.login})
    } else {
        return res.json({valid: false})
    }
})

app.post('/uzytkownicy', (req, res) => {
    const sql = "SELECT * FROM uzytkownicy WHERE login = ? AND haslo = ?";

    db.query(sql, [req.body.login, req.body.haslo], (err, data) => { 
        if(err) return res.json("Error");
        if(data.length > 0) {
            req.session.login = data[0].login;
            return res.json({Logowanie: true});
        } else {
            return res.json({Logowanie: false});
        }
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})