import React, { useState } from 'react';
import Form from './Form';
import { useUserData } from '../context/UserDataContext';
import { getDatabase, ref, remove, update } from "firebase/database";
import { app } from "../Firebase";

const TodoList = () => {
  const { todos, uid } = useUserData();

  const db = getDatabase(app);

  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

  // 🗑️ Delete
  const handleDelete = (id) => {
    remove(ref(db, `users/${uid}/todos/${id}`));
  };

  // ✏️ Edit
  const handleEdit = (id, todo) => {
    setEditId(id);
    setEditTodo(todo);
  };

  // ❌ Cancel edit
  const clearEdit = () => {
    setEditId(null);
    setEditTodo(null);
  };

  // ✅ Toggle
  const toggleComplete = (id, currentStatus) => {
    update(ref(db, `users/${uid}/todos/${id}`), {
      completed: !currentStatus
    });
  };

  return (
    <section>
      <Form editId={editId} editTodo={editTodo} clearEdit={clearEdit} />

      <div className="tasks-section">
        <h2>Your Tasks</h2>

        {!todos && (
          <div
            id="emptyMessage"
            style={{
              textAlign: "center",
              marginTop: "8%",
              color: "gray",
              fontSize: "larger"
            }}
          >
            <i
              className="fas fa-clipboard-list"
              style={{ fontSize: "48px", marginBottom: "20px" }}
            ></i>

            <h3>No Tasks Available. Please add some tasks.</h3>
          </div>
        )}

        {todos && Object.entries(todos).map(([id, todo]) => (
          <div key={id} className={`task-card ${todo.completed ? "completed" : ""}`}>
            <div className="task-item">
              <input type="checkbox" className='task-check' checked={todo.completed}
                onChange={() => toggleComplete(id, todo.completed)}
              />
              <h3>{todo.title}</h3>
              <button onClick={() => handleEdit(id, todo)} className='edit-btn desktop-only'>Edit</button>
              <button onClick={() => handleDelete(id)} className='delete-btn desktop-only'>Delete</button>
              <button onClick={() => handleEdit(id, todo)} className='edit-btn mobile-icon'><i className="fa fa-edit"></i></button>
              <button onClick={() => handleDelete(id)} className='delete-btn mobile-icon'><i className="fa fa-trash"></i></button>
            </div>
            <div className="task-desc">
              <p className='todo-desc'>{todo.description}</p>
              <small> {new Date(todo.createdAt).toLocaleString()}</small>
            </div>
            <br />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodoList;
