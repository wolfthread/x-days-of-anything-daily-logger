import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated },
  logout,
  profile: { profile },
}) => {
  const authLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      {profile !== null ? (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/dailylog">
              Daily Logger
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dailylog/history">
              Daily Logs History
            </Link>
          </li>
        </Fragment>
      ) : (
        ''
      )}
      <li>
        <Link className="nav-link" onClick={logout} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/features">
          Features
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        My Daily Logger
      </Link>
      <div id="navbarColor01">
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
