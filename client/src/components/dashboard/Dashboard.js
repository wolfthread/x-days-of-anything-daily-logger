import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import HistoryOfChallenges from './HistoryOfChallenges';
import OpenChallenges from './OpenChallenges';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    //eslint-disable-next-line
  }, []);

  return loading && profile !== null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary mt-2 mb-4">Dashboard</h1>
      {profile !== null ? (
        <Fragment>
          <div className="d-xl-flex d-md-wrap justify-content-between">
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">
                  Welcome {user && user.name.trim().split(' ')[0]}
                </h4>
                <h6 className="card-subtitle mb-2 text-muted">
                  <p>
                    <i className="far fa-building mr-2"></i>
                    {profile.company}
                  </p>
                  <p>
                    <a
                      href={`https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe mr-2"></i>
                      {profile.website}
                    </a>
                  </p>
                </h6>
                <p className="card-text">
                  <i className="far fa-user mr-2"></i>
                  {profile.bio}{' '}
                </p>
                <a
                  href={`https://github.com/${profile.githubusername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github fa-2x m-2"></i>
                </a>
                <a
                  href={`https://twitter.com/${profile.twitterusername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x m-2"></i>
                </a>
              </div>
            </div>
            <div className="card text-white bg-success mb-4">
              <div className="card-body">
                <h4 className="card-title">Open Challenges</h4>
                <p className="card-text">
                  Which challenge you wish to log today?
                </p>
                <div>
                  <OpenChallenges openChallenges={profile.openchallenges} />
                </div>
              </div>
            </div>
          </div>
          <DashboardActions />
          <HistoryOfChallenges challenges={profile.challenges} />
          <div>
            <h4 className="text-danger mt-5">Danger Zone</h4>
            <p className="text-warning">
              If you want to delete your account, simply click the button below.
            </p>
            <button className="btn btn-danger mb-5">
              <i className="fas fa-user-minus" onClick={() => deleteAccount()}>
                Delete My Account
              </i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
);
