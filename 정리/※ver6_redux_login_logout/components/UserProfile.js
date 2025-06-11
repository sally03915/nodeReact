import React ,{useCallback} from 'react'
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';  

import { logoutAction } from '../reducers';  //## 1. redux
import { useDispatch  } from 'react-redux';  //## 2. redux

const ButtonWrapper = styled.div`
     margin-top:5%;
`;

//const UserProfile = ({setIsLogin}) => {
const UserProfile = () => {    //## 3. redux
  ////////////////////////// code
  const dispatch = useDispatch();   //##4 redux
  // 로그아웃버튼을 누르면 로그아웃되게 만들기
  const onLogOut = useCallback(() => { 
    dispatch(logoutAction);  //##5 reduxs
  } , []);
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
      <Button onClick={onLogOut}>로그아웃</Button>
    </ButtonWrapper>
  </Card>);
};

export default UserProfile;