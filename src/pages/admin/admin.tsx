// Admin.tsx

import React from 'react';
import './Admin.scss';

interface AdminProps {
  admin: {
    id: number;
    username: string;
    role: string;
    email?: string; // Make email optional
    // Add more details as needed
  };
}

const Admin: React.FC<AdminProps> = ({ admin }) => {
  return (
    <div className="admin-details">
      <h2>Admin Details</h2>
      <div>ID: {admin.id}</div>
      <div>Username: {admin.username}</div>
      {admin.email && <div>Email: {admin.email}</div>}
      {/* Add more details as needed */}
    </div>
  );
};

export default Admin;
