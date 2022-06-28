import React, { useContext } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Form, Input, Select, Space, message } from 'antd';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { createTicket } from '../http/ticketAPI';
import { useNavigate } from 'react-router-dom';
import { TICKET_ROUTE } from '../utils/consts';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

const Create = () => {
    const {ticketProps, user} = useContext(Context)
    const { Option } = Select; 

    const {categories} = ticketProps
    
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const openMessage = (id) => {
      message.loading({ content: 'Создание заявки...', key: 'message', style: {
        marginTop: '20vh',
      } } );
      setTimeout(() => {
        message.success({ content: <span>Заявка создана! <a onClick={ () => navigate(TICKET_ROUTE + '/' + id)}>Перейти</a></span>, key: 'message', duration: 2, style: {
          marginTop: '20vh',
        } });
        form.resetFields() 
      }, 1000);
    };

    const onFinish = (values) => {
      const formData = new FormData()
      
      formData.set('categoryId', `${values.category}`)
      formData.set('title', values.title)
      formData.set('description', values.body)
      formData.set('userId', user.user.id)
      
      formData.get('title')
      createTicket(formData).then( data => {
        if (data) {
         openMessage(data?.id)
        }
      })
    }

    return (
    <div className="pageprops" >
        <div className='header pageWidth' style={{marginTop: '1%', height: '8%'}}>
                <PageHeader
                    style={{height: '100%'}}
                    ghost={false}
                    onBack={() => window.history.back()}
                    title='Создать заявку'
                >
              
                </PageHeader>
        </div>
        <div className='content pageWidth'  style={{display: 'flex', height:'87%'}}>
            
            <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%'}}>
            <h3 style={{paddingTop: '1%', paddingLeft: '2%'}}>Создать заявку</h3>
                  
            <Divider style={{marginTop: '-5px'}}/>
            <Form  {...layout} name="nest-messages" onFinish={onFinish} style={{paddingTop: '15px'}} form={form}>
                <Form.Item name='category' label='Категория' rules={[{ required: true }]} help='Выберите категорию'>
                
                    <Select
                      showSearch
                      allowClear = 'true'
                      placeholder="Выберите категорию"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                    >
                    { categories.map((item) => 
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    )}
                    </Select>
                </Form.Item>
                <Form.Item name='title' label="Тема заявки" rules={[{ required: true }] } help='Тема вашего обращения'>
                    <Input allowClear = 'true'/>
                </Form.Item>
                <Form.Item name='body' label="Описание" rules={[{ required: true }]} help='Опишите вашу проблему'>
                    <Input.TextArea autoSize={{minRows: 6}}/>
                </Form.Item>
                <Form.Item hidden name= 'userId' initialValue={user.user.id}>
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit" >
                        Создать заявку
                    </Button >
                </Form.Item>
              </Form>

            </div>  
        </div>
    </div>
    );
};

export default observer (Create);