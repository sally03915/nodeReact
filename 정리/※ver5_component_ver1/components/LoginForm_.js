import React , {useState , useCallback} from 'react'
import { Input, Button, Form, Row, Col } from 'antd'; 
import Link from 'next/Link';
import userInput from '../hooks/userInput';

import { loginAction } from '../reducers';


const LoginForm = ({setIsLogin}) => { 
  ///////////////////////////////////////////// code
  const [id, onChangeId] = userInput('');  
  const [password, onChangePassword] = userInput('');  

  const onSubmitForm = useCallback(() => {  // 컴포넌트가 처음 렌더링될때 한번만 생성
    console.log("............" , id, password);
    setIsLogin(true);
  } , [id, password]); // id, password 값이 변경될때  

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