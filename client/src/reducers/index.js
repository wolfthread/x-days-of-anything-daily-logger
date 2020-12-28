import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import dailylog from './dailylog';

export default combineReducers({
  alert,
  auth,
  profile,
  dailylog,
});
