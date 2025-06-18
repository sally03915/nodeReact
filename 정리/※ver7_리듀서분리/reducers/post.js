export const initialState = {
  mainPosts: [],
}
export default (state = initialState, action) => {
  switch (action.type) {
     default: {
        return {
           ...state,
        }
     }
  }
};