import React, { useEffect, useRef } from 'react';
import { getDatabase, ref, push, update } from "firebase/database";
import { app } from "../Firebase";
import { useUserData } from '../context/UserDataContext';

const QuickForm = ({ editId, editItem, clearEdit }) => {
  const inputRef = useRef(null);
  const { uid } = useUserData();

  const db = getDatabase(app);

  // Fill input when editing
  useEffect(() => {
    if (editItem) {
      inputRef.current.value = editItem.content;
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = inputRef.current.value.trim();
    if (!content) return;

    // ✏️ Update
    if (editId) {
      update(ref(db, `users/${uid}/quickList/${editId}`), {
        content: content
      });
      clearEdit();
    }
    // ➕ Add new
    else {
      push(ref(db, `users/${uid}/quickList`), {
        content: content,
        completed: false,
        createdAt: Date.now()
      });
    }

    inputRef.current.value = "";
  };

  return (
    <div className="form">
      <h3>{editId ? "Edit Item" : "Add Quick Item"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write something..."
          ref={inputRef}
          autoFocus
        />

        <button type="submit" className='add-btn'>
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button className='cancel-btn' type="button" onClick={() => {
            clearEdit();
            inputRef.current.value = "";
          }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default QuickForm;
