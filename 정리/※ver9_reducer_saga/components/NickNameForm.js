import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import userInput from '../hooks/userInput';  //##
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';  //##

const NickNameForm = () => {
   const { user } = useSelector((state) => state.user);  //## 중앙저장소 -  reducer - user 정보
   const [nickname, onChangeNickname] = userInput('');
   const dispatch = useDispatch();

   const onSubmit = useCallback(() => {
      dispatch({
         type: CHANGE_NICKNAME_REQUEST,
         data: {nickname}  ,
      });
   }, [nickname]);
  
  return (
    <Form  style={{ margin:'3%' , padding:'20px'  }}>
     <Input.Search  value={nickname}
            onChange={onChangeNickname}
            addonBefore="닉네임"
            enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
 };

export default NickNameForm;