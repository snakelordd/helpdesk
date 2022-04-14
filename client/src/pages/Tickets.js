import React, { useContext } from 'react';
import { Table, Tag, Space, PageHeader, Divider } from 'antd';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import {HOME_ROUTE, TICKETS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const { Column, ColumnGroup } = Table;


const Tickets = observer ( () => {
    const {tickets} = useContext(Context)
    const navigate = useNavigate()
    
    return ( 

        <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '70vw'}}>
            
            <PageHeader
              className="site-page-header"
              onBack={() => navigate(HOME_ROUTE)}
              title="Открытые заявки"
            />
             <Table dataSource={tickets.tickets} >
                <Column 
                    title="Номер заявки" 
                    dataIndex="id" 
                    key="id" 
                    render={ (text, record) => (<a onClick={ ()=> navigate(TICKETS_ROUTE + '/' + record.id)} >{text}</a>)}
                />
                <Column 
                    title="Тема заявки" 
                    dataIndex="title" 
                    key="title" 
                    render={ (text, record) => (<div style={{cursor: 'pointer'}} onClick={ ()=> navigate(TICKETS_ROUTE + '/' + record.id)} >{text}</div>)}
                />
                <Column title="Категория" dataIndex="category" key="category" />
                <Column title="Создан" dataIndex="createdAt" key="createdAt" />
                <Column title="Приоритет" dataIndex="priority" key="priority" />
                <Column title="Статус" dataIndex="status" key="status" />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Space size="middle">
                      <a>Invite {record.id}</a>
                      <a>Delete</a>
                    </Space>
                  )}
                />
            </Table>
            </div>
        </div>    
    );
});
 
export default Tickets;






