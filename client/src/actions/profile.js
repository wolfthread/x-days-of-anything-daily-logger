import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 3000)
    );
    history.push('/dashboard');
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// edit current challenge
export const editCurrentChallenge = (formData, history, url = null) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    if (url !== null) {
      await history.push(url);
    }
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add Challenge
export const addChallenge = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/challenges', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Challenge Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a challenge
export const deleteChallenge = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/challenges/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Challenge Removed', 'success', 3000));
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone')) {
    try {
      await axios.delete('/api/profile');

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(setAlert('Your account has been permanently deleted', 3000));
    } catch (err) {
      const errorMsg = err.response.data.error;
      if (errorMsg) {
        dispatch(setAlert(errorMsg, 'danger', 3000));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Delete Open Challenge
export const deleteOpenChallenge = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/open-challenges/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Challenge Removed', 'success', 3000));
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add an Open Challenge
export const addOpenChallenge = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      '/api/profile/open-challenges',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Challenge Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errorMsg = err.response.data.error;
    if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger', 3000));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
