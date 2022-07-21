import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Select, Space, message, Tabs, Form, Input, Button, Menu, Modal, Tag} from 'antd';
import { Context } from '..';
import { MailOutlined, StarOutlined, AppstoreOutlined, AppstoreAddOutlined, SettingOutlined, MinusCircleOutlined, PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { createProp, fetchProps, updateProps } from '../http/ticketPropsAPI';
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
  const [deleteFlag, setDeleteFlag] = useState(false)
  const [disableInput, setDisableInput] = useState(true)
  const {categories, statuses} = ticketProps
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteValues, setDeleteValues] = useState({})

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
      createProp(null, null,  values.category).then(data => {
        if (data.status === 200) {
          fetchProps('category').then( data => ticketProps.setCategories(data.data)) 
          openMessage()
        }
      })
  }

  const onFinishStatus = values => {
    createProp(values.status.toUpperCase(), values.tag, null).then(data => {
      if (data.status === 200) {
        fetchProps('status').then( data => ticketProps.setStatuses(data.data))
        openMessage()
      }
    })
  }

  
  const updateStatus = values => {
    if (!values.isDelete) {
      values.isDelete = false
    }
    console.log(values)
    updateProps(
        values.type, 
        values.id, 
        values.type === 'status' ? 
        values.name.toUpperCase() 
        : values.name.charAt(0).toUpperCase() + values.name.slice(1), 
        values.isDelete,
        values?.tag, 

      )
      .then(data => {
        if (data.status === 200) {
          switch (values.type) {
            case 'status': 
              fetchProps('status').then( data => ticketProps.setStatuses(data.data))
              break
            case 'category': 
              fetchProps('category').then( data => ticketProps.setCategories(data.data))
              break
          }
          openMessage()
      }
    })
    
  }

  const deleteModalOpen = (type, id, name) => {
    setDeleteValues({type, id, name})
    setIsModalVisible(true)
  }

  const deleteModalHandler = () => {
    updateStatus({...deleteValues, isDelete: true})
    setIsModalVisible(false)
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
            <div style={{height: '60vh', overflowY: 'scroll'}}>
              <p>
                {disableInput ? 
                  <a onClick={() => setDisableInput(false)}>Разрешить редактирование</a> 
                :
                  <a onClick={() => setDisableInput(true)}>Запретить редактирование</a>
                }
              </p> 
              {categories.map( item => 
                <Form name='updateCategory' key={Math.random()} onFinish={updateStatus}> 
                <Space key={Math.random()}>
                  <FormItem name='type' hidden initialValue='category'>
                    <Input></Input>
                  </FormItem>
                  <FormItem initialValue={item.id} name='id' hidden >
                    <Input />
                  </FormItem>
                  <FormItem initialValue={item.name} name='name'>
                      <Input style={{width: '300px'}}  disabled={disableInput}/>
                  </FormItem>
                  {!disableInput &&
                  <FormItem>
                      <Button  htmlType="submit">
                        Применить
                      </Button>
                  </FormItem>
                  }
                  {!disableInput &&
                  <FormItem key={Math.random()} initialValue={false} name='isDelete'>
                      <Button type='danger' onClick={() => deleteModalOpen('category' ,item.id, item.name)} >
                        Удалить
                      </Button>
                  </FormItem>
                  }
                </Space>
                </Form>
                )}
                <Modal 
                      title="Вы действительно хотите удалить данную категорию?" 
                      visible={isModalVisible} 
                      centered
                      width = {600}
                      footer={[
                        <Space key={Math.random()}>
                          <Button key='cancel' onClick={()=> setIsModalVisible(false)}>
                            Отмена
                          </Button>
                          <Button key='delete'  onClick={deleteModalHandler} type='danger'>
                            Удалить
                          </Button>
                        </Space>
                      ]} 
                      onCancel={() => setIsModalVisible(false)}>
                      Все заявки с категорией "{deleteValues.name}" будут изменены на "Без категории"
              </Modal>
            </div>
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
              <Form.Item name='tag'>
                <Select placeholder='Тэг'  style={{ width: 120, paddingBottom: '10px' }}>
                  <Select.Option value="null">Не выбран</Select.Option>
                  <Select.Option value="magenta"><Tag color="magenta">magenta</Tag></Select.Option>
                  <Select.Option value="red"><Tag color="red">red</Tag></Select.Option>
                  <Select.Option value="volcano"><Tag color="volcano">volcano</Tag></Select.Option>
                  <Select.Option value="orange"><Tag color="orange">orange</Tag></Select.Option>
                  <Select.Option value="gold"><Tag color="gold">gold</Tag></Select.Option>
                  <Select.Option value="lime"><Tag color="lime">lime</Tag></Select.Option>
                  <Select.Option value="green"><Tag color="green">green</Tag></Select.Option>
                  <Select.Option value="cyan"><Tag color="cyan">cyan</Tag></Select.Option>
                  <Select.Option value="blue"><Tag color="blue">blue</Tag></Select.Option>
                  <Select.Option value="geekblue"><Tag color="geekblue">geekblue</Tag></Select.Option>
                  <Select.Option value="purple"><Tag color="purple">purple</Tag></Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{paddingBottom: '10px'}}>
                  <Button type="primary" htmlType="submit">
                    Создать
                  </Button>             
              </Form.Item>
              </Space>
              </Form>
              { statuses.length != 0 ? 
              <div style={{height: '60vh', overflowY: 'scroll'}}>

              <p>
                {disableInput ? 
                  <a onClick={() => setDisableInput(false)}>Разрешить редактирование</a> 
                :
                  <a onClick={() => setDisableInput(true)}>Запретить редактирование</a>
                }
              </p> 
              {statuses.map( item => 
                <Form name='updateStatus' key={Math.random()} onFinish={updateStatus}> 
                  <Space key={Math.random()}>
                    <FormItem name='type' hidden initialValue='status'>
                      <Input></Input>
                    </FormItem>
                    <FormItem initialValue={item.id} name='id' hidden >
                      <Input />
                    </FormItem>
                    <FormItem initialValue={item.name} name='name'>
                        <Input style={{width: '300px'}}  disabled={disableInput}/>
                    </FormItem>
                    {!disableInput &&
                    <Form.Item name='tag' initialValue={item.tag}>
                    <Select placeholder='Тэг'>
                      <Select.Option value="null">Не выбран</Select.Option>
                      <Select.Option value="magenta"><Tag color="magenta">magenta</Tag></Select.Option>
                      <Select.Option value="red"><Tag color="red">red</Tag></Select.Option>
                      <Select.Option value="volcano"><Tag color="volcano">volcano</Tag></Select.Option>
                      <Select.Option value="orange"><Tag color="orange">orange</Tag></Select.Option>
                      <Select.Option value="gold"><Tag color="gold">gold</Tag></Select.Option>
                      <Select.Option value="lime"><Tag color="lime">lime</Tag></Select.Option>
                      <Select.Option value="green"><Tag color="green">green</Tag></Select.Option>
                      <Select.Option value="cyan"><Tag color="cyan">cyan</Tag></Select.Option>
                      <Select.Option value="blue"><Tag color="blue">blue</Tag></Select.Option>
                      <Select.Option value="geekblue"><Tag color="geekblue">geekblue</Tag></Select.Option>
                      <Select.Option value="purple"><Tag color="purple">purple</Tag></Select.Option>
                    </Select>
                  </Form.Item>}
                    {!disableInput &&
                    <FormItem>
                        <Button  htmlType="submit">
                          Применить
                        </Button>
                    </FormItem>
                    }
                    {!disableInput && item.id !== 1 &&
                    <FormItem key={Math.random()} initialValue={false} name='isDelete'>
                        <Button type='danger' onClick={() => deleteModalOpen('status' ,item.id, item.name)} >
                          Удалить
                        </Button>
                    </FormItem>
                    }

                    {!disableInput && item.id === 1 &&
                    <FormItem>
                      <Button disabled>Удалить</Button>  
                    </FormItem>}
                  </Space>
                </Form>
              )}
              <Modal 
                      title="Вы действительно хотите удалить этот статус?" 
                      visible={isModalVisible} 
                      centered
                      width = {600}
                      footer={[
                        <Space key={Math.random()}>
                          <Button key='cancel' onClick={()=> setIsModalVisible(false)}>
                            Отмена
                          </Button>
                          <Button key='delete'  onClick={deleteModalHandler} type='danger'>
                            Удалить
                          </Button>
                        </Space>
                      ]} 
                      onCancel={() => setIsModalVisible(false)}>
                      Ко всем заявкам со статусом "{deleteValues.name}" будет применен статус "{statuses[1]?.name}"
              </Modal>
            </div>
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