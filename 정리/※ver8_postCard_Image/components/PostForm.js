import React, { useCallback, useState, useRef } from 'react';
import { Form, Input, Button } from 'antd';

//1. useDispatch , useSelector
//2. addPost
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => { 
  //3. useSelect 이용해서 post ( 이미지 )
  const { imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
      imageInput.current.click();
  }, [imageInput.current]);

  //4. dispatch - submit  ( 글 )
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => { 
      setText(e.target.value);
  }, []);

    const onSubmitForm = useCallback(() => {
        dispatch(addPost);
        setText('');
    }, []);
   




  return (<Form layout="vertical" style={{ margin: '3%' }}
    encType="multipart/form-data" onFinish={onSubmitForm} >
    <Form.Item  label="TheJoa Write" >  
      <Input.TextArea placeholder='게시글을 적어주세요'
        maxLength={200} value={text}   onChange={onChangeText}  />
    </Form.Item>
    <Form.Item>
      <input type="file" name="image" multiple hidden ref={imageInput}
        style={{display:'none'}}
      />
      <Button onClick={onClickImageUpload} >이미지업로드</Button>
      <Button type="primary"   style={{float:'right'}}  htmlType='submit'>POST</Button>
    </Form.Item> 
    <div>
      {imagePaths.map((v, i) => (
        <div  key={v} >
          <img src={v} style={{ width: '200px' }} />
          <div><Button>제거</Button></div>
        </div>
      ) ) }
    </div>
  </Form>);
};

export default PostForm;