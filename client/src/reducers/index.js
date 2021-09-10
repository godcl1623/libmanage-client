import { combineReducers } from 'redux';
import tempStore from './reducer';

export default combineReducers({
  loginStatus:tempStore.loginStatusReducer,
  logoutClicked: tempStore.logoutClickedReducer,
  tokenState: tempStore.tokenStateReducer
});