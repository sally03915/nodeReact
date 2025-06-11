import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd'
import PropTypes from 'prop-types';
import userInput from '../hooks/userInput'
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {   // 어떤게시글에대한 댓글
  ///////////////////////////////////// code
  const { isLogIn } = useSelector(state => state.user); 
  const [comment, onChangeComment] = userInput('');
  const onSubmitForm = useCallback(() => { 
    console.log( post.id,  comment );
  } , [comment]);
  ///////////////////////////////////// view
  return (
    <Form  onFinish={onSubmitForm}  style={{margin:50 , position:'relative'}}  >
      <Input.TextArea rows={5}   value={comment}  onChange={onChangeComment}   />
      <Button htmlType="submit"  style={{position:'absolute' , right:0 , bottom:-50}}   type="primary">댓글</Button>
    </Form>
  );
};
CommentForm.propTypes = {  post : PropTypes.object.isRequired  };
export default CommentForm;