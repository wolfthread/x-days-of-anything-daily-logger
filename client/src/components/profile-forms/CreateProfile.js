import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    bio: '',
    website: '',
    githubusername: '',
    twitterusername: '',
    challenges: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // destructuring
  const { company, bio, website, githubusername, twitterusername } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to create
        your profile
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <div>
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
            <div className="form-group">
              <i className="fab fa-github fa-2x mr-2 mt-4"></i>
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
        <div className="mt-4">
          <input type="submit" className="btn btn-primary" />
          <Link className="btn btn-light" to="/dashboard">
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
