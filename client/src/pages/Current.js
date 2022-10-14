import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css'
import { Table, Tag, Space, PageHeader, Input} from 'antd';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import {HOME_ROUTE, TICKETS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getFormatDate, getPriorityIcon } from './CommonFunctions';
import { fetchProps } from '../http/ticketPropsAPI';
import { fetchCurrent } from '../http/currentAPI';


const { Column} = Table;
const { Search } = Input;

const Current = () => {

    const {tickets, ticketProps, user} = useContext(Context)
    const [myCurrent, setMyCurrent] = useState()
    const [updater, setUpdater] = useState(false)

    useEffect( () => {
        try {
        fetchCurrent(user.user.id).then( data => {
            setMyCurrent(data) 
        })
        }
        catch (e) {
            console.log('error')
        }
    
    fetchProps('category').then( data => ticketProps.setCategories(data.data))
    fetchProps('status').then( data => ticketProps.setStatuses(data.data))
    }, [updater])

    const navigate = useNavigate()

    tickets.tickets.map(i => i['key'] = i.id)

    const onSearch = value => {
        console.log(myCurrent)
        let foundTickets = []
        const ticketsList = myCurrent

        if(!value) {
            setUpdater(!updater)
        }

        foundTickets = (ticketsList.filter( ticket => {
        return (
            ticket.ticket.id.toString().toLowerCase().includes(value) ||
            ticket.ticket.category.name.toLowerCase().includes(value) ||
            ticket.ticket.status.name.toLowerCase().includes(value) ||
            ticket.ticket.title.toLowerCase().includes(value) ||
            ticket.ticket.user.email.toLowerCase().includes(value) ||
            ticket.ticket.title.toLowerCase().includes(value)
          )
        }))
        setMyCurrent(foundTickets)
        foundTickets=[]
    };
    
    return ( 
        <div className='pageprops'>
            <div className='pageWidth' style={{ marginTop: '1%'}}>
            
            <PageHeader
              ghost={false}
              onBack={() => navigate(HOME_ROUTE)}
              title="Мои заявки"
              extra={[
                <Space size={12}>
                    <Search placeholder="Поиск" allowClear onChange={e => onSearch(e.target.value)} onSearch={onSearch} style={{ width: 200 }} />
                </Space>
              ]}
            >

            </PageHeader>
            <div className='pageWidth' style={{ marginTop: '1%', }}>
                <Table 
                    dataSource={myCurrent} 
                    sortDirections= {['ascend', 'descend', 'ascend']} 
                    loading={
                        myCurrent ? false : true
                    }
                >
                    <Column 
                        title="Номер заявки" 
                        dataIndex="id" 
                        render={ (text, record) => (<a onClick={ ()=> { navigate(TICKETS_ROUTE + '/' + record.ticket.id)}} >{record.ticket.id}</a>)}
                    />
                    <Column 
                        title="Тема заявки" 
                        dataIndex="title" 
                        render={ (text, record) => (<div style={{cursor: 'pointer'}} onClick={ ()=> navigate(TICKETS_ROUTE + '/' + record.ticket.id)} >{record.ticket.title}</div>)}
                    />
                    <Column 
                        title="Категория" 
                        dataIndex={"category"} 
                        render={ (text, record) => <span>{record.ticket.category?.name}</span>}
                        sorter = {(a, b) => a.ticket.category.id - b.ticket.category.id}
                    />
                    <Column 
                        title="Создан" 
                        render = {(text, record) => getFormatDate(record.ticket) }
                        defaultSortOrder = 'descend'
                        sorter = { (a, b) => Date.parse(a.ticket.createdAt) - Date.parse(b.ticket.createdAt)}

                    />

                    <Column 
                        title="Статус" 
                        render={ (text, record) => <Tag color={record.ticket.status.tag}>{text.ticket.status.name}</Tag>}
                        sorter = {(a, b) => a.ticket.status.id - b.ticket.status.id}
                    />
                    <Column 
                        title="Приоритет" 
                        render ={ (record) => getPriorityIcon(record.ticket)}
                        sorter = {(a, b) => a.ticket.isPriority - b.isPriority}
                    />
                </Table>
            </div>
            </div>
            
        </div>    
    );
};

export default observer (Current);