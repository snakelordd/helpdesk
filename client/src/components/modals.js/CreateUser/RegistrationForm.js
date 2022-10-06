import { Card, Form, Input } from 'antd';
import React from 'react';

const RegistrationForm = ({form, initialData}) => {
    return (
        <Card  
            bordered={false}
        >    
            <Form form={form}  
                labelAlign='left' 
                name='registrationForm' 
                labelCol={{span: 4, offset: 2}} 
                wrapperCol={{span: 14, }} 
            >
                <Form.Item 
                    name='email' 
                    label='Эл. почта' 
                    rules={[{required: true, message: 'Заполните поле',}]} 
                    initialValue={initialData ? initialData?.email : ''}> 
                    <Input placeholder='Введите email' label='Эл. почта'/>
                </Form.Item>
                <Form.Item  name={'password'} 
                    rules={[{required: true, message: 'Заполните поле',}]} 
                    hasFeedback
                    label='Пароль'
                    initialValue={initialData ? initialData?.password : ''}
                >
                    <Input type='password'  allowClear = 'true' placeholder='Придумайте пароль' />
                </Form.Item> 
                <Form.Item name={'passReply'} 
                    dependencies={['password']}
                    initialValue={initialData ? initialData?.passReply : ''}
                    hasFeedback
                    label='Подтверждение '
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
                    <Input type='password'  allowClear = 'true'  placeholder='Повторите пароль'/>
                </Form.Item> 
            </Form>
        </Card>
    );
};

export default RegistrationForm;