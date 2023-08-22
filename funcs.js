function updateNote(idNote) {
  console.log("update" + idNote);
  //- consle.log(note.id_note)
  //- noteId = note.id_note
  //- update = true
  //- location.href=`/notes/${noteId}`
}

function deleteNote(noteId) {
  console.log("delete");
  fetch("/notes", {
    method: "DELETE",
    body: JSON.stringify({
      id_note: noteId,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      //   window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
