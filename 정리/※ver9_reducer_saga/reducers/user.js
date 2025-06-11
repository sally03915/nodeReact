// 1) 초기값
export const initialState = {
   logInLoding: false,   // 로그인 시도중    - 로딩창
   logInDone: false, 
   logInError: null,   
    
   logOutLoding: false,   // 로그아웃 시도중    - 로딩창
   logOutDone: false, 
   logOutError: null,   
  
   signUpLoading: false, // 회원가입 시도중
   signUpDone: false,
   signUpError: null,

   changeNicknameLoading: false, // 닉네임 변경 시도중
   changeNicknameDone: false,
   changeNicknameError: null,

   followDone: false,
   followError: null,

   unfollowLoading: false, // 언팔로우 시도중
   unfollowDone: false,
   unfollowError: null,


  user: null,
  signUpData: {},
  loginData: {}
};
///////////////////////////////////////////
// 2) action

export const loginAction = (data) => {
  return {
     type: 'LOG_IN_REQUEST',
     data,
  }
};
export const logoutAction = {
  type: 'LOG_OUT_REQUEST',
};

/////
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';    
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
  
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';    
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';   
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
 
//--
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';    
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';    
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';    
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';
 
//--
const dummyUser = (data) => ({
   ...data,
   nickname: 'sally',
   id: 1,
   Posts: [{ id: 1 }], 
   Followings : [{nickname:'apple'} , {nickname:'banana'} , {nickname:'coconut'} , ],
   Followers  : [{nickname:'one'} , {nickname:'two'} , {nickname:'three'} ,]
});


/////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch (action.type) {
     case LOG_IN_REQUEST:
        return {
          ...state,    //  이전
          logInLoding: true,   // 로그인 시도중    - 로딩창
          logInDone: false, 
          logInError: null,   
        }
     case LOG_IN_SUCCESS:
         return {
            ...state,    //  이전
            logInLoding: false,   // 로그인 시도중    - 로딩창
            logInDone: true,  
            user :dummyUser(action.data)
        }
     case LOG_IN_FAILURE:
         return {
            ...state,    //  이전
            logInLoding: false,   // 로그인 시도중    - 로딩창 
            logInError: action.error,   
         }     
      case LOG_OUT_REQUEST:
         return {
            ...state,    //  이전
            logOutLoding: true,   // 로그인 시도중    - 로딩창
            logOutDone: false, 
            logOutError: null,   
         }
      case LOG_OUT_SUCCESS:
         return {
            ...state,    //  이전
            logOutLoding: false,   // 로그인 시도중    - 로딩창
            logOutDone: true,   
            user : null
         }
      case LOG_OUT_FAILURE:
         return {
            ...state,    //  이전
            logOutLoding: false,  
            logOutError : action.error
        }     
     //////////////////////////////
     case SIGN_UP_REQUEST:
      return {
         ...state,
         signUpLoading: true,
         signUpError: null,
         signUpDone: false,
      } 

   case SIGN_UP_SUCCESS:
      return {
         ...state,
         signUpLoading: false,
         signUpDone: true,
      } 
   case SIGN_UP_FAILURE:
      return {
         ...state,
         signUpLoading: false,
         signUpError: action.error,
      } 
     //////////////////////////////
     case CHANGE_NICKNAME_REQUEST:
      return {
         ...state, // 이전
         changeNicknameLoading: true,
         changeNicknameDone: false,
         changeNicknameError: null,  // 상태 => 다음
      } 

   case CHANGE_NICKNAME_SUCCESS:
      return {
         ...state,
         user: { ...state.user, nickname: action.data.nickname }  ,
         changeNicknameLoading: false,
         changeNicknameDone: true,
      } 
   case CHANGE_NICKNAME_FAILURE:
      return {
         ...state,
         changeNicknameLoading: false,
         changeNicknameError: action.error,
      } 
     //////////////////////////////
     default: {
        return {
           ...state,
        }
     }
  }
};