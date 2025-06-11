// [reducers] - index.js
import { HYDRATE } from 'next-redux-wrapper'; // Redux 상태를 서버에서 생성, 클라이언트에 전달

// step1) 초기값
const initialState = {
  user: {
    isLogin: false,
    user: null,
    signupDate: {},
    loginData : {}
  },
  post: {}
};

// step2) 로그인할때마다 설정 함수
export const loginAction = (data) => { 
  return {  type:'LOG_IN' , data,   }
};
export const logoutAction = { 
  type: 'LOG_OUT',
};

// step3) 이전상태+액션 = 다음상태  
const rootReducer = ( state=initialState , action ) => { 
  switch (action.type) { 
    case HYDRATE:
      console.log('HYDRATE', action);
      return { ...state, ...action.payload };
    case 'LOG_IN':   // 액션
      return {
        ...state,    //이전상태
        user: {
          isLogin: true,
          user: action.data, 
        },  // 다음상태
      }
    case 'LOG_OUT':
      return {
        ...state, 
        user: {
          isLogin: false,
          user: null, 
        },
      }
    default:
      return { ...state }
  }
};
export default rootReducer;