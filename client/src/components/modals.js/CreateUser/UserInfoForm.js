import { Card, Form, Input, Space } from 'antd';
import React from 'react';
import { MailOutlined, NumberOutlined , SolutionOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';


const UserInfoForm = ({form, initialData}) => {
    return (
        <Card bordered={false}>
            <Form form={form} name='userInfo' labelAlign='left' labelCol={{span: 5, offset: 2}} wrapperCol={{span: 14, offset: 0}}  style={{width: '100%'}} >
                <br></br>
                <Form.Item 
                    rules={[{required: true, message: 'Обязательное поле',}]} 
                    label={<Space><UserOutlined />Имя</Space>} name={'name'} initialValue={initialData ? initialData?.name : ''}
                >
                    <Input   allowClear = 'true'  />
                </Form.Item>                            
                <Form.Item label={<Space><SolutionOutlined />Юр. лицо</Space>} name={'organization'} initialValue={initialData ? initialData?.organization : ''}>
                    <Input  allowClear = 'true' />
                </Form.Item>                                                
                <Form.Item  label={<Space><EnvironmentOutlined/>Место деятельности</Space>} name={ 'address'} initialValue={initialData ? initialData?.address : ''}>
                    <Input   allowClear = 'true' />
                </Form.Item>
                <Form.Item  label={<Space><NumberOutlined />Номер аптеки</Space>} name={ 'department'} initialValue={initialData ? initialData?.department : ''}>
                    <Input   allowClear = 'true' />
                </Form.Item>
                <Form.Item label={<Space><PhoneOutlined />Номер телефона</Space>} name={ 'fedPhone'} initialValue={initialData ? initialData?.fedPhone : ''}>
                    <Input   allowClear = 'true' />
                </Form.Item>
                <Form.Item label={<Space><PhoneOutlined />Городской телефон</Space>} name={'cityPhone'} initialValue={initialData ? initialData?.cityPhone : ''}>
                    <Input   allowClear = 'true' />
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UserInfoForm;