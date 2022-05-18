import React, { useContext, useState } from 'react';
import { PageHeader, Select, Space, message, Tabs, Form, Input, Button, Menu, Modal} from 'antd';
import { Context } from '..';
import { MailOutlined, StarOutlined, AppstoreOutlined, AppstoreAddOutlined, SettingOutlined, MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';

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

  const { Option } = Select;

  const {categories, statuses} = ticketProps
  
  const fields = [{name: 'printers'}]
  
  const { confirm } = Modal;

  function showConfirm(category) {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Вы действительно хотите удалить категорию ${category}`,
      width: 500,
      centered: true,
      okText: 'Да',
      cancelText: 'Отмена',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    }); 
  }

  const onFinish = values => {
      console.log('Received values of form:', values);
  }

  const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
  
  const inputForm = (formType) => {
      switch (formType) {
        case 'category':
          return (
            <>
              <h2>Создать новую категорию</h2>
              <Form name='category' >
              <Form.Item rules={[{ required: true }]} style={{paddingBottom: '10px'}}>
                <Space>
                    <Input style={{width: '300px'}} placeholder='Введите название категории' allowClear='true'/>
                    <Button type="primary" htmlType="submit" onClick={()=> alert('x')}>
                      Создать
                    </Button>
                </Space>              
              </Form.Item>
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
              <Form name='status' >
              <Form.Item rules={[{ required: true }]} style={{paddingBottom: '10px'}}>
                <Space>
                    <Input style={{width: '300px'}} placeholder='Введите название статуса' allowClear='true'/>
                    <Button type="primary" htmlType="submit" onClick={()=> alert('x')}>
                      Создать
                    </Button>
                </Space>              
              </Form.Item>
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

export default Settings;