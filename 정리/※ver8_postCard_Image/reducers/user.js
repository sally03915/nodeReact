// 1) 초기값
export const initialState = {
  isLogIn: false,
  user: null,
  signUpData: {},
  loginData: {}
};
// 2) action
export const loginAction = (data) => {
  return {
     type: 'LOG_IN',
     data,
  }
};

export const logoutAction = {
  type: 'LOG_OUT',
};

export default (state = initialState, action) => {
  switch (action.type) {
     case 'LOG_IN':
        return {
          ...state,    //  이전
           isLogIn: true,
           user: action.data,    // { id, password }
        }
     case 'LOG_OUT':
        return {
           ...state,   
           isLogIn: false,
           user: null,
        }
     default: {
        return {
           ...state,
        }
     }
  }
};