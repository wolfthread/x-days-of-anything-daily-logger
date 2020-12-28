import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_DAILYLOGS,
  DAILYLOG_ERROR,
  DELETE_DAILYLOG,
  ADD_DAILYLOG,
  UPDATE_DAILYLOG,
} from './types';

// Create a daily log
export const createDailyLog = (formData, url, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/dailylog', formData, config);

    dispatch({
      type: ADD_DAILYLOG,
      payload: res.data,
    });

    history.push(url);
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }

    dispatch({
      type: DAILYLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update a daily log
export const updateDailyLog = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/dailylog/${id}`, formData, config);

    dispatch({
      type: UPDATE_DAILYLOG,
      payload: res.data,
    });

    dispatch(setAlert('Daily Log Updated', 'success', 3000));
    dispatch(getCurrentDailyLogs());
    history.push('/dailylog/history');
  } catch (err) {
    const errorMsg = err.response.data.error;

    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }

    dispatch({
      type: DAILYLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get current user's dailylogs
export const getCurrentDailyLogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/dailylog');

    dispatch({
      type: GET_DAILYLOGS,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response.data.error;

    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }

    dispatch({
      type: DAILYLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a daily log
export const deleteDailyLog = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/dailylog/${id}`);

    dispatch({
      type: DELETE_DAILYLOG,
      payload: id,
    });

    dispatch(setAlert('Daily Log Removed', 'success'));
  } catch (err) {
    const errorMsg = err.response.data.error;

    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }

    dispatch({
      type: DAILYLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
