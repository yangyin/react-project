import { all } from 'redux-saga/effects'

import {  sagaA }  from './saga/sagaA';
import {  sagaB }  from './saga/sagaB';
import {  sagaC }  from './saga/sagaC';
import { common }  from './common/saga';
 

export default function* sagas() {
  yield all([
    ...sagaA,
    ...sagaB,
    ...sagaC,
    ...common
  ]);
}
