import React, { useCallback, useEffect } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LOG_OUT_REQUEST } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 5%;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logOutLoading, logOutDone, user } = useSelector(state => state.user);

  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);

  useEffect(() => {
    if (logOutDone) {
      router.push('/');
    }
  }, [logOutDone]);

  return (
    <Card
      actions={[
        <Link key="sns" href={`/user/${user.id}`} legacyBehavior>
          <a><span>게시글<br />{user.Posts?.length || 0}</span></a>
        </Link>,
        <Link key="followings" href="/profile" legacyBehavior>
          <a><span>팔로잉<br />{user.Followings?.length || 0}</span></a>
        </Link>,
        <Link key="followers" href="/profile" legacyBehavior>
          <a><span>팔로워<br />{user.Followers?.length || 0}</span></a>
        </Link>
      ]}
    >
      <Card.Meta
        avatar={<Link href={`/user/${user.id}`}><Avatar>{user.nickname[0]}</Avatar></Link>}
        title={user.nickname}
      />
      <ButtonWrapper>
        <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
      </ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
