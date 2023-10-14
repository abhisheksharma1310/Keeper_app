import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const getLocalState = () => {
  const data = localStorage.getItem("keeperNotes");
  const stateData = JSON.parse(data);
  return stateData?.length > 0 ? stateData : [];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addNote":
      return [...state, action.payload];
    case "deleteNote":
      return state.filter((note) => note.id !== action.payload);
    case "updateNote":
      const index = state.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      return state;
    default:
      return state;
  }
};

export const NotesContext = createContext(null);

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getLocalState());
  const [editNote, setEditNote] = useState(0);

  const addNote = (note) => {
    dispatch({ type: "addNote", payload: note });
  };
  const updateNote = (note) => {
    dispatch({ type: "updateNote", payload: note });
  };
  const deleteNote = (id) => {
    dispatch({ type: "deleteNote", payload: id });
  };

  useEffect(() => {
    localStorage.setItem("keeperNotes", JSON.stringify(state));
  }, [state, editNote]);

  return (
    <NotesContext.Provider
      value={{ state, addNote, updateNote, deleteNote, editNote, setEditNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;

export const useNotes = () => useContext(NotesContext);
