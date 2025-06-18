import React from 'react';
import AppLayout from '../components/AppLayout'
//import  'antd/dist/antd.css';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { useSelector } from 'react-redux';  //##

const Home = () => { 
  const { isLogIn }   = useSelector(state => state.user); 
  const { mainPosts } = useSelector(state => state.post);
  
  return (<AppLayout> 
    { isLogIn &&  <PostForm /> }
    { mainPosts.map((c) => {
      return (
        <PostCard   post={c}  key={c.id} />
      );} )}
      
  </AppLayout>);
}
export default Home;