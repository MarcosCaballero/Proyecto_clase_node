import express from "express";
import cors from "cors";
import connection from "./utils/connection.js";

const app = express();
// configurar cors para que cualquier cliente pueda hacer peticiones a este servidor
app.use(cors());
// para que express pueda entender los datos que vienen desde el cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configurar pug como motor de vistas
app.set("view engine", "pug");

let update;

const handlerUpdate = (id_note) => {
  console.log(id_note);
  const noteId = id_note;
  update = true;
  location.href = `/notes/${noteId}`;
};

app.get("/", (req, res) => {
  // se le devuelve al usuario
  // res.json({ message: "Welcome to the server!" });
  // vista hecha con pug
  //   res.render("index", { title: "Notes App" });
  connection.query("SELECT * FROM notas", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Notes App",
        notes: results,
        noteId: -1,
        handlerUpdate: handlerUpdate,
        update: update,
      });
    }
  });
  // res.render("PostForm", { title: "Notes App", message: "Create a new note" });
});

// Tomar todas las notas
app.get("/notes", (req, res) => {
  res.json({ message: "All notes" });
});
// Tomar una nota por id
app.get("/notes/:id", (req, res) => {
  res.json({ message: "Note by id" });
});
// Crear nueva nota
app.post("/", (req, res) => {
  const { title, description } = req.body;
  connection.query(
    "INSERT INTO notas (title, description, created_at) VALUES (?, ?, ?)",
    [title, description, new Date()],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
  // res.json({ message: "New note added", body: req.body });
});
// Actualizar una nota
app.put("/notes/:id", (req, res) => {
  const { id, title, description } = req.body;

  res.json({ message: "Note updated" });
});
// Borrar una nota
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM notas WHERE id_note = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Note deleted" });
      }
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});

// Pasos para levantar la app
// 1. Instalar Node desde https://nodejs.org/es
// 2. Abrir la terminal y ejecutar los siguientes comandos
// 3. Npm install
// 4. Npm run start
