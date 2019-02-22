import { combineReducers } from 'redux';
import  combineA  from './combineA';
import  combineB  from './combineB';
import  combineC  from './combineC';
import  combineD  from './combineD';
import  common  from './common';

export default combineReducers({ 
    ...combineA,...combineB,...combineC,...combineD,...common
});
