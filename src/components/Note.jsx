import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Note = ({ title, content, id, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
};

export default Note;
