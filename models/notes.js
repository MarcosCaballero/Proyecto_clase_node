import connection from "../utils/connection.js";

export const getsAllNotesInDB = (req, res) => {
  connection.query("SELECT * FROM notas", (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.render("index", {
        title: "Notes App",
        notes: results,
        noteId: -1,
        handlerUpdate: (id_note) => {
          const noteId = id_note;
          update = true;
          location.href = `/notes/${noteId}`;
        },
        update: false,
      });
    }
  });
};

export const getNoteByIdInDB = (id, res) => {
  connection.query(
    "SELECT * FROM notas WHERE id_note = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.render("UpdateForm", {
          title: "Notes App",
          message: "Update a note",
          note: results[0],
        });
      }
    }
  );
};

export const createNoteInDB = (title, description, res) => {
  connection.query(
    "INSERT INTO notas (title, description, created_at) VALUES (?, ?, ?)",
    [title, description, new Date()],
    (err, results) => {
      if (err) {
        res.render("error", {
          message: "Error al crear la nota",
        });
        console.log(err);
      } else {
        res.redirect("/home");
      }
    }
  );
};

export const updateNoteInDB = (id, title, description, res) => {
  connection.query(
    "UPDATE notas SET title = ?, description = ? WHERE id_note = ?",
    [title, description, id],
    (err, results) => {
      if (err) {
        res.render("error", {
          message: "Error al actualizar la nota",
        });
      } else {
        res.render("index", {
          title: "Notes App",
          notes: results,
          noteId: -1,
          handlerUpdate: (id_note) => {
            const noteId = id_note;
            update = true;
            location.href = `/notes/${noteId}`;
          },
          update: false,
        });
      }
    }
  );
};

export const deleteNoteInDB = (id, res) => {
  connection.query(
    "DELETE FROM notas WHERE id_note = ?",
    [id],
    (err, results) => {
      if (err) {
        res.render("error", {
          message: "Error al eliminar la nota",
        });
        console.log(err);
      } else {
        res.json({ message: "Note deleted" });
      }
    }
  );
};
