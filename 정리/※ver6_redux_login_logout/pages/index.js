import React from 'react';
import AppLayout from '../components/AppLayout'
//import  'antd/dist/antd.css';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => { 
  
  return (<AppLayout> 
      <PostForm />
      <PostCard />
  </AppLayout>);
}
export default Home;