// ComplaintScreen.tsx

import React from 'react';
import './complain.scss';

const ComplaintScreen: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="complaint-screen">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ComplaintScreen;
