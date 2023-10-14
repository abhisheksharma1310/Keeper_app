import React from "react";
import { useNotes } from "../context/notes.context";
import Note from "./Note";

const Notes = () => {
  const { state: notes, setEditNote, deleteNote } = useNotes();

  return (
    <div className="notes">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onEdit={setEditNote}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
};

export default Notes;
