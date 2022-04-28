import { Comment, Tooltip, List, Avatar, Divider, Form, Button, BackTop } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { getFormatDate } from '../pages/CommonFunctions';
import TextArea from 'antd/lib/input/TextArea';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Chat = observer (({author}) => {
    const {messages} = useContext(Context)
    const [value, setValue] = useState([]);
    const handleChange = (e) => {
        setValue([e.target.value])
    }

    const handleSubmit = e => {

    }
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

    const Editor = ({ onChange, onSubmit, value }) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit"  onClick={onSubmit} type="primary">
              Отправить
            </Button>
          </Form.Item>
        </>
      );

    return (
        <div className='p-20 chat'>
            <div className='messages'>
                <List
                  className="comment-list"

                  itemLayout="horizontal"
                  dataSource={messages.messages}
                  renderItem={item => getMessage(item)}
                />

            </div>
            <div className='p-20 editor'>
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                      <Editor
                        onChange={e => handleChange}
                        onSubmit={e => handleSubmit}

                    
                      />
                    }
                />
            </div>
            
        </div>
    );
});

export default Chat;