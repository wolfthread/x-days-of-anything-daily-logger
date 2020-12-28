import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../header/header';
import DailyQuote from '../daily-quote/daily-quote';

import '../../App.css';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <Header />
        <div className="d-flex justify-content-center mb-3">
          <Link to="/register" className="btn btn-primary btn-lg mr-4">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg ml-4">
            Log In
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <DailyQuote />
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
