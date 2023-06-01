import express, { response } from "express";
import mysql from 'mysql';
import cors from 'cors';
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const salt = 10;
const app = express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
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

app.post('/signup', (req,res) => {
  const sql = "INSERT INTO uzytkownicy(`login`,`haslo`) VALUES (?) ";
  const password = req.body.haslo;
  bcrypt.hash(password.toString(), salt, (err,hash) => {
    if(err){
      console.error(err);
    }
    const values = [
      req.body.login,
      hash
    ]
    db.query(sql,[values], (err,data) => {
      if(err){
        return res.json("Error");
      }
      return res.json(data);
    })
  })
})

app.get('/', (req,res) => {
    if(req.session.login){
        return res.json({valid: true, login: req.session.login})
    } else {
        return res.json({valid: false})
    }
})

// app.post('/api/uzytkownicy', async (req, res) => {
//   const sql = "SELECT * FROM uzytkownicy WHERE `login` = ?";
//   try {
//     const data = await db.query(sql, [req.body.login]);
//     console.log(db.query(sql, [req.body.login]));
//     console.log(data[0]);
//     if (data && data.length === 1) {
//       const response = await bcrypt.compare(req.body.haslo.toString(), data[0].haslo);
//       if (response) {
//         req.session.login = data[0].login;
//         return res.json({ Logowanie: true });
//       } else {
//         return res.json({ Logowanie: false });
//       }
//     } else {
//       return res.json({ error: "Failed" });
//     }
//   } catch (error) {
//     console.error("Błąd podczas logowania:", error);
//     return res.json({ error: "Error" });
//   }
// });

app.post('/uzytkownicy', (req, res) => {
  const sql = "SELECT * FROM uzytkownicy WHERE login = ? AND haslo = ?";

  db.query(sql, [req.body.login, req.body.haslo], (err, data) => { 
      if(err) return res.json("Error");
      if(data.length > 0) {
          console.log(data[0]);
          req.session.login = data[0].login;
          return res.json({Logowanie: true});
      } else {
          return res.json({Logowanie: false});
      }
  })
})


//FISZKI 

// app.post('/fiszki', (req, res) => {
//     const fiszkaData = req.body;
//     const insertQuery = `
//       INSERT INTO zadania(nazwa_zadania, data_zadania, opis_zadania, nr_sali, zadania.id_uzytkownik )
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const values = [
//       fiszkaData.nazwa_zadania,
//       fiszkaData.data_zadania,
//       fiszkaData.opis_zadania,
//       fiszkaData.nr_sali,
//       fiszkaData.id_uzytkownik,
//     ];
//     db.query(insertQuery, values, (err, res) => {
//         if (err) {
//           console.log("Błąd podczas dodawania fiszki:", err);
//           res.status(500).send("Wystąpił błąd podczas dodawania fiszki.");
//         } else {
//           const insertedId = res.insertId;
//           res.status(200).json({ id: insertedId });
//         }
//       });
// })

// NOTATKA

// Pobieranie wszystkich notatek
app.get("/notes", (req, res) => {
    db.query("SELECT * FROM notatka",(error, results) => {
      if (error) {
        console.error("Błąd podczas pobierania notatek:", error);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania notatek" });
      } else {
        const notesWithIds = results.map((note) => ({ ...note, id: results.id }));
        res.json(notesWithIds);
      }
    });
  });
  
  // Tworzenie nowej notatki
  app.post("/notes", (req, res) => {
    const newNote = req.body;
    db.query("INSERT INTO notatka SET ?", newNote, (error, result) => {
      if (error) {
        console.error("Błąd podczas tworzenia notatki:", error);
        res.status(500).json({ error: "Wystąpił błąd podczas tworzenia notatki" });
      } else {
        newNote.id = result.insertId;
        res.json(newNote);
      }
    });
  });

  // Usuwanie notatki o określonym ID
  app.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    db.query(
      "DELETE FROM notatka WHERE id_notatki = ?",
      [noteId],
      (error, result) => {
        if (error) {
          console.error("Błąd podczas usuwania notatki:", error);
          res
            .status(500)
            .json({ error: "Wystąpił błąd podczas usuwania notatki" });
        } else {
          res.json({ message: "Notatka została pomyślnie usunięta" });
        }
      }
    );
  });

// LOGOUT
app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    return res.json({Status: "Success"})
})


app.listen(8081, ()=> {
    console.log("listening");
})