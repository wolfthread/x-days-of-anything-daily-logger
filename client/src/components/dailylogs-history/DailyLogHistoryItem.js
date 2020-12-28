import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  updateDailyLog,
  deleteDailyLog,
  getCurrentDailyLogs,
} from '../../actions/dailylog';
import { withRouter } from 'react-router-dom';

const DayLogHistoryItem = ({
  dailylog,
  updateDailyLog,
  deleteDailyLog,
  getCurrentDailyLogs,
  history,
}) => {
  const {
    date,
    day,
    category,
    timer,
    thoughts,
    accomplishments,
    links,
  } = dailylog;

  const [displayInputs, toggleInputs] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    day: '',
    category: '',
    timer: '',
    thoughts: '',
    accomplishments: '',
    links: '',
  });

  useEffect(() => {
    getCurrentDailyLogs();
    if (dailylog) {
      setFormData({
        date: !date ? '' : date,
        day: !day ? '' : day,
        category: !category ? '' : category,
        timer: !timer ? '' : timer,
        thoughts: !thoughts ? '' : thoughts,
        accomplishments: !accomplishments ? '' : accomplishments,
        links: !links ? '' : links,
      });
    }
    // eslint-disable-next-line
  }, []);

  const onDelete = (e, id) => {
    e.preventDefault();
    deleteDailyLog(id);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeAccs = (e, id) => {
    const modAccs = accomplishments.map((acc) => {
      if (acc._id.toString() === id) {
        acc.accomplishment = e.target.value;
      }
      return acc;
    });
    setFormData({ ...formData, accomplishments: modAccs });
  };

  const onChangeLinks = (e, id) => {
    const modLnks = links.map((lnk) => {
      if (lnk._id.toString() === id) {
        lnk.link = e.target.value;
      }
      return lnk;
    });
    setFormData({ ...formData, links: modLnks });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateDailyLog(formData, dailylog._id, history);
    getCurrentDailyLogs();
    toggleInputs(false);
  };

  return (
    <Fragment>
      <div className="col-lg-6 col-sm-12 mt-4">
        <div className="card text-white mb-3">
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <div className="card-header">
                {!displayInputs ? (
                  <p className="text-dailylog">
                    {date ? date.slice(0, 10) : ''}{' '}
                    <i
                      type="button"
                      className="fas fa-edit"
                      onClick={() => {
                        toggleInputs(!displayInputs);
                      }}
                    />
                  </p>
                ) : (
                  <Fragment>
                    <input
                      type="date"
                      name="date"
                      defaultValue={date}
                      onChange={(e) => onChange(e)}
                    />
                  </Fragment>
                )}
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <div className="edit">
                    <h4>Day</h4>
                    <input
                      className="btn btn-outline-success btn-sm edit"
                      name="day"
                      type="number"
                      min="0"
                      max="1000"
                      placeholder={day}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="edit">
                    <h4>Category</h4>
                    <input
                      className="btn btn-outline-success btn-sm edit"
                      name="category"
                      type="text"
                      placeholder={category}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="edit">
                    <h4>Timer</h4>
                    <input
                      className="btn btn-outline-success btn-sm edit"
                      name="timer"
                      type="text"
                      placeholder={timer}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="edit">
                  <h4 className="text-dailylog">Thoughts</h4>
                  <textarea
                    rows="4"
                    name="thoughts"
                    defaultValue={thoughts}
                    onChange={(e) => onChange(e)}
                    className="dailylog-field btn btn-outline-success"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="edit">
                  <h4 className="text-dailylog">Accomplishments</h4>
                  {accomplishments.map((acc) => (
                    <input
                      type="text"
                      name="accomplishment"
                      key={acc._id}
                      placeholder={acc.accomplishment}
                      className="dailylog-field btn btn-outline-success"
                      onChange={(e) => onChangeAccs(e, acc._id)}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <div className="edit">
                  <h4 className="text-dailylog">Links</h4>
                  {links.map((lnk) => (
                    <input
                      type="text"
                      name="accomplishment"
                      key={lnk._id}
                      placeholder={lnk.link}
                      className="dailylog-field btn btn-outline-success"
                      onChange={(e) => onChangeLinks(e, lnk._id)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <input
                type="submit"
                className="btn btn-primary mt-4 btn-dailylog"
              />
              <button
                className="btn btn-danger btn-sm btn-dailylog mt-4"
                onClick={(e) => onDelete(e, dailylog._id)}
              >
                <i className="fas fa-trash "></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  updateDailyLog,
  deleteDailyLog,
  getCurrentDailyLogs,
})(withRouter(DayLogHistoryItem));
