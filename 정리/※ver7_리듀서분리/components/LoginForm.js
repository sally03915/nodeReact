import React , {useState , useCallback} from 'react'
import { Input, Button, Form, Row, Col } from 'antd'; 
import Link from 'next/Link';
import userInput from '../hooks/userInput';

import { useDispatch } from 'react-redux';  //#2. redux - useDispatch
import { loginAction } from '../reducers/user';  //######1. redux

//const LoginForm = ({setIsLogin}) => {
const LoginForm = () => { //#3  redux
///////////////////////////////////////////// code
  const [id, onChangeId] = userInput('');  
  const [password, onChangePassword] = userInput('');  

  const dispatch = useDispatch();  //#4.   redux

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    //setIsLoggedIn(true);
    dispatch(loginAction({ id, password }));
 }, [id, password]);

  ///////////////////////////////////////////// view
  return (
    <>
      <Form layout="vertical"  style={{ padding:'3%'}}  onFinish={onSubmitForm}  >
        <Form.Item  label="아이디"     name="id"  >
          <Input placeholder="user@gmail.com 형식으로 입력"
                value={id} onChange={onChangeId}    required  />
        </Form.Item>     
        <Form.Item  label="비밀번호"    name="password" >
          <Input.Password placeholder="비밀번호 입력"
                 value={password}   onChange={onChangePassword}    required />
        </Form.Item>
        <Form.Item  style={{textAlign:'center'}}>
          {/*<Button type="primary" style={{ marginRight: '2%' }} onClick={onCount} >로그인 {count}</Button> */}
          
          <Button type="primary"
            style={{ marginRight: '2%' }}
            htmlType='submit'
            loading={false}
            >로그인</Button> 

          <Link href="/signup"   legacyBehavior ><Button>회원가입</Button></Link>
        </Form.Item>
      </Form>
    </>  
  );
};
export default LoginForm;