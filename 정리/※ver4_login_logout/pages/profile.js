import React from 'react';
import AppLayout from '../components/AppLayout'
import  Head       from  'next/head';

const Profile = () => { 
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title> Profile | TheJoa </title>
      </Head>
      <AppLayout>내프로필</AppLayout>
    </>
  );
}
export default Profile;
