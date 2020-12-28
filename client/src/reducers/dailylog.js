import {
  GET_DAILYLOGS,
  DAILYLOG_ERROR,
  DELETE_DAILYLOG,
  ADD_DAILYLOG,
  UPDATE_DAILYLOG,
  // GET_DAILYLOG,
  // ADD_ACCOMPLISHMENT,
  // DELETE_ACCOMPLISHMENT,
  // ADD_LINK,
  // DELETE_LINK,
} from '../actions/types';

const initialState = {
  dailylogs: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DAILYLOGS:
      return {
        ...state,
        dailylogs: payload,
      };
    // case ADD_ACCOMPLISHMENT:
    // case ADD_LINK:
    case ADD_DAILYLOG:
      return {
        ...state,
        dailylogs: [payload, ...state.dailylogs],
      };
    // case DELETE_ACCOMPLISHMENT:
    // case DELETE_LINK:
    case UPDATE_DAILYLOG:
      return {
        ...state,
        dailylogs: state.dailylogs.map((dailylog) =>
          dailylog._id === payload.id ? [...dailylog, payload] : dailylog
        ),
      };
    case DELETE_DAILYLOG:
      return {
        ...state,
        dailylogs: state.dailylogs.filter(
          (dailylog) => dailylog._id !== payload
        ),
        loading: false,
      };
    case DAILYLOG_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
