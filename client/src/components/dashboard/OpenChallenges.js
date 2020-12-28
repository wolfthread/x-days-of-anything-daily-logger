import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editCurrentChallenge } from '../../actions/profile';

const OpenChallenges = ({ openChallenges, editCurrentChallenge, history }) => {
  var currentOpenChallenges = [];
  const setCurrentChallenge = (id) => {
    editCurrentChallenge({ currentchallenge: id }, history, '/dailylog');
  };
  if (openChallenges) {
    currentOpenChallenges = openChallenges.map((chall) => (
      <button
        type="button"
        className="btn btn-outline-primary chall-grid"
        onClick={() => {
          setCurrentChallenge(chall._id);
        }}
        key={chall.category}
      >
        <Fragment>
          <h4>{chall.category}</h4>
          <p>
            Day {chall.currentday} of #{chall.numberofdaystotal}DaysOf
            {chall.category.replace(/\s/g, '')}
          </p>
        </Fragment>
      </button>
    ));
  }
  return <div>{currentOpenChallenges}</div>;
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  editCurrentChallenge,
})(withRouter(OpenChallenges));
