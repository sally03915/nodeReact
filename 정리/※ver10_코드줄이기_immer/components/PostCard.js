import React, { useState, useCallback ,useEffect}  from 'react';
import { Card, Avatar, Button , List, Comment  , Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import {useDispatch, useSelector } from 'react-redux';  //2. ## useDispatch
import PropTypes from 'prop-types';

//1. ## REMOVE_POST_REQUEST 
import { REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => { 
  const id = useSelector((state) => state.user.user?.id); 
  const { removePostLoading, removePostDone } = useSelector(state => state.post); //##3
  const   dispatch = useDispatch();  //##4
  ///////////////////////////////////////////////////// code

  //1. 좋아요 - false
  const [like, setLike] = useState(false);
  const onClickLike = useCallback(() => { setLike((prev) => !prev );  } , [] );

  //2. 댓글 -  댓글의 상태체크 / 댓글처음에는 안보이게, 클릭하면  토글기능
  const [commentOpen, setCommentOpen] = useState(false);
  const onClickComment = useCallback(() => { setCommentOpen(  prev => !prev );   }, []);
  
  //3. 삭제버튼
  useEffect(() => { 
    if (removePostDone) { console.log('..... removePostDone');   }
  } ,[] );

  const onRemovePost = useCallback(() => { 
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    });
  } , []);


  ///////////////////////////////////////////////////// view
  return (<div  style={{margin:'3%'}}>
    <Card 
      cover={ post.Images && post.Images.length > 0 &&  <PostImages images={post.Images} />}
      actions={[
        <RetweetOutlined  key="retweet" />, 
        like
          ? <HeartTwoTone   twoToneColor="#f00"   key="heart"  onClick={onClickLike}   /> 
          : <HeartOutlined  key="heart"                        onClick={onClickLike}   />,
        
        <MessageOutlined  key="comment"  onClick={onClickComment} />,
        <Popover content={(
          <Button.Group>
            { id &&  id === post.User.id  
            ?(  <><Button>수정</Button>
                <Button type="danger"
                    loading={removePostLoading}  onClick={onRemovePost} >삭제</Button></>
              )
            :   <Button>신고</Button>
            }
          </Button.Group>
        )}>
          <EllipsisOutlined/>
        </Popover>
      ]}
    >
      <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                 title={post.User.nickname}
                 description={post.content} />
    </Card>
    {commentOpen && (    
      <>
        {/*  댓글폼  */}
        <CommentForm  post={post}  />
        {/*  댓글리스트  */}
        <List
          header={`${post.Comments.length}  댓글`}
          itemLayout='horizontal'
          dataSource={post.Comments}
          renderItem={(item) => (
            <li>
              <Comment
                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                content={item.content}
                author={item.User.nickname}
              />
            </li>
          )
          }
        />
      </>
    )}
  </div>);
};

PostCard.propTypes = {  post : PropTypes.object.isRequired  };

export default PostCard;