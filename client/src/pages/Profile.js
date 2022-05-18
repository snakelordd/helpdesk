import { Avatar, Button, Card, Descriptions, Divider, Form, Input, PageHeader, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { MailOutlined, NumberOutlined , SolutionOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

const Profile = () => {
    console.log('myprofil page')

    const {user} = useContext(Context)
    const [showEditForm, setShowEditForm] = useState(false)

    const userr = {
        id: 1,
        email: 'user@mail.ru',
        password: '123',
        role: 'ADMIN',
        avatar: "staticAvatar.jpg",
        userInfo: {
            id: 1, 
            name: 'Аптека 1', 
            address: 'Сибиряков-Гвардейцев, 34', 
            organization: '',
            department: 1,
            userId: 1,
            fedPhone: '+7-962-828-4729',
            cityPhone: '249-59-01'
        }
    }
    const navigate = useNavigate()

    const editForm = () => {
        return (
            <Form name='userInfo'>
                        <Descriptions title="Информация о пользователе">
                            <Descriptions.Item label={<Space><SolutionOutlined />Юр. лицо</Space>}>
                                <Form.Item  name={['user_info', 'organization']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><EnvironmentOutlined/>Место деятельности</Space>}>
                                <Form.Item  name={['user_info', 'address']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><NumberOutlined />Номер аптеки</Space>}>
                                <Form.Item  name={['user_info', 'department']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><MailOutlined />Эл. почта</Space>}>
                                <Form.Item  name={['user_info', 'email']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}>
                                <Form.Item  name={['user_info', 'fedPhone']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}>
                                <Form.Item  name={['user_info', 'cityPhone']}>
                                    <Input allowClear = 'true'/>
                                </Form.Item>
                            </Descriptions.Item>
                        </Descriptions>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={()=> setShowEditForm(false)}>
                                Применить
                            </Button>
                        </Form.Item>
            </Form>
        )
    }
    return (
        <div className='pageprops'>
            <div className='pageWidth' style={{ marginTop: '1%'}}>
                <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title="Мой профиль"
                  extra={[
                    <Space size={12}>
                    
                    </Space>
                  ]}
                >
                </PageHeader>
                <div className='pageWidth' style={{ marginTop: '1%', }}>
                    <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%'}}>
                        
                    <Card bordered={false}>
                      <Card.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={user.user.userInfo.name}
                        description={user.user.email}
                        
                      />
                        <div style={{padding: '50px', paddingTop: 0}}>
                        <Divider />
                        {!showEditForm ?
                        <div>
                        <Descriptions title="Информация о пользователе">
                           {user.user.userInfo.organization && <Descriptions.Item label={<Space><SolutionOutlined />Юр. лицо</Space>}>{user.user.userInfo.organization}</Descriptions.Item>}
                           {user.user.userInfo.address    && <Descriptions.Item label={<Space><EnvironmentOutlined/>Место деятельности</Space>}>{user.user.userInfo.address}</Descriptions.Item>}
                           {user.user.userInfo.department    && <Descriptions.Item label={<Space><NumberOutlined />Номер аптеки</Space>}>{user.user.userInfo.department}</Descriptions.Item>}
                           {user.user.email    && <Descriptions.Item label={<Space><MailOutlined />Эл. почта</Space>}><a>{user.user.email}</a></Descriptions.Item>}
                           {user.user.userInfo.fedPhone    && <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{user.user.userInfo.fedPhone}</a></Descriptions.Item>}
                           {user.user.userInfo.cityPhone    && <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{user.user.userInfo.cityPhone}</a></Descriptions.Item>}
                        </Descriptions>
                        {user.user.role === 'ADMIN' && <a onClick={() => setShowEditForm(true)}>Редактировать информацию</a>}
                        </div>
                        :
                        editForm()
                        }
                        </div>
                    </Card>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;