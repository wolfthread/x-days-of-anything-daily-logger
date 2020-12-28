import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light mr-2">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-challenge" className="btn btn-light mr-2">
        <i className="far fa-flag text-primary"></i> Add Challenge
      </Link>
    </div>
  );
};

export default DashboardActions;
