import React, { useEffect, useRef } from 'react';
import { getDatabase, ref, set, update } from 'firebase/database';
import { app } from '../Firebase';
import { useUserData } from '../context/UserDataContext';

const Form = ({ editId, editTodo, clearEdit }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const { uid } = useUserData();

  // 🧠 When editTodo changes, fill inputs
  useEffect(() => {
    if (editTodo) {
      titleRef.current.value = editTodo.title;
      descRef.current.value = editTodo.description;
    }
  }, [editTodo]);

  function handleSubmit(e) {
    e.preventDefault();

    const title = titleRef.current.value;
    const desc = descRef.current.value;

    const db = getDatabase(app);

    if (editId) {
      // ✏️ UPDATE MODE
      update(ref(db, `users/${uid}/todos/${editId}`), {
        title: title,
        description: desc,
      });
      clearEdit();
    } else {
      // ➕ CREATE MODE
      const id = Date.now();

      set(ref(db, `users/${uid}/todos/${id}`), {
        title: title,
        description: desc,
        completed: false,
        createdAt: Date.now()
      });
    }

    titleRef.current.value = "";
    descRef.current.value = "";
  }

  return (
    <div className="form">
      <h3>{editId ? "Edit Task" : "Add New Task"}</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Title" ref={titleRef} required /><br />

        <input type="text" placeholder="Enter Description" ref={descRef} required /><br />

        <button type="submit" className='add-btn'>
          {editId ? "Update Task" : "Add Task"}
        </button>

        {editId && (
          <button className='cancel-btn' type="button" onClick={() => {
            clearEdit();
            titleRef.current.value = "";
            descRef.current.value = "";
          }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
