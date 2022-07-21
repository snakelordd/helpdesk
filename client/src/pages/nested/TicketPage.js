import React, { useContext, useEffect, useState } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Space } from 'antd';
import { Context } from '../..';
import { getFormatDate, getStatusTag,  } from '../CommonFunctions';
import Chat from '../../components/Chat';
import { LineOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import SetCurrentModal from '../../components/modals.js/SetCurrentModal';
import TicketCloseModal from '../../components/modals.js/TicketCloseModal';
import { useParams } from 'react-router-dom';
import { fetchOneTicket } from '../../http/ticketAPI';
import { fetchOneUser } from '../../http/userAPI';
import { fetchMessages } from '../../http/chatAPI';


const TicketPage = () => {

  const [ticket, setTicket] = useState()
  const {id} = useParams({})
  const [author, setAuthor] = useState()
  const [messages, setMessages] = useState()

  console.log(ticket)
  useEffect(()=> {
    fetchOneTicket(id).then(data => { 
      setTicket(data.ticket)
      fetchOneUser(data.ticket.userId).then( data2 => {setAuthor(data2)})
    })
  }, [])

  const {tickets, ticketProps, user} = useContext(Context)
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  
  const setCurrent = (ticket) => {
      tickets.setSelectedTicket(ticket)
      setIsModalVisible(true)
  }

  const ticketClose = (ticket) => {
    tickets.setSelectedTicket(ticket)

    setIsCloseModalVisible(true)
  }

  const setIsPriority = () => {

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
           <div className='header pageWidth' style={{marginTop: '1%', height: '12%'}}>
              { ticket &&
                <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={ticket.title}
                subTitle={<Space size={10}>{ticket.isPriority && <ArrowUpOutlined style={{color: 'red'}}/>}<Tag color={ticket.status.tag}>{ticket.status.name}</Tag></Space> }
              >    
                {
                  author &&
                  <Descriptions size="small" column={3}>
                  <Descriptions.Item label="Создан"><a>{getFormatDate(ticket)}</a></Descriptions.Item>
                  <Descriptions.Item label="Категория">
                    <a>{ticket.category.name}</a>
                  </Descriptions.Item>
                   {author.hasOwnProperty('user_info') ?   
                   <Descriptions.Item label="Автор"><a>{
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
                        <Space><ArrowDownOutlined  style={{color: 'red'}}/><a>Понизить приоритет</a></Space>
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