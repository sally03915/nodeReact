import React ,{useCallback} from 'react'
import { Card, Avatar, Button } from 'antd';
   
const UserProfile = ({setIsLogin}) => { 
  ////////////////////////// code
  // 로그아웃버튼을 누르면 로그아웃되게 만들기
  const onLogOut = useCallback(() => { 
    setIsLogin(false);
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
    <Button style={{marginTop:"5%"}}  onClick={onLogOut}>로그아웃</Button>
  </Card>);
};

export default UserProfile;