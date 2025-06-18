import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';   // 공통css
import Head from 'next/head';
import { Provider } from 'react-redux';   //##
import wrapper from '../store/configureStore';  //## 

const TheJoa = ({ Component, ...rest }) => { 
  //////////////////////////////////////////////// code
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  //////////////////////////////////////////////// view
  return (
  <Provider  store={store}>
    <Head>
      <meta charSet="utf-8"/>
      <title>TheJoa</title>
    </Head>
    <Component/>
  </Provider>
  );
};

TheJoa.propTypes = {
  Component : PropTypes.elementType.isRequired ,
  pageProps : PropTypes.any.isRequired
}

export default TheJoa;