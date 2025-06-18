import shortId from 'shortid';  //##
import produce from 'immer';
import { faker } from '@faker-js/faker';
faker.seed(123);

export const initialState = {
   mainPosts: [{
        id: 1
      , User: { id: 1, nickname: 'sally03915' }
      , content: '첫번째 게시글   #node  #react' 
      , Images: [
         { id:shortId.generate() , src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
         { id:shortId.generate() , src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
         { id:shortId.generate() , src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      ] 
      , Comments: [{
            id:shortId.generate() , 
            User:{ id:shortId.generate() ,   nickname:'one'} , content:'hello'
          }, {
            User:{ id:shortId.generate() ,   nickname:'two'} , content:'hi'
          }]
   }], 
   /////////////////////////// 추가 START
   //postAdd: false,
   imagePaths: [],
   hasMorePosts: true,

   loadPostsLoading: false,
   loadPostsDone: false,
   loadPostsError: null,

   addPostLoading: false,
   addPostDone: false,
   addPostError: null,

   removePostLoading: false,
   removePostDone: false,
   removePostError: null,

   addCommentLoading: false,
   addCommentDone: false,
   addCommentError: null,
   /////////////////////////// 추가 END   
}

////////////////////////////////////////////////////// action
export const addPost = {  type:'ADD_POST', }

//////////  dummyPost
const dummyPost = (data)=>({
   //id: 2,
   id:shortId.generate() , 
   content: data, 
   User: { id:1, nickname:'sally03915'  },
   Images: [],
   Comments : []
});

const dummyComment = (data)=>({
   //id: 2,
   id:shortId.generate() , 
   content: data, 
   User: { id:1, nickname:'sally03915'  }, 
});

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';


export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

////////////////////////////////////////////////////// next 

   
const reducer = (state = initialState, action) => produce(state, (draft) => { 
   switch (action.type) {
      ///////////////////////////  ADD_POST end
      case ADD_POST_REQUEST:
         draft.addPostLoading = true;
         draft.addPostDone = false;
         draft.addPostError = null;
         break;
      case ADD_POST_SUCCESS:
         draft.addPostLoading = false;
         draft.addPostDone = true;
         draft.mainPosts.unshift(dummyPost(action.data));
         break;
      case ADD_POST_FAILURE:
         draft.addPostLoading = false;
         draft.addPostError = action.error;
         break;
    ///////////////////////////  REMOVE_POST
      case REMOVE_POST_REQUEST:
         draft.removePostLoading = true;
         draft.removePostDone = false;
         draft.removePostError = null;
         break;
 
      case REMOVE_POST_SUCCESS:
         draft.removePostLoading = false;
         draft.removePostDone = true;
         draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
         break;
      case REMOVE_POST_FAILURE:
         draft.removePostLoading = false;
         draft.removePostError = action.error;
         break;
      
       /////////////  ADD_COMMENT start
      case ADD_COMMENT_REQUEST:
         draft.addCommentLoading = true;
         draft.addCommentDone = false;
         draft.addCommentError = null;
         break;
      case ADD_COMMENT_SUCCESS:
         const post = draft.mainPosts.find((v) => v.id === action.data.postId);//1. post해당글가져오기 
         post.Comments.unshift(dummyComment(action.data.content));//2. post.Comments 추가
         draft.addCommentLoading = false;
         draft.addCommentDone = true;
         break;
      case ADD_COMMENT_FAILURE:
         draft.addCommentLoading = false;
         draft.addCommentError = action.error;
         break;
       /////////////        
     default: 
         break;
      
  }
});

export default reducer;