import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css'
import { Table, Tag, Space, PageHeader, Input, DatePicker } from 'antd';
import { Context } from '..';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {HOME_ROUTE, TICKET_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getFormatDate, getPriorityIcon } from './CommonFunctions';
import {locale} from '../utils/locale'
import SetCurrentModal from '../components/modals.js/SetCurrentModal';
import { fetchClosedTickets, fetchTickets } from '../http/ticketAPI';
import { fetchProps } from '../http/ticketPropsAPI';

const { Column} = Table;
const { RangePicker } = DatePicker;
const { Search } = Input;

const Tickets = observer ( () => {
    const {tickets, ticketProps} = useContext(Context)
    
    const [allTickets, setAllTickets] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dateInterval, setDateInterval] = useState('')
    const [updater, setUpdater] = useState('')
    const [title, setTitle] = useState('')
    let paramsOption = searchParams.get('option')

    useEffect( () => {
        fetchTickets(true).then( data => tickets.setTickets(data.rows))
        fetchProps('category').then( data => ticketProps.setCategories(data.data))
        fetchProps('status').then( data => ticketProps.setStatuses(data.data))
    }, [])

    useEffect( () => {
        (searchParams.get('option') === 'open') &&
        fetchTickets().then( data => {
            setTitle('Открытые заявки')
            setAllTickets(data.rows)
        })
        searchParams.get('option') === 'closed' &&
        fetchClosedTickets().then( data => {
            setTitle('Закрытые заявки')
            setAllTickets(data.rows)})
    }, [paramsOption, updater])

    
    tickets.tickets.map(i => i['key'] = i.id)

    const onSearch = value => {

        let foundTickets = []
        const ticketsList = tickets.tickets

        if(!value) {
            fetchTickets().then( data => setAllTickets(data.rows))
        }

        foundTickets = (ticketsList.filter( ticket => {
        return (
            ticket.id.toString().toLowerCase().includes(value) ||
            ticket.category.name.toLowerCase().includes(value) ||
            ticket.status.name.toLowerCase().includes(value) ||
            ticket.title.toLowerCase().includes(value) ||
            ticket.user.email.toLowerCase().includes(value) ||
            ticket.title.toLowerCase().includes(value)
          )
        }))
        setAllTickets(foundTickets)
        foundTickets=[]
    };
    
    const setCurrent = (ticket) => {
        tickets.setSelectedTicket(ticket)
        setIsModalVisible(true)
    }
    const setMyCurrent = (ticket) => {
        tickets.setSelectedTicket(ticket)
    }

    const onHide = () => {
        setIsModalVisible(false)
    }

    const intervalTickets = (date, dateString) => {
        if (!date) {
            setDateInterval('')
            setUpdater(!updater)
            return
        }
        setDateInterval(date)
        fetchTickets(false, dateString[0], dateString[1]).then(data => setAllTickets(data))

      };

    return ( 
        <div className='pageprops'>
            <div className='pageWidth ' style={{ marginTop: '1%'}}>
            
            <PageHeader  
                key='pageHeader'
              ghost={false}
              onBack={() => navigate(HOME_ROUTE)}
              title={title}
              extra={[
                <Space size={12} key='header'>
                
                    <Search  placeholder="Поиск" allowClear onChange={(e) => onSearch(e.target.value)} onSearch={onSearch} style={{ width: 200 }} />
                    <RangePicker key={Math.random()} allowClear locale={locale} format='DD-MM-YYYY' onChange={intervalTickets} defaultValue={dateInterval}/>
                </Space>
              ]}
            >

            </PageHeader>
            <div className='pageWidth ' style={{ marginTop: '1%'}}>
                <Table
                    dataSource={allTickets} 
                    sortDirections= {['ascend', 'descend', 'ascend']} 
                    key={Math.random()}
                >
                    <Column 
                        title="Номер заявки" 
                        dataIndex="id" 
                        key={Math.random()}
                        render={ (text, record) => (<a onClick={ ()=> navigate(TICKET_ROUTE + '/' + record.id)} key={record.id}>{text}</a>)}
                        width={30}
                    />
                    <Column
                      title="Автор"
                      width={150}
                      key={Math.random()}
                      render={(text, record) => (
                        // <Space size="middle">
                        //     <a onClick={ () => setMyCurrent(text)}>Ввести</a>
                        //     <a onClick={ () => setCurrent(text)}>Назначить</a>
                        
                        // </Space>
                        <a >{text?.user?.email}</a>
                      )}
                    />
                    <Column 
                        title="Тема заявки" 
                        dataIndex="title" 
                        key={Math.random()}
                        render={ (text, record) => (<div style={{cursor: 'pointer'}} onClick={ ()=> navigate(TICKET_ROUTE + '/' + record.id)} >{text}</div>)}
                    />
                    <Column 
                        title="Категория" 
                        dataIndex={"category"} 
                        key={Math.random()}
                        render={ (text, record) => <span>{record.category?.name}</span>}
                        sorter = {(a, b) => a.category?.id - b.category?.id}
                        
                    />
                    <Column 
                        title="Создан" 
                        key={Math.random()}
                        render = {(text, record) => getFormatDate(record) }
                        defaultSortOrder = 'descend'
                        sorter = { (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)}
                        width={150}
                    />

                    <Column 
                        title="Статус" 
                        render={ (text, record) => <Tag key={Math.random()} color={text.status.tag}>{text.status.name}</Tag>}
                        sorter = {(a, b) => a.status.id - b.status.id}
                        width={100}
                        key={Math.random()}
                    />
                    <Column 
                        title="Приоритет" 
                        // dataIndex="priority"
                        render ={ (record) => getPriorityIcon(record)}
                        sorter = {(a, b) => a.isPriority - b.isPriority}
                        width={20}
                        key={Math.random()}
                    />
                    <Column
                      title="Действия"
                      key={Math.random()}
                      render={(text, record) => (
                         <Space size="middle" key={Math.random()}>
                             <a onClick={ () => setMyCurrent(text)}>Ввести</a>
                             <a onClick={ () => setCurrent(text)}>Назначить</a>
                                            
                         </Space>

                      )}
                    />
                </Table>
                <SetCurrentModal show={isModalVisible} onHide={onHide} />
            </div>
            </div>
            
        </div>    
    );
});
 
export default Tickets;






