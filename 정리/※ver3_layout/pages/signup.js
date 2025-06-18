import React from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head';

const Signup = () => { 
  return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <title> Signup | TheJoa </title>
      </Head>
      <AppLayout> 회원가입 </AppLayout>
    </>
  );
};

export default Signup;
