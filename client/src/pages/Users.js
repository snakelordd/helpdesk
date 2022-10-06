import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Divider, Input, List, PageHeader, Row, Space, Tag } from 'antd';
import {UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { Context } from '..';
import { fetchAllUsers } from '../http/userAPI';
import UserInfoModal from '../components/modals.js/UserInfoModal';
import UserSettings from '../components/modals.js/UserSettings';
import CreateUser from '../components/modals.js/CreateUser/CreateUser';

const Users = () => {
  
  const {user} = useContext(Context)
  const [users, setUsers] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [showCreateTool, setShowCreateTool] = useState(false)
  const [userItem, setUserItem] = useState('')

  useEffect( () => {
    fetchAllUsers().then((data) => {
      user.setAllUsers(data)
      setUsers(data)
    })

  }, [showEditForm])

  
  const onHide = () => {
    setShowEditForm(false)
    setUserItem('')
  }

  const editUserInfo = (item) => {
    setUserItem(item)
    setShowEditForm(true)

  }

  const onSearch = (value) => {
    let foundUsers = []
    if(!value) {
      setShowEditForm(!showEditForm)
    }
    
    foundUsers = (users.filter( user => {
      return (
        user.email.toLowerCase().includes(value) ||
        user.user_info?.name.toLowerCase().includes(value) ||
        user.user_info?.organization.toLowerCase().includes(value) ||
        user.user_info?.address.toLowerCase().includes(value) ||
        user.user_info?.fedPhone.toLowerCase().includes(value) ||
        user.user_info?.cityPhone.toLowerCase().includes(value)
      )
    }))
    setUsers(foundUsers)
    foundUsers=[]
  }

  const reFetchUsers = () => {
    setShowEditForm(!showEditForm)
  }
  return (
    <div className='pageprops'>
      <div className='header pageWidth' style={{marginTop: '1%', height: '8%'}}>
        <PageHeader
            style={{height: '100%'}}
            ghost={false}
            onBack={() => window.history.back()}
            title='Пользователи'
            extra={<Space>
              <Input.Search
              placeholder="Поиск пользователя"
              allowClear
              
              onChange={e => onSearch(e.target.value)}
              onSearch={onSearch}
              style={{width: 500}}
            />
            {user.user.role == 'ADMIN' && <Button type="primary" icon={<UserAddOutlined />} onClick={() => setShowCreateTool(true)}> Создать</Button> }
            </Space>
            }
        />
      </div>
      <div className='content pageWidth'  style={{display: 'flex', height:'87%', overflow: 'hidden'}}>
          <Card                   
            style={{width: '100%', overflow: 'auto'}}
          >
            <List
              itemLayout="horizontal"
              dataSource={users}
              renderItem={(item) => (
              <List.Item
                actions={[
                  <div>
                    {item.role === 'ADMIN' && <Tag color='blue'>Администратор</Tag>}
                    {item.role === 'CURATOR' && <Tag color='green'>Куратор</Tag>}
                  </div>
                  ,
                  user.user.role == 'ADMIN' 
                  && <a key="edit" onClick={() => editUserInfo(item)} style={{marginRight: '15px'}}>
                    <SettingOutlined style={{fontSize: '1.2em'}}/>
                  </a> ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    
                      <a href="">{item.user_info?.name || item.email}</a>
                  }
                  description={
                    <Space size='large'>
                      <span>{item.user_info?.organization != 'undefined' && item.user_info?.organization}</span> 
                      <Space>
                        {item.user_info?.cityPhone && 'Тел: '}
                        <a>
                          {item.user_info?.cityPhone != 'undefined' && ( item.user_info?.cityPhone )}
                        </a>
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
            />
          { userItem && <UserSettings show={showEditForm} onHide={onHide} user={userItem} isUpdate={true}/>}
          {<CreateUser showCreateTool={showCreateTool} setShowCreateTool={setShowCreateTool} reFetchUsers={reFetchUsers} ></CreateUser>}
          </Card>           
      </div>
    </div>
    );
};

export default Users;
