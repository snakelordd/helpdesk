import { Button, Form, Input, Modal, Space, message } from 'antd';
import React from 'react';
import { MailOutlined, NumberOutlined , SolutionOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { addUserInfo } from '../../http/userAPI';

const UserInfoModal = ({show, onHide, isUpdate, user, }) => {

    const addInfo = (values) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('organization', values.organization)
        formData.append('department', values.department)
        formData.append('userId', user.id)
        formData.append('fedPhone', values.fedPhone)
        formData.append('cityPhone', values.cityPhone)
        
        if (isUpdate === true) {
            formData.append('isUpdate', true)
        }
        else {
            formData.append('isUpdate', false)
        }

        addUserInfo(formData).then( data => {
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
             }
        })
        
        onHide()
        setTimeout(() => {
            message.success({ content: 'Успешно!', key: 'message', duration: 2, style: {
              marginTop: '20vh',
            } });
          }, 200);
    }

    if (!user) {
        user = ''
    }
    const updateInfo = values => {
        console.log('update ', values)
    }
    return (
        <Modal title="Информация о пользователе" visible={show}  onCancel={onHide} centered width={800} footer={[
                <Button onClick={onHide} key={Math.random()}>
                    Отмена
                </Button>, 
                <Button form="userInfo" type='primary' key="submit" htmlType="submit" >
                    Сохранить изменения
                </Button>

        ]}>
        <Form name='userInfo' onFinish={addInfo} labelAlign='left' labelCol={{offset: 0, span: 6,  }}  style={{width: '100%'}} >
                        <br></br>
                        <Form.Item label={<Space><UserOutlined />Имя</Space>} name={'name'} initialValue={user?.user_info?.name}>
                            <Input  size='small' allowClear = 'true'  />
                        </Form.Item>                            
                        <Form.Item label={<Space><SolutionOutlined />Юр. лицо</Space>} name={'organization'} initialValue={user?.user_info?.organization}>
                            <Input  size='small' allowClear = 'true' />
                        </Form.Item>                                                
                        <Form.Item  label={<Space><EnvironmentOutlined/>Место деятельности</Space>} name={ 'address'} initialValue={user?.user_info?.address}>
                            <Input  size='small' allowClear = 'true' />
                        </Form.Item>
                        <Form.Item  label={<Space><NumberOutlined />Номер аптеки</Space>} name={ 'department'} initialValue={user?.user_info?.department}>
                            <Input  size='small' allowClear = 'true' />
                        </Form.Item>
                        <Form.Item label={<Space><MailOutlined />Эл. почта</Space>} name={'email'} initialValue={user?.email}>
                            <Input  size='small' allowClear = 'true' />
                        </Form.Item>
                        <Form.Item label={<Space><PhoneOutlined />Номер телефона</Space>} name={ 'fedPhone'} initialValue={user?.user_info?.fedPhone}>
                            <Input  size='small' allowClear = 'true' />
                        </Form.Item>
                        <Form.Item label={<Space><PhoneOutlined />Городской телефон</Space>} name={'cityPhone'} initialValue={user?.user_info?.cityPhone}>
                            <Input   size='small' allowClear = 'true' />
                        </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserInfoModal;