import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  deleteChallenge,
  deleteOpenChallenge,
} from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  deleteChallenge,
  deleteOpenChallenge,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    bio: "",
    website: "",
    githubusername: "",
    twitterusername: "",
    challenges: "",
    openchallenges: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    if (profile) {
      setFormData({
        company: loading || !profile.company ? "" : profile.company,
        bio: loading || !profile.bio ? "" : profile.bio,
        website: loading || !profile.website ? "" : profile.website,
        githubusername:
          loading || !profile.githubusername ? "" : profile.githubusername,
        twitterusername:
          loading || !profile.twitterusername ? "" : profile.twitterusername,
        challenges: loading || !profile.challenges ? "" : profile.challenges,
        openchallenges:
          loading || !profile.openchallenges ? "" : profile.openchallenges,
      });
    }
    // eslint-disable-next-line
  }, []);

  // destructuring
  const {
    company,
    bio,
    website,
    githubusername,
    twitterusername,
    challenges,
    openchallenges,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  var currentChallenges = [];
  if (challenges) {
    currentChallenges = challenges.map((chall) => (
      <tr key={chall._id} className="table-secondary">
        <td>{chall.title}</td>
        <td>{chall.thingmostproudof}</td>
        <td>
          {chall.from.slice(0, 10)} /
          {chall.to === null ? " Now" : <span> {chall.to.slice(0, 10)}</span>}
        </td>
        <td>
          <button
            onClick={() => deleteChallenge(chall._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }
  var currentOpenChallenges = [];
  if (openchallenges) {
    currentOpenChallenges = openchallenges.map((chall) => (
      <tr key={chall._id} className="table-success">
        <td>{chall.category}</td>
        <td>{chall.numberofdaystotal}</td>
        <td>{chall.currentday}</td>
        <td>{chall.from.slice(0, 10)}</td>
        <td>
          <button
            onClick={() => deleteOpenChallenge(chall._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return loading && profile !== null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <div className="mt-4">
            <h1 className="large text-primary">Edit Your Profile</h1>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  size="25"
                  onChange={(e) => onChange(e)}
                />
                <small className="form-text">Company</small>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  cols="24"
                  onChange={(e) => onChange(e)}
                ></textarea>
                <small className="form-text">
                  Tell us a little about yourself
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={website}
                  size="25"
                  onChange={(e) => onChange(e)}
                />
                <small className="form-text">
                  Could be your own or a company website
                </small>
              </div>
              <div className="">
                <button
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  type="button"
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
              </div>

              {displaySocialInputs && (
                <Fragment>
                  <div className="form-group social-input">
                    <i className="fab fa-github fa-2x mr-2"></i>
                    <input
                      type="text"
                      placeholder="Github Username"
                      name="githubusername"
                      value={githubusername}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x mr-2"></i>
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      name="twitterusername"
                      value={twitterusername}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </Fragment>
              )}
              <Fragment>
                <h2 className="mt-4">Current Challenges</h2>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">CHALLENGE CATEGORY</th>
                      <th className="hide-sm" scope="col">
                        NUMBER OF DAYS TOTAL
                      </th>
                      <th className="hide-sm" scope="col">
                        CURRENT DAY
                      </th>
                      <th className="hide-sm" scope="col">
                        STARTED ON
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{currentOpenChallenges}</tbody>
                </table>
                <h2 className="mt-4">Completed Challenges</h2>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">CHALLENGE NAME</th>
                      <th className="hide-sm" scope="col">
                        THING MOST PROUD OF
                      </th>
                      <th className="hide-sm" scope="col">
                        START / FINISH
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{currentChallenges}</tbody>
                </table>
              </Fragment>

              <input type="submit" className="btn btn-primary" />
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
            </form>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="large text-primary mt-2 mb-4">Edit Profile</h1>
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
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteChallenge,
  deleteOpenChallenge,
})(withRouter(EditProfile));
