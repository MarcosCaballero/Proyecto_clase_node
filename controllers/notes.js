import connection from "../utils/connection.js";
import {
  createNoteInDB,
  updateNoteInDB,
  deleteNoteInDB,
  getsAllNotesInDB,
  getNoteByIdInDB,
} from "../models/notes.js";

export const getAllNotes = (req, res) => getsAllNotesInDB(req, res);

export const getNoteById = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.render("error", {
      message: "El id es obligatorio",
    });
    return;
  }
  getNoteByIdInDB(id, res);
};

export const createNote = (req, res) => {
  // Tomamos la información del formulario
  const { title, description } = req.body;

  // Validar que el título y la descripción no estén vacíos
  if (!title || !description) {
    res.render("error", {
      message: "El título y la descripción son obligatorios",
    });
    return;
  }

  // Crear la nota en la base de datos
  createNoteInDB(title, description, res);
};

export const updateNote = async (req, res) => {
  const { id, title, description } = req.body;

  return updateNoteInDB(id, title, description, res);
};

export const deleteNote = (req, res) => {
  const { id } = req.params;

  return deleteNoteInDB(id, res);
};
