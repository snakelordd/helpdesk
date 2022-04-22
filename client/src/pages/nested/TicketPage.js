import React, { useContext } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider } from 'antd';
import { Context } from '../..';
import { getFormatDate, getStatusTag,  } from '../CommonFunctions';
import Chat from '../../components/Chat';



const TicketPage = () => {
    const {tickets, ticketProps} = useContext(Context)

    const ticket = {
        id: 1, 
        title: 'ОБНОВИТЕ ПРОГРАММЫ ВОРД И ЭХЕЛЬ ', 
        createdAt: '2022-03-31 09:41:01+07', 
        category: {
            id: '1',
            name: "ДРУГОЕ",
            },
        status:  {
            id: '1',
            name: "ОТКРЫТ",
        },
        priority: {
            id: '2',
            name: "СРЕДНИЙ",
        },
    }

    const messages = [
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


    return (
        <div className="pageprops" >
            <div className='header' style={{width: '70vw', marginTop: '1%', height: '12%'}}>
                <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title={ticket.title}
                  subTitle={ <Tag color={getStatusTag(ticket, ticketProps)}>{ticket.status.name}</Tag>}
                  extra={[
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">
                      Primary
                    </Button>,
                  ]}
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
              <div className='content' style={{display: 'flex', width: '70vw', height:'85%'}}>
                  <div style={{width: '75%', marginTop: '1%', backgroundColor: 'white'}}>
                  <div>
                      <h3 style={{paddingTop: '1%', paddingLeft: '2%'}}>Активность</h3>
                      
                      <Divider style={{marginTop: '-5px'}}/>
                    </div>
                    <Chat messages={messages} author={author}/>
                  </div >
                  <div style={{width: '25%', height: '400px', marginTop: '1%', marginLeft: '1%', backgroundColor: 'white'}}>

                  </div>
              </div>  
        </div>
    );
};

export default TicketPage;