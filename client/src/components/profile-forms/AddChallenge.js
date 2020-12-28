import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addChallenge, addOpenChallenge } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const AddChallenge = ({
  addChallenge,
  addOpenChallenge,
  history,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({
    title: '',
    thingmostproudof: '',
    from: '',
    to: '',
    current: false,
    category: '',
    numberofdaystotal: '',
    currentday: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    title,
    thingmostproudof,
    from,
    to,
    current,
    numberofdaystotal,
    currentday,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return loading && profile !== null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <section className="container mt-4">
            <h1 className="large text-primary">Add A Challenge</h1>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!formData.current) {
                  const keep = {
                    title: formData.title,
                    thingmostproudof: formData.thingmostproudof,
                    from: formData.from,
                    to: formData.to,
                    current: formData.current,
                  };
                  addChallenge(keep, history);
                } else {
                  const keep = {
                    category: formData.title,
                    numberofdaystotal: formData.numberofdaystotal,
                    currentday: formData.currentday,
                    from: formData.from,
                  };
                  addOpenChallenge(keep, history);
                }
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Challenge Category"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  size="25"
                />
                <small className="form-text">
                  Enter the challenge category. E.g: Code, Health, Meditation,
                  etc. See{' '}
                  <a
                    href="https://www.100daysofx.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>{' '}
                  for a more complete list.
                </small>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="# of Days"
                  name="numberofdaystotal"
                  min="0"
                  value={numberofdaystotal}
                  onChange={(e) => onChange(e)}
                  size="25"
                />
                <small className="form-text">
                  Challenge target number of days.
                </small>
              </div>
              <div className="form-group">
                <h4>Start Date</h4>
                <input
                  type="date"
                  name="from"
                  value={from}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <p>
                  <input
                    type="checkbox"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        current: !current,
                      });
                      toggleDisabled(!toDateDisabled);
                    }}
                  />{' '}
                  Active Challenge
                </p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Current day"
                  name="currentday"
                  min="0"
                  value={currentday}
                  onChange={(e) => onChange(e)}
                  size="25"
                />
                <small className="form-text">
                  Enter the day you are currently at if challenge started.
                </small>
              </div>
              <div className="form-group">
                <h4>End Date</h4>
                <input
                  type="date"
                  name="to"
                  disabled={toDateDisabled ? 'disabled' : ''}
                  value={to}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Thing you are most proud of"
                  name="thingmostproudof"
                  value={thingmostproudof}
                  onChange={(e) => onChange(e)}
                  size="25"
                />
                <small className="form-text">
                  If the challenge is already completed.
                </small>
              </div>

              <input type="submit" className="btn btn-primary" />
              <Link className="btn btn-light" to="/dashboard">
                Go Back
              </Link>
            </form>
          </section>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="large text-primary mt-2 mb-4">Add Challenge</h1>
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

export default connect(mapStateToProps, { addChallenge, addOpenChallenge })(
  AddChallenge
);
