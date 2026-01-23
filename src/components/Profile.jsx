import React from 'react';
import { useUserData } from '../context/UserDataContext';

const Profile = () => {
  const { profile, uid } = useUserData();

  if (!profile) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">👤 User Profile</h2>

        <div className="profile-row">
          <span>Unique ID</span>
          <span className="value">{uid}</span>
        </div>

        <div className="profile-row">
          <span>Name</span>
          <span className="value">{profile.name}</span>
        </div>

        <div className="profile-row">
          <span>Date of Birth</span>
          <span className="value">{profile.dob}</span>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <span className="value">{profile.email}</span>
        </div>

        <div className="profile-row">
          <span>Mobile</span>
          <span className="value">{profile.mobile}</span>
        </div>

        <div className="profile-row">
          <span>Account Created</span>
          <span className="value">
            {new Date(profile.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
