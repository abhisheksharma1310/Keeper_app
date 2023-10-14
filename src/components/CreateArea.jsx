import React, { useEffect, useState } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";
import Update from "@mui/icons-material/Update";
import { useNotes } from "../context/notes.context";

function CreateArea() {
  const {
    state: notes,
    addNote,
    editNote,
    updateNote,
    setEditNote,
  } = useNotes();

  const [expand, setExpend] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setExpend(true);
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (editNote) {
      updateNote(note);
      setEditNote(0);
    } else {
      addNote({ ...note, id: new Date().getTime() });
    }
    setNote({
      title: "",
      content: "",
    });
    setExpend(false);
  }

  useEffect(() => {
    if (editNote) handleNoteEdit();
  }, [editNote]);

  const handleNoteEdit = () => {
    const currentNote = notes.find((note) => note.id === editNote);
    setNote(currentNote);
    setExpend(true);
  };

  return (
    <div>
      <form className="create-note" onSubmit={submitNote} method="post">
        {expand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expand ? "3" : "1"}
        />
        <Zoom in={expand ? true : false}>
          <Fab onClick={submitNote} aria-label="add">
            {editNote == 0 ? <Add /> : <Update />}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
