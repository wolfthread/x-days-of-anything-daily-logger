import React, { Fragment } from 'react';

const HistoryOfChallenges = ({ challenges }) => {
  var currentChallenges = [];
  if (challenges) {
    currentChallenges = challenges.map((chall) => (
      <tr key={chall._id} className="table-secondary">
        <td>{chall.title}</td>
        <td>{chall.thingmostproudof}</td>
        <td>
          {chall.from.slice(0, 10)} /
          {chall.to === null ? ' Now' : <span> {chall.to.slice(0, 10)}</span>}
        </td>
      </tr>
    ));
  }
  return (
    <Fragment>
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">Completed Challenges</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" className="card-subtitle mb-2 text-muted">
                  CHALLENGE NAME
                </th>
                <th scope="col" className="card-subtitle mb-2 text-muted">
                  THING MOST PROUD OF
                </th>
                <th scope="col" className="card-subtitle mb-2 text-muted">
                  FROM/TO
                </th>
                <th />
              </tr>
            </thead>
            <tbody>{currentChallenges}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default HistoryOfChallenges;
