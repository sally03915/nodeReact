import React , {useState, useCallback} from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import { Form, Input, Button , Checkbox} from 'antd';

const Signup = () => { 
  /////////////////////////////////// code
  const [id, setId] = useState('');
  const onChangeId = useCallback((e) => { setId(e.target.value); }, []);
  
  const [nickname, setNickname] = useState('');
  const onChangeNickname  = useCallback((e) => { setNickname(e.target.value); } ,[]);


  /////////////////////////////////// view
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title> Signup | TheJoa </title>
      </Head>
      <AppLayout>
        <Form  layout='vertical'  style={{ margin:'2%' }} >
          <Form.Item>
            <label htmlFor='id'>아이디</label>
            <Input placeholder='user@email.com' id='id'
                value={id} onChange={onChangeId}    name='id' required />
          </Form.Item>
          <Form.Item>
             <label htmlFor='nickname'>닉네임</label>
            <Input  placeholder='닉네임을 작성해주세요'  id='nickname' name='nickname' required />
          </Form.Item>
          <Form.Item>
             <label htmlFor='password'>비밀번호</label>
            <Input.Password  placeholder='비밀번호입력'  id='password' name='password'   required />
          </Form.Item>
          <Form.Item>
            <label htmlFor='password-re'>비밀번호 체크</label>
            <Input.Password  placeholder='비밀번호입력 체크' id='password-re'  name='password-re'  required />
          </Form.Item>
          <Form.Item>
            <label htmlFor='check'>약관에 동의하셔야합니다.</label>
            <Checkbox  name='' id='check' ></Checkbox>
          </Form.Item> 
          <Form.Item>
            <Button type='primary'  >회원가입</Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
