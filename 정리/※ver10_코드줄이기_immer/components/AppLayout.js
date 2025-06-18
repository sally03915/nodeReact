import React, { useState , useMemo}  from 'react';   // react 불러오기   #
import PropTypes from 'prop-types'; // props 타입검사하는 역할
import Link from 'next/Link';
import { Menu, Input, Row, Col  } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';

import { useSelector } from 'react-redux';  //## reducer1

const InputSearch = styled(Input.Search)`
  vertical-align:middle;
`;

const AppLayout = ({ children }) => { 

  // useMemo
  const stylebg = useMemo(() => ({ backgroundColor: '#efefef' }), []);

  const { user } = useSelector(state => state.user); 

  ///////////////////////////////////////////// code
  const items = [
     { label: <Link href="/">LOGO</Link>, key: '/' } 
    ,{ label: <Link href="/profile">프로필</Link>, key: '/profile' } 
    ,{ label: <Link href="/signup">회원가입</Link>, key: '/signup' } 
    ,{ label: <InputSearch 
                placeholder="input search text" 
                enterButton
              />, key: '/search'
    }
  ];
  ///////////////////////////////////////////// view
  return ( 
    <div> 
      <Menu  mode="horizontal"   items={items} />
      <Row gutter={8}>
        <Col xs={24} md={6} >
          {/*<h3 onClick={() => { console.log('....'); }} >{logo}</h3> */}
          {/* <h3 onClick={changeLogo} >{logo}</h3>*/}
          {user ? <UserProfile /> : <LoginForm />}
          
        </Col>
        <Col xs={24}  md={12}  style={stylebg} > {children}  </Col>   
        <Col xs={24}  md={6} > <div>
          <a href="https://thejoa.com"
             target="_blank"
             rel="noreferrer  noopener">TheJoa</a> copyrights. all reserved. </div> </Col>
      </Row>
      </div>        
  );
}; 

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;