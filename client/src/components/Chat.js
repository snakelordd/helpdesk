import { Comment, Tooltip, List, Avatar, Divider, Form, Button, BackTop } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { getFormatDate } from '../pages/CommonFunctions';
import TextArea from 'antd/lib/input/TextArea';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { createMessage, fetchMessages } from '../http/chatAPI';
import { fetchOneUser } from '../http/userAPI';

const Chat = observer (({author, ticketId, chatId}) => {
    //const {messages} = useContext(Context)
    const [messages, setMessages] = useState()
    const auth = useContext(Context)

    const authUser = auth.user
    let user
    if (!author) {
       user = {
        user_info: {name: null}
      }
    }
    else {
      user = author
    }
    
    useEffect(()=> {
      fetchMessages(ticketId).then( data => {
        console.log(data)
        setMessages(data)
      })
    }, [])

    const [value, setValue] = useState([]);
    const handleChange = (e) => {
        setValue([e.target.value])
    }

    const handleSubmit = e => {

    }
    
    const onFinish = (values) => {
      const formData = new FormData()
      formData.append('userId', authUser.user.id)
      values.body && formData.append('body', values.body)
      if (chatId) {
        formData.append('chatId', chatId)
      }
      createMessage(formData).then( data => {
        if (data.status === 204) {

        }
        fetchMessages(ticketId).then( data => setMessages(data))
      })
    }

    const getMessage = (item) => {
        if (item.isLog) {
            return <li><p style={{textAlign: 'center', paddingTop: '20px'}}><Divider>{item.body}</Divider></p></li>
        }
        let user;
        fetchOneUser(item.userId).then( data => {
          user = data})
        return    <li>
              
              <Comment
                actions={item.actions}
                author={item.isLog ? null : (user ? (user.user_info ? user.user_info.name : item.user.email): item.user.email )}
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
          <Form.Item name='body'>
            <TextArea rows={4}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Отправить
            </Button>
          </Form.Item>
        </>
      );

    return (
        <div className='p-20 chat pageWidth'>
            <div className='messages pageWidth' >
                <List
                  className="comment-list"

                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={item => getMessage(item)}
                />

            </div>
            <div className='p-20 editor'>
                <Comment
                    avatar={<Avatar icon={<UserOutlined />} />}
                    content={
                      <Form name='editor' onFinish={onFinish}>
                        <Editor />
                      </Form>
                      
                    }
                />
            </div>
            
        </div>
    );
});

export default Chat;