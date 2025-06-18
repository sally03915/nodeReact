import React ,{useCallback} from 'react'
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';  

import { useDispatch  } from 'react-redux';  //## 2. redux
import { logoutAction } from '../reducers/user';   //##### 1. redux

const ButtonWrapper = styled.div`
     margin-top:5%;
`;

//const UserProfile = ({setIsLogin}) => {
const UserProfile = () => {    //## 3. redux
  ////////////////////////// code
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
      dispatch(logoutAction);
  }, []);
  ////////////////////////// view
  return (<Card
    actions={[
         <div  key="sns">게시글<br/>0</div> 
        ,<div  key="followings">팔로잉<br/>0</div> 
        ,<div  key="followers"> 팔로워<br/>0</div> 
      ]}
    > 
    <Card.Meta avatar={<Avatar>TheJoA</Avatar>}
      title='TheJoA' />
    <ButtonWrapper>
      <Button onClick={onLogout}>로그아웃</Button>
    </ButtonWrapper>
  </Card>);
};

export default UserProfile;