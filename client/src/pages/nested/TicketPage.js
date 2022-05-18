import React, { useContext, useState } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Space } from 'antd';
import { Context } from '../..';
import { getFormatDate, getStatusTag,  } from '../CommonFunctions';
import Chat from '../../components/Chat';
import { LineOutlined, ArrowUpOutlined, ArrowDownOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import SetCurrentModal from '../../components/modals.js/SetCurrentModal';
import TicketCloseModal from '../../components/modals.js/TicketCloseModal';



const TicketPage = () => {
    const {messages} = useContext(Context)

    const {tickets, ticketProps} = useContext(Context)

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

    const ticket = {
        id: 1, 
        title: 'ОБНОВИТЕ ПРОГРАММЫ ВОРД И ЭХЕЛЬ ', 
        createdAt: '2022-03-31 09:41:01+07', 
        userId: 1,        
        category: {
            id: '1',
            name: "ДРУГОЕ",
            },
        status:  {
            id: '1',
            name: "ОТКРЫТ",
        },
        isPriority: false
    }

    const fetchedMessages = [
      {
        id: 1,
        body: "Заявка создана",
        isLog: true,
        createdAt: "2022-03-31T02:41:01.016Z",
        updatedAt: "2022-03-31T02:41:01.016Z",
        userId: null,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 2,
        body: 'Уважаемые коллеги, в данный момент наблюдаются проблемы с подтверждением перемещений в МДЛП. Проблема находится в процессе решения. Просим проявить терпения. Прошу отправить мне письмо с проблемными перемещениями в формате: Получатель / Дата перемещения / Номер Документа / Отправитель'
        ,
        isLog: false,
        createdAt: "2022-03-31T02:41:01.021Z",
        updatedAt: "2022-03-31T02:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 3,
        body: 'Нужен картридж для принтера  HP LaserJet P1102'
        ,
        isLog: false,
        createdAt: "2022-03-31T15:41:01.021Z",
        updatedAt: "2022-04-20T15:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 4,
        body: 'Уважаемые коллеги, в данный момент наблюдаются проблемы с подтверждением перемещений в МДЛП. Проблема находится в процессе решения. Просим проявить терпения. Прошу отправить мне письмо с проблемными перемещениями в формате: Получатель / Дата перемещения / Номер Документа / Отправитель'
        ,
        isLog: false,
        createdAt: "2022-03-31T02:41:01.021Z",
        updatedAt: "2022-03-31T02:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 5,
        body: 'Нужен картридж для принтера  HP LaserJet P1102'
        ,
        isLog: false,
        createdAt: "2022-03-31T15:41:01.021Z",
        updatedAt: "2022-04-20T15:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 6,
        body: 'Нужен картридж для принтера  HP LaserJet P1102'
        ,
        isLog: false,
        createdAt: "2022-03-31T15:41:01.021Z",
        updatedAt: "2022-04-20T15:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 7,
        body: 'Нужен картридж для принтера  HP LaserJet P1102'
        ,
        isLog: false,
        createdAt: "2022-03-31T15:41:01.021Z",
        updatedAt: "2022-04-20T15:41:01.021Z",
        userId: 1,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
      {
        id: 8,
        body: "Заявка закрыта",
        isLog: true,
        createdAt: "2022-03-31T02:41:01.016Z",
        updatedAt: "2022-03-31T02:41:01.016Z",
        userId: null,
        chatId: 1,
        attachmentId: null,
        attachment: null
      },
    ]

    const author = {
      id: 1,
      email: "user2@mail.ru",
      role: "ADMIN",
      avatar: "staticAvatar.jpg",
      user_info: {
          name: "Аптека 1",
          address: "Сибиряков-Гвардейцев, 34",
          organization: null,
          department: "1"
      }
    }

    messages.setMessages(fetchedMessages)

    return (
        <div className="pageprops" >
            <div className='header pageWidth' style={{marginTop: '1%', height: '12%'}}>
                <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title={ticket.title}
                  subTitle={<Space size={10}>{ticket.isPriority && <ArrowUpOutlined style={{color: 'red'}}/>}<Tag color={getStatusTag(ticket, ticketProps)}>{ticket.status.name}</Tag></Space> }
                >    
                  <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Создан"><a>{getFormatDate(ticket)}</a></Descriptions.Item>
                    <Descriptions.Item label="Категория">
                      <a>{ticket.category.name}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Автор"><a>{author.user_info.name}</a></Descriptions.Item>
                  </Descriptions>
                </PageHeader>
            </div>
              <div className='content pageWidth'  style={{display: 'flex', height:'85%'}}>
                  <div style={{width: '80%', marginTop: '1%', backgroundColor: 'white'}}>
                  <div>
                      <h3 style={{paddingTop: '15px', paddingLeft: '20px'}}>Активность</h3>
                      <Divider style={{marginTop: '-5px'}}/>
                  </div>
                    <Chat author={author}/>
                  </div >
                  <div style={{width: '20%', height: '50%', marginTop: '1%', marginLeft: '1%', backgroundColor: 'white', }}>
                    <div>
                      <h3 style={{paddingTop: '15px', paddingLeft: '20px'}}>Действия</h3>
                    <Divider style={{marginTop: '-5px'}}/>
                    </div>
                    <div style={{paddingLeft: '20px', paddingTop: '1%'}}>
                    <Space direction='vertical' size={15}>  
                      
                        {
                          !ticket.isPriority ? 
                          <Space size={10}><ArrowUpOutlined  style={{color: 'red'}}/><a>Повысить приоритет</a></Space>
                          :
                          <Space><ArrowDownOutlined  style={{color: 'red'}}/><a>Понизить приоритет</a></Space>
                        }
                      
                      <Space size={10}><UserOutlined/><a onClick={ () => setCurrent(ticket)}>Назначить исполнителя</a></Space>
                      <Space size={10}><CheckOutlined  style={{color: 'green'}}/><a onClick={() => ticketClose(ticket)}>Закрыть заявку</a> </Space>
                      
                      
                    </Space>     
                    </div>                                   
                  </div>
              </div> 
              <SetCurrentModal show={isModalVisible} onHide={ () => setIsModalVisible(false)} /> 
              <TicketCloseModal show={isCloseModalVisible} onHide={ () => setIsCloseModalVisible(false)} /> 
        </div>
    );
};

export default TicketPage;