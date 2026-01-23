import React, { useState } from 'react';
import { useUserData } from '../context/UserDataContext';
import { getDatabase, ref, remove, update } from "firebase/database";
import { app } from "../Firebase";
import QuickForm from './QuickForm';

const QuickList = () => {
  const { quickList, uid } = useUserData();

  const db = getDatabase(app);

  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // 🗑️ Delete
  const handleDelete = (id) => {
    remove(ref(db, `users/${uid}/quickList/${id}`));
  };

  // ✏️ Edit
  const handleEdit = (id, item) => {
    setEditId(id);
    setEditItem(item);
  };

  // ❌ Cancel edit
  const clearEdit = () => {
    setEditId(null);
    setEditItem(null);
  };

  // ✅ Toggle
  const toggleComplete = (id, currentStatus) => {
    update(ref(db, `users/${uid}/quickList/${id}`), {
      completed: !currentStatus
    });
  };

  return (
    <section>
      <QuickForm
        editId={editId}
        editItem={editItem}
        clearEdit={clearEdit}
      />

      <div className="tasks-section">
        <h2>Your Quick List</h2>

        {!quickList && (
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

        {quickList && Object.entries(quickList).map(([id, item]) => (
          <div key={id} className={`task-card ${item.completed ? "completed" : ""}`}>
            <div className="task-item">
              <input
                type="checkbox" className='task-check'
                checked={item.completed}
                onChange={() => toggleComplete(id, item.completed)}
              />

              <h3>{item.content}</h3>
              <button onClick={() => handleEdit(id, item)} className='edit-btn desktop-only'>Edit</button>
              <button onClick={() => handleDelete(id)} className='delete-btn desktop-only'>Delete</button>
              <button onClick={() => handleEdit(id, item)} className='edit-btn mobile-icon'><i className="fa fa-edit"></i></button>
              <button onClick={() => handleDelete(id)} className='delete-btn mobile-icon'><i className="fa fa-trash"></i></button>
            
            </div>
            <small>
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickList;
