import { Avatar, Button, Card, Descriptions, Divider, Form, Input, PageHeader, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { MailOutlined, NumberOutlined , SolutionOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { addUserInfo } from '../http/userAPI';
import { observer } from 'mobx-react-lite';

const Profile = () => {

    const {user} = useContext(Context)
    const [showEditForm, setShowEditForm] = useState(false)

    console.log(user)
    const navigate = useNavigate()

    const addInfo = (values) => {
        console.log('Received values of form:', values);
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('organization', values.organization)
        formData.append('department', values.department)
        formData.append('userId', user.user.id)
        formData.append('fedPhone', values.fedPhone)
        formData.append('cityPhone', values.cityPhone)
        addUserInfo(formData).then( data => {
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
             }
        })
        setShowEditForm(false)
    }

    const copy = () => {

        
    }
    const editForm = () => {
        return (
            <Form name='userInfo' onFinish={addInfo} labelAlign='left' labelCol={{offset: 0, span: 5,  }} wrapperCol={{ span: 5 }} style={{width: '100%'}}>
                        <h3>Информация о пользователе</h3>
                        <br></br>
                        <Form.Item label={<Space><UserOutlined />Имя</Space>} name={'name'}  >
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>                            
                        <Form.Item label={<Space><SolutionOutlined />Юр. лицо</Space>} name={'organization'} >
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>                                                
                        <Form.Item  label={<Space><EnvironmentOutlined/>Место деятельности</Space>} name={ 'address'} >
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>
                        <Form.Item  label={<Space><NumberOutlined />Номер аптеки</Space>} name={ 'department'}>
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>
                        <Form.Item label={<Space><MailOutlined />Эл. почта</Space>} name={'email'}>
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>
                        <Form.Item label={<Space><PhoneOutlined />Номер телефона</Space>} name={ 'fedPhone'}>
                            <Input  size='small' allowClear = 'true'/>
                        </Form.Item>
                        <Form.Item label={<Space><PhoneOutlined />Городской телефон</Space>} name={'cityPhone'}>
                            <Input   size='small' allowClear = 'true'/>
                        </Form.Item>
                    
                        <Form.Item  style={{paddingTop: '20px', }}>
                            <Button type="primary" htmlType="submit" > Сохранить изменения </Button>
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
                        title={ user.user?.user_info?.name || user.user.email}
                        description={user.user.hasOwnProperty('user_info') ? user.user.email : <a onClick={() => setShowEditForm(true)} >Добавить дополнительную информацию</a>}
                        
                      />
                        { 
                        user.user.hasOwnProperty('user_info') ?
                        <div style={{padding: '50px', paddingTop: 0}}>
                        <Divider />
                        {!showEditForm ?
                        <div>
                        { user.user?.user_info &&
                        <Descriptions title="Информация о пользователе" >
                           {<Descriptions.Item label={<Space><SolutionOutlined />Юр. лицо</Space>}>{user.user?.user_info?.organization}</Descriptions.Item>}
                           {user.user.user_info.address    && <Descriptions.Item label={<Space><EnvironmentOutlined/>Место деятельности</Space>}><a onClick={() => copy()}>{user.user.user_info.address}</a></Descriptions.Item>}
                           {user.user.user_info.department    && <Descriptions.Item label={<Space><NumberOutlined />Номер аптеки</Space>}>{user.user.user_info.department}</Descriptions.Item>}
                           {user.user.email    && <Descriptions.Item label={<Space><MailOutlined />Эл. почта</Space>}><a>{user.user.email}</a></Descriptions.Item>}
                           {user.user.user_info.fedPhone    && <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{user.user.user_info.fedPhone}</a></Descriptions.Item>}
                           {user.user.user_info.cityPhone    && <Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{user.user.user_info.cityPhone}</a></Descriptions.Item>}
                        </Descriptions>
                        }
                       <a onClick={() => setShowEditForm(true)}>Редактировать информацию</a>
                        </div>
                        :
                        editForm()
                        }
                        </div>
                         :  showEditForm && editForm()
                        }
                    </Card>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer (Profile);