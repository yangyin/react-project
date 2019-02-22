import { combineReducers } from 'redux-immutable';
import  combineA  from './combineA';
import  combineB  from './combineB';
import  combineC  from './combineC';
import  common  from './common';

export default combineReducers({ 
    ...combineA,
    ...combineB,
    ...combineC,
    ...common
});