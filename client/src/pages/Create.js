import React, { useContext } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Form, Input, Select, Space, message } from 'antd';
import { Context } from '..';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

const Create = () => {
    const {ticketProps} = useContext(Context)
    const { Option } = Select;

    const {categories} = ticketProps
    


    return (
    <div className="pageprops" >
        <div className='header pageWidth' style={{marginTop: '1%', height: '8%'}}>
                <PageHeader
                    style={{height: '100%'}}
                    ghost={false}
                    onBack={() => window.history.back()}
                    title='Создать заявку'
                    extra={[
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">
                      Primary
                    </Button>,
                  ]}
                >
              
                </PageHeader>
        </div>
        <div className='content pageWidth'  style={{display: 'flex', height:'87%'}}>
            
            <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%'}}>
            <h3 style={{paddingTop: '1%', paddingLeft: '2%'}}>Создать заявку</h3>
                  
            <Divider style={{marginTop: '-5px'}}/>
            <Form  {...layout} name="nest-messages" onFinish={() =>message.success({content: 'Заявка создана', style: {marginTop: '10%'}})} style={{paddingTop: '15px'}}>
                <Form.Item name={['ticket', 'category']} label='Категория' rules={[{ required: true }]} help='Выберите категорию'>
                
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
                <Form.Item name={['ticket', 'title']} label="Тема заявки" rules={[{ required: true }] } help='Тема вашего обращения'>
                    <Input allowClear = 'true'/>
                </Form.Item>
                <Form.Item name={['ticket', 'body']} label="Описание" rules={[{ required: true }]} help='Опишите вашу проблему'>
                    <Input.TextArea autoSize={{minRows: 6}}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Создать заявку
                    </Button>
                </Form.Item>
              </Form>

            </div>  
        </div>
    </div>
    );
};

export default Create;