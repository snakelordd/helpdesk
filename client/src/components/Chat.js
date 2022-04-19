import { Comment, Tooltip, List, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import React from 'react';
import { getFormatDate } from '../pages/CommonFunctions';

const Chat = ({messages, author}) => {

    const getMessage = (item) => {
        if (item.isLog) {
            return <li><p style={{textAlign: 'center', paddingTop: '20px'}}><Divider>{item.body}</Divider></p></li>
        }
        return    <li>
              <Comment
                actions={item.actions}
                author={item.isLog ? null : author.user_info.name}
                avatar={item.isLog ? null : <Avatar size='large' icon={<UserOutlined />} />}
                content={item.body}
                datetime={item.isLog ? null : getFormatDate(item)}
                style={{width: '70%', marginLeft: '5%', }}
            
              />
              <Divider />
            </li>
          
    }
    return (
        <div className='p-20'>
            <List
              className="comment-list"
              header={'Активность'}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={item => getMessage(item)}
            />
        </div>
    );
};

export default Chat;