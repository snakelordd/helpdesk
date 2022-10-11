import { Button, Card, Form, Input, Space, message } from 'antd';
import {DeleteOutlined  } from '@ant-design/icons';
import React, { useContext } from 'react';
import { showConfirm } from '../confirmModal';
import { deleteUser } from '../../../http/userAPI';
import { Context } from '../../..';

const ProfileManagment = ({userProfile, onHide}) => {


    const {user} = useContext(Context)
    const deleteUserProfile = (values) => {
        deleteUser(values.userId).finally(() => {
            onHide()
            setTimeout(() => message.success({ content: 'Успешно!', key: 'message', duration: 2, style: {marginTop: '45vh',} }), 200);
        } )
    }
    const confirmDelete = (values) => {
        const content = ['Вы действительно хотите удалить данный профиль?', 'ВАЖНО!', 'Удаление профиля пользователя повлечет за собой удаление всех заявок свзанных с данным пользователем' ]
        showConfirm(content, 
            deleteUserProfile, values)
    }
    return (
        <Card bordered={false} className='settingsCard'>
            <Card title={<Space><DeleteOutlined />  Удаление профиля</Space>} size='small' bordered={false}>
                <Form labelCol={{span: 5 }} wrapperCol={{ span: 8, offset: 1}} onFinish={confirmDelete}>
                    <Form.Item name='userId' initialValue={userProfile.id}>
                        <Input hidden/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='danger' disabled={userProfile.id != user.user.id && userProfile.id != 1 ? false : true }>Удалить профиль</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    );
};

export default ProfileManagment;