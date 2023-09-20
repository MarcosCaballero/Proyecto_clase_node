import express from "express";
import cors from "cors";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./controllers/notes.js";

const app = express();
// configurar cors para que cualquier cliente pueda hacer peticiones a este servidor
app.use(cors());
// para que express pueda entender los datos que vienen desde el cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configurar pug como motor de vistas
app.set("view engine", "pug");

// redirect a home
app.get("/", (req, res) => {
  res.redirect("/home");
});
// ROUTES
app.get("/home", (req, res) => getAllNotes(req, res));
// Tomar una nota por id
app.get("/notes/:id", (req, res) => getNoteById(req, res));
// Crear nueva nota
app.post("/home", (req, res) => createNote(req, res));
// Actualizar una nota
app.patch("/notes/:id", (req, res) => updateNote(req, res));
// Borrar una nota
app.delete("/notes/:id", (req, res) => deleteNote(req, res));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});

// Pasos para levantar la app
// 1. Instalar Node desde https://nodejs.org/es
// 2. Abrir la terminal y ejecutar los siguientes comandos
// 3. Npm install
// 4. Npm run start
