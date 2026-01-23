import React from "react";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-card">
        <h2>🚀 About Task Flow</h2>

        <p className="about-subtitle">
          A simple, fast and smart task management app built with ❤️ using React & Firebase.
        </p>

        <div className="about-section">
          <h3>📌 What is Task Flow?</h3>
          <p>
            Task Flow is your personal productivity assistant that helps you manage
            daily tasks, quick notes, and important work — all securely stored in the cloud.
          </p>
        </div>

        <div className="about-section">
          <h3>✨ Features</h3>
          <ul>
            <li>✅ Secure Login & Signup</li>
            <li>📝 Todo & Quick List</li>
            <li>☁️ Cloud Sync with Firebase</li>
            <li>📱 Fully Responsive Design</li>
            <li>⚡ Fast & Lightweight</li>
          </ul>
        </div>

        <div className="about-section">
          <h3>🛠 Tech Stack</h3>
          <p>HTML, CSS, JavaScript, React, Firebase</p>
        </div>

        <div className="about-footer">
          <p>Made with ❤️ by <b>Neeraj</b></p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </section>
  );
};

export default About;
