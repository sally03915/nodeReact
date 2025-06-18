import React from 'react';   // react 불러오기
import PropTypes from 'prop-types'; // props 타입검사하는 역할

const AppLayout = ({children}) => { 
  return (<div>
    <div>공통메뉴</div>  {/*  공통메뉴  */}
    {children}          {/*  하위컴포넌트 동적삽입  */}
  </div>);
}; 
AppLayout.propTypes = {
  children : PropTypes.node.isRequired
};

export default AppLayout;