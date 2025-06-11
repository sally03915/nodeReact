import { all,  fork } from 'redux-saga/effects'  //#1

import postSaga from './post';
import userSaga from './user';

///// step1) all()
export default function* rootSaga() { 
  yield all([//  all - 동시에 배열로 받은 fork들을 동시에 실행
    fork(postSaga) , // fork - generator 함수들을 실행해줌.
    fork(userSaga) , 
  ]);
}

