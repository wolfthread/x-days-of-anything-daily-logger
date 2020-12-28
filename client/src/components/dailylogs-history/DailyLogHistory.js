import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentDailyLogs } from '../../actions/dailylog';
import DailyLogHistoryItem from './DailyLogHistoryItem';
import { getCurrentProfile } from '../../actions/profile';

const DailyLogHistory = ({
  getCurrentProfile,
  getCurrentDailyLogs,
  dailylog: { dailylogs },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentDailyLogs();
  }, []);

  return (
    <Fragment>
      <h1 className="large text-primary">Daily Logs History</h1>
      <div className="container">
        <div className="d-flex flex-wrap">
          {dailylogs &&
            dailylogs.map((log) => {
              return <DailyLogHistoryItem key={log._id} dailylog={log} />;
            })}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  dailylog: state.dailylog,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getCurrentDailyLogs,
})(withRouter(DailyLogHistory));
