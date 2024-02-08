// App.tsx

import React from 'react';
import './admin.scss';
import UserTable from './table';
import Admin from './admin';

const MainAdmin: React.FC = () => {
  

  const users = [
    { id: 1, username: 'admin1', role: 'admin', email: 'admin1@example.com' },
    { id: 2, username: 'admin2', role: 'admin', email: 'admin2@example.com' },
    { id: 3, username: 'user1', role: 'user' },
  ];

  // Assume you want to display details for the first admin user
  const adminUser = users.find(user => user.role === 'admin');

  return (
    <div className="app-container">
     
      <h2>Users with Admin Role</h2>
      <UserTable users={users.filter(user => user.role === 'admin')} />

      {adminUser && <Admin admin={adminUser} />}
    </div>
  );
};

export default MainAdmin;
