import React from 'react';
import { Card, Avatar, Button , List, Comment  , Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';

const PostCard = () => { 

  return (<div  style={{margin:'3%'}}>
    <Card 
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      actions={[
        <RetweetOutlined />, 
        <HeartOutlined />,
        <MessageOutlined />,
        <Popover content={(
          <Button.Group>
              <Button>수정</Button>
              <Button  type="primary">삭제</Button>
          </Button.Group>
        )}>
          <EllipsisOutlined/>
        </Popover>
      ]}
    >
    </Card>
  </div>);
};
export default PostCard;