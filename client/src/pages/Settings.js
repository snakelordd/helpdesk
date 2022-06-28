import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Select, Space, message, Tabs, Form, Input, Button, Menu, Modal} from 'antd';
import { Context } from '..';
import { MailOutlined, StarOutlined, AppstoreOutlined, AppstoreAddOutlined, SettingOutlined, MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { createProp, fetchProps } from '../http/ticketPropsAPI';
import { observer } from 'mobx-react-lite';

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

function callback(key) {
    console.log(key);
}


const Settings = () => {
  const {ticketProps} = useContext(Context)
  const [current, setCurrent] = React.useState('1');
  const [inputType, setInputType] = useState('category')

  const [disableInput, setDisableInput] = useState(true)
  const {categories, statuses} = ticketProps

  useEffect( () => {
    fetchProps('category').then( data => ticketProps.setCategories(data.data))
    fetchProps('status').then( data => ticketProps.setStatuses(data.data))
    setInterval([])
  }, [])

  const openMessage = () => {
    message.loading({ content: 'Загрузка...', key: 'message', style: {
      marginTop: '20vh',
    } });
    setTimeout(() => {
      message.success({ content: 'Успешно!', key: 'message', duration: 2, style: {
        marginTop: '20vh',
      } });
    }, 1000);
  };

  const onFinishCategory = values => {
      console.log('Received values of form:', values);
      createProp(null,  values.category).then(data => {
        if (data.status === 200) {
          fetchProps('category').then( data => ticketProps.setCategories(data.data)) 
          openMessage()
        }
      })
  }

  const onFinishStatus = values => {
    console.log('Received values of form:', values);
    createProp(values.status, null).then(data => {
      if (data.status === 200) {
        fetchProps('status').then( data => ticketProps.setStatuses(data.data))
        openMessage()
      }
    })
}

  const inputForm = (formType) => {
      switch (formType) {
        case 'category':
          return (
            <>
              <h2>Создать новую категорию</h2>
              <Form name='category' onFinish={onFinishCategory} >
              <Space>

              <Form.Item name='category' rules={[{ required: true }]} style={{paddingBottom: '10px'}}>
                <Input style={{width: '300px'}} placeholder='Введите название категории' allowClear='true'/>
              </Form.Item>
              <Form.Item style={{paddingBottom: '10px'}}>
                <Button type="primary" htmlType='submit'>Создать</Button>
              </Form.Item>
              
              </Space>              
              
              </Form>
              { categories.length != 0 ?
              <Form name='updateCategory'> 
              <p>
                {disableInput ? 
                  <a onClick={() => setDisableInput(false)}>Разрешить редактирование</a> 
                :
                  <a onClick={() => setDisableInput(true)}>Запретить редактирование</a>
                }
              </p> 
              {categories.map( item => 
                <FormItem key={item.id} name={item.name}>
                  <Space>
                    <Input style={{width: '300px'}} defaultValue={item.name} disabled={disableInput}/>
                    {!disableInput &&
                    <Button  htmlType="submit" onClick={()=> alert('ok')}>
                      Применить
                    </Button>
                    }
                  </Space>
                </FormItem>
                )}
            </Form>
            :
            <p>В справочнике нет данных</p>
            }
            </>
          )
        case 'status':
          return (
            <>
              <h2>Создать новый статус</h2>
              <Form name='status' onFinish={onFinishStatus}>
              <Space>
              <Form.Item name='status' rules={[{ required: true }]} style={{paddingBottom: '10px'}}>
                  <Input style={{width: '300px'}} placeholder='Введите название статуса' allowClear='true'/>
              </Form.Item>
              <Form.Item style={{paddingBottom: '10px'}}>
                  <Button type="primary" htmlType="submit">
                    Создать
                  </Button>             
              </Form.Item>
              </Space>
              </Form>
              { statuses.length != 0 ? 
              <Form name='updateStatus'> 
              <p>
                {disableInput ? 
                  <a onClick={() => setDisableInput(false)}>Разрешить редактирование</a> 
                :
                  <a onClick={() => setDisableInput(true)}>Запретить редактирование</a>
                }
              </p> 
              {statuses.map( item => 
                <FormItem key={item.id} name={item.name}>
                  <Space>
                    <Input style={{width: '300px'}} defaultValue={item.name} disabled={disableInput}/>
                    {!disableInput &&
                    <Button  htmlType="submit">
                      Применить
                    </Button>
                    }
                  </Space>
                </FormItem>
                )}
            </Form>
            :
            <p>В справочнике нет данных</p>
            }
            </>
            
          )
      }
    }

    return (
    <div className="pageprops" >
        <div className='header pageWidth' style={{marginTop: '1%', height: '8%'}}>
                <PageHeader
                    style={{height: '100%'}}
                    ghost={false}
                    onBack={() => window.history.back()}
                    title='Настройки'
                >
              
                </PageHeader>
        </div>
        <div className='content pageWidth'  style={{display: 'flex', height:'87%'}}>
            
            <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%', paddingLeft: '2%'}}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Справочники" key="1" icon={<AppstoreOutlined/>}>
                      <div className='settingsTabContent'>
                          <div style={{width: '15%', height: '100%'}}>
                            <Menu mode="inline" defaultSelectedKeys={inputType} style={{height: '100%'}}>
                              <Menu.Item key="category" icon={<AppstoreAddOutlined />} onClick={() => setInputType('category')}>
                                Категории
                              </Menu.Item>
                              <Menu.Item key="status" icon={<StarOutlined />} onClick={() => setInputType('status')}>
                                Статусы
                              </Menu.Item>
                            </Menu>  
                          </div>
                          <div style={{width: '80%'}}>
                            {inputForm(inputType)}
                          </div>
                      </div>
                      
                    </TabPane>
                </Tabs>           

            </div>  
        </div>
    </div>
    );
};

export default observer(Settings);