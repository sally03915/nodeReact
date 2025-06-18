import React from 'react';
import { Form, Input } from 'antd';

const NickNameForm = () => {
  return (
    <Form  style={{ margin:'3%' , padding:'20px'  }}>
     <Input.Search  addonBefore="닉네임"  enterButton="수정"/>
    </Form>
  );
 };

export default NickNameForm;