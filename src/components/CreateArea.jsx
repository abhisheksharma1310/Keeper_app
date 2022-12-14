import React, { useState } from "react";
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Add from '@mui/icons-material/Add';

function CreateArea(props) {

    const [expand, setExpend] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setExpend(true);
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        setExpend(false);
        event.preventDefault();
    }

    return (
        <div>
            <form className="create-note">
                {expand && <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />}
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={expand ? "3" : "1"}
                />
                <Zoom in={expand ? true : false}>
                    <Fab onClick={submitNote} aria-label="add">
                        <Add />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
