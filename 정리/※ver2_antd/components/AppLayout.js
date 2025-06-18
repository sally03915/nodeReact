import React from 'react';   // react 불러오기
import PropTypes from 'prop-types'; // props 타입검사하는 역할
import Link from 'next/Link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => { 
  ///////////////////////////////////////////// code
  const items = [
     { label: <Link href="/">LOGO</Link>, key: '/' } 
    ,{ label: <Link href="/profile">프로필</Link>, key: '/profile' } 
    ,{ label: <Link href="/signup">회원가입</Link>, key: '/signup' } 
  ];

  ///////////////////////////////////////////// view
  return ( 
    <div> 
      <Menu  mode="horizontal"   items={items} />
      {children}    
    </div>        
  );
}; 
AppLayout.propTypes = {
  children : PropTypes.node.isRequired
};
export default AppLayout;