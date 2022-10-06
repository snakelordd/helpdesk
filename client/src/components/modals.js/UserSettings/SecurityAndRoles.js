import { Button, Card, Form, Input, message, Select, Space } from 'antd';
import {LockOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { showConfirm } from '../confirmModal';
import FormItem from 'antd/lib/form/FormItem';
import { updateUser } from '../../../http/userAPI';
import { Context } from '../../../';

const SecurityAndRoles = ({user}) => {


    const changePassword = (values) => {
        const formData = new FormData()
        formData.append('userId', user.id)
        formData.append('newPassword', values.password)
        updateUser(formData)
        setTimeout(() => { message.success({ content: 'Успешно!', key: 'message', duration: 2, 
            style: {
              marginTop: '45vh',
            } });
          }, 200);
    }

    const changeRole = (values) => {
        const formData = new FormData()
        formData.append('userId', user.id)
        formData.append('role', values.role)
        updateUser(formData)
        setTimeout(() => { message.success({ content: 'Успешно!', key: 'message', duration: 2, 
            style: {
              marginTop: '45vh',
            } });
          }, 200);
    }

    const confirmChangeRole = (values) => {
        showConfirm('Вы действительно хотите изменить роль пользователя?', changeRole, values)
    }
    const confirmChangePassword = (values) => {
        showConfirm('Вы действительно хотите изменить пароль?', changePassword, values)
    }

    return (
        <Card size='small' bordered={false}  >
            <Card  size='small' bordered={false}  title={<Space><LockOutlined />Изменение пароля</Space>}>
                <Form labelCol={{span: 5 }} wrapperCol={{ span: 8,}} onFinish={confirmChangePassword}>
                    <Form.Item label='Новый пароль' name={'password'} 
                        rules={[{required: true, message: 'Заполните поле',}]} 
                        hasFeedback
                    >
                        <Input type='password' size='small' allowClear = 'true'  />
                    </Form.Item> 
                    <Form.Item label='Повторите пароль' name={'passReply'} 
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ required: true, message: 'Подтвердите пароль!'},
                          ({ getFieldValue }) => ({validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              } 
                              return Promise.reject(new Error('Пароли не совпадают'));
                            },
                          }),
                        ]}
                    >
                        <Input type='password' size='small' allowClear = 'true'  />
                    </Form.Item> 
                    <Form.Item wrapperCol={{offset: 5}}>
                        <Button type='primary' htmlType='submit'>Изменить пароль</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card  size='small' bordered={false}  title={<Space><UsergroupAddOutlined />Роль пользователя</Space>}>
                <Form labelCol={{span: 5 }} wrapperCol={{ span: 8,}} onFinish={confirmChangeRole}>
                    <Form.Item label='Роль пользователя' name={'role'} initialValue={user.role}>
                        <Select  >
                            <Select.Option value="ADMIN">Администратор</Select.Option>
                            <Select.Option value="USER">Пользователь</Select.Option>
                            <Select.Option value="CURATOR" >Куратор</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 5}}>
                        <Button type='primary' htmlType='submit'>Применить</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    );
};

export default SecurityAndRoles;