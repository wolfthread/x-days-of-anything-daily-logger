import React from 'react';

import AddButton from '../add-button/add-button';
import AddLinkButton from '../add-link-button/add-link-button';
import DayInput from '../day-input/day-input';
import ThoughtsInput from '../thoughts-input/thoughts-input';

const DailyLogger = ({
  changeDay,
  addAccomplishment,
  changeThoughts,
  placeholderDay,
  getDay,
  placeholderChallenge,
  getFormattedAccomplishments,
  accomplishmentsLength,
  addLink,
  getAccomplishments,
  getLinks,
}) => {
  return (
    <div className="fixed p-2 bd-highlight">
      <div className="card text-white bg-success mb-3">
        <div className="card-header">Daily Logger</div>
        <div className="card-body">
          <h4 className="card-title">Enter Your Info For Today</h4>
          <div className="form-group">
            <DayInput changeDay={changeDay} />
            <div>
              <label className="col-form-label">Accomplishments:</label>
            </div>
            <div>
              <AddButton addAccomplishment={addAccomplishment} />
              {getAccomplishments()}
            </div>
            <ThoughtsInput
              changeThoughts={changeThoughts}
              ///
              placeholderDay={placeholderDay}
              getDay={getDay}
              placeholderChallenge={placeholderChallenge}
              getFormattedAccomplishments={getFormattedAccomplishments}
              accomplishmentsLength={accomplishmentsLength}
            />
            <div>
              <label className="col-form-label" id="linkInput">
                Links to Work:
              </label>
            </div>
            <div>
              <AddLinkButton addLink={addLink} />
              {getLinks()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLogger;
