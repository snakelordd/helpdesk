import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Space, Form, Input, Select } from 'antd';
import { Context } from '../..';
import { getFormatDate, getStatusTag,  } from '../CommonFunctions';
import Chat from '../../components/Chat';
import { LineOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import SetCurrentModal from '../../components/modals.js/SetCurrentModal';
import TicketCloseModal from '../../components/modals.js/TicketCloseModal';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneTicket, updateTicket } from '../../http/ticketAPI';
import { fetchOneUser } from '../../http/userAPI';
import { fetchMessages } from '../../http/chatAPI';
import FormItem from 'antd/lib/form/FormItem';
import { fetchProps } from '../../http/ticketPropsAPI';
import { PROFILE_ROUTE } from '../../utils/consts';



const TicketPage = () => {
  const {Option} = Select
  
  const [ticket, setTicket] = useState()

  const {id} = useParams({})
  const [author, setAuthor] = useState()
  const [messages, setMessages] = useState()
  const [hiddenForm, setHiddenForm] = useState(true)
  const {tickets, ticketProps, user} = useContext(Context)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  const [categories, setCategories] = useState([])
  const [isOpenDropdown, setIsOpenDropdawn] = useState(false)
  
  const navigate = useNavigate()

  useEffect(()=> {
    fetchOneTicket(id).then(data => { 
      setTicket(data.ticket)
      fetchOneUser(data.ticket.userId).then( data2 => {setAuthor(data2)})
    })
    fetchProps('category').then( data => {
      setCategories(data.data)
      
    })
  }, [messages])

  const setCurrent = (ticket) => {
      tickets.setSelectedTicket(ticket)
      setIsModalVisible(true)
  }

  const ticketClose = (ticket) => {
    tickets.setSelectedTicket(ticket)

    setIsCloseModalVisible(true)
  }

  const setIsPriority = () => {
    const formData = new FormData

    formData.append('isPriority', !ticket.isPriority)

    updateTicket(ticket.id, formData).then( data => {
      fetchOneTicket(id).then( data=> {
        setTicket(data.ticket)
      })
      fetchMessages(ticket.id).then(data => {
        setMessages(data)
      })
    })
  }

  const updateCategory = values => {
    setHiddenForm(true)
    setIsOpenDropdawn(false)
    const formData = new FormData
    formData.append('categoryId', values)
    updateTicket(id, formData).then( data => {
      fetchOneTicket(id).then(data => { 
        setTicket(data.ticket)
      })
      }) 
    }

  const isVisiblePopup =() => {
    setHiddenForm(!hiddenForm)
    setIsOpenDropdawn(hiddenForm)
  }
  const onHide = () => {
    fetchMessages(ticket?.id).then( data => {
      setMessages(data)
      setIsCloseModalVisible(false)
    })
  }
  
  let width
  if (user.user.role === 'ADMIN') {
    width = '80%'
  } 
  else {
    width = '100%'
  }
  return (
      <div className="pageprops" >
           <div className='header pageWidth' style={{marginTop: '1%', height: '12%'}} >
              { ticket &&
                <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={ticket.title}
                subTitle={<Space size={10}>{ticket.isPriority && <ArrowUpOutlined style={{color: 'red'}}/>}<Tag color={ticket.status.tag}>{ticket.status.name}</Tag></Space> }
                
              >    
                {
                  author &&
                  <Descriptions size="small" column={3} >
                  <Descriptions.Item label="Создан"><a>{getFormatDate(ticket)}</a></Descriptions.Item>
                  <Descriptions.Item label="Категория" >
                    <Form name='categoryUpdate' style={{margin: 0}}>
                      {hiddenForm &&  <a onClick={isVisiblePopup }>{ticket.category.name}</a>}
                      <FormItem name='category' style={{width: '200px', height: '0px'}} hidden={hiddenForm} >
                        <Select size='small' 
                            autoFocus={true} 
                            value={ticket.category.name} 
                            placeholder={ticket.category.name} 
                            onSelect={updateCategory} 
                            open={isOpenDropdown}
                            onClick={() => setIsOpenDropdawn(!isOpenDropdown)}
                        >
                          {categories.map(item => {
                            return <Option value={item.id} key={item.id}>{item.name}</Option>
                          })}
                        </Select>
                      </FormItem>
                    </Form>
                    
                  </Descriptions.Item>
                   {author.hasOwnProperty('user_info') ?   
                   <Descriptions.Item label="Автор"><a onClick={() => navigate(PROFILE_ROUTE + `/${author.id}`)}>{
                      author.user_info ? author.user_info.name : author.email
                    }</a></Descriptions.Item>
                  :
                  <Descriptions.Item label="Автор"><a>{author.email}</a></Descriptions.Item>
                  } 
                </Descriptions>
                }
              </PageHeader>
              }
          </div>
            <div className='content pageWidth'  style={{display: 'flex', height:'85%'}}>
                <div style={{width: width, marginTop: '1%', backgroundColor: 'white'}}>
                <div>
                    <h3 style={{paddingTop: '15px', paddingLeft: '20px'}}>Активность</h3>
                    <Divider style={{marginTop: '-5px'}}/>
                </div>
                { (ticket && ticket.hasOwnProperty('id')) &&
                  <Chat author={author} ticketId={id} chatId={ticket.chatId} messages={messages} setMessages={setMessages}/>
                }
                </div >
                {user.user.role ==='ADMIN' &&
                <div style={{width: '20%', height: '50%', marginTop: '1%', marginLeft: '1%', backgroundColor: 'white', }}>
                  <div>
                    <h3 style={{paddingTop: '15px', paddingLeft: '20px'}}>Действия</h3>
                  <Divider style={{marginTop: '-5px'}}/>
                  </div>
                  <div style={{paddingLeft: '20px', paddingTop: '1%'}}>
                  { ticket &&
                    <Space direction='vertical' size={15}>  
                    
                      {
                        !ticket.isPriority ? 
                        <Space size={10}><ArrowUpOutlined  style={{color: 'red'}}/><a onClick={() => setIsPriority()}>Повысить приоритет</a></Space>
                        :
                        <Space><ArrowDownOutlined  style={{color: 'red'}}/><a onClick={() => setIsPriority()} >Понизить приоритет</a></Space>
                      }                  
                    <Space size={10}><UserOutlined/><a onClick={ () => setCurrent(ticket)}>Назначить исполнителя</a></Space>
                    <Space size={10}><CheckOutlined  style={{color: 'green'}}/><a onClick={() => ticketClose(ticket)}>Изменить статус заявки</a> </Space>
                  </Space> 
                  }    
                  </div>                                   
                </div>
                }
            </div> 
            <SetCurrentModal show={isModalVisible} onHide={ () => setIsModalVisible(false)} /> 
            <TicketCloseModal show={isCloseModalVisible} onHide={onHide} /> 
      </div>
    );
};

export default observer (TicketPage);