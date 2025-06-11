import React from 'react';
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import NickNameForm from '../components/NickNameForm';
import FollowList   from '../components/FollowList';

const Profile = () => { 
  const data = [{ nickname: 'Title 1', }, { nickname: 'Title 2', }, { nickname: 'Title 3', }, { nickname: 'Title 4', },]; 
  
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title> Profile | TheJoa </title>
      </Head>
      <AppLayout>
        <NickNameForm/>
        <FollowList  header="팔로잉"     data={data}   />
        <FollowList  header="팔로우"     data={data}  />
      </AppLayout>
    </>
  );
}
export default Profile;
