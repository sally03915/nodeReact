export const initialState = {
  isLogIn: false,
  user: null,
  signUpData: {},
  loginData: {}
};

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
          ...state,  
           isLogIn: true,
           user: action.data,
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