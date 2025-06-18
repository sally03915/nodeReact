export const initialState = {
   mainPosts: [{
        id: 1
      , User: { id: 1, nickname: 'sally03915' }
      , content: '첫번째 게시글   #node  #react' 
      , Images: [
                 { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
                 { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
                 { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      ] 
      , Comments: [{
            User:{nickname:'one'} , content:'hello'
          }, {
            User:{nickname:'two'} , content:'hi'
          }]
   }],
   postAdd: false, 
   imagePaths : [] ,
}

export const addPost = {  type:'ADD_POST', }

//////////  dummyPost
const dummyPost = {
   id: 2,
   content: 'dummy', 
   User: { id:1, nickname:'sally03915'  },
   Images: [],
   Comments : []
};
//////////
export default (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_POST':
         return {
            ...state, 
            mainPosts: [dummyPost, ...state.mainPosts],    // 맨앞으로
            //mainPosts: [...state.mainPosts , dummyPost ],   // 맨뒤로
            postAdd : true    // 글쓰기추가
         }
     default: {
        return {
           ...state,
        }
     }
  }
};