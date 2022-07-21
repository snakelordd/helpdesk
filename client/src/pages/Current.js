import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css'
import { Table, Tag, Space, PageHeader, Divider, Input, DatePicker } from 'antd';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import {HOME_ROUTE, TICKETS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getFormatDate, getStatusTag, getPriorityIcon } from './CommonFunctions';
import {locale} from '../utils/locale'
import SetCurrentModal from '../components/modals.js/SetCurrentModal';
import { fetchTickets } from '../http/ticketAPI';
import { fetchProps } from '../http/ticketPropsAPI';
import { fetchCurrent } from '../http/currentAPI';


const { Column, ColumnGroup } = Table;


const Current = () => {
    const {tickets, ticketProps, user} = useContext(Context)
    const [myCurrent, setMyCurrent] = useState()


    useEffect( () => {
        fetchTickets().then( data => {
            console.log(data)
            tickets.setTickets(data.rows)})
    
    
    fetchProps('category').then( data => ticketProps.setCategories(data.data))
    fetchProps('status').then( data => ticketProps.setStatuses(data.data))
    }, [])

    const navigate = useNavigate()
    tickets.tickets.map(i => i['key'] = i.id)
    const { RangePicker } = DatePicker;

    const { Search } = Input;
    const onSearch = value => console.log(value);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const setCurrent = (ticket) => {
        tickets.setSelectedTicket(ticket)
        setIsModalVisible(true)
    }


    return ( 

        <div className='pageprops'>
            <div className='pageWidth' style={{ marginTop: '1%'}}>
            
            <PageHeader
              ghost={false}
              onBack={() => navigate(HOME_ROUTE)}
              title="Мои заявки"
              extra={[
                <Space size={12}>
                
                    <Search placeholder="Поиск" allowClear onSearch={onSearch} style={{ width: 200 }} />
                    <RangePicker allowClear locale={locale} onChange={() => console.log('selected date')}/>
                </Space>
              ]}
            >

            </PageHeader>
            <div className='pageWidth' style={{ marginTop: '1%', }}>
                <Table 
                    dataSource={tickets.tickets} 
                    sortDirections= {['ascend', 'descend', 'ascend']} 
                    
                >
                    <Column 
                        title="Номер заявки" 
                        dataIndex="id" 
                        render={ (text, record) => (<a onClick={ ()=> navigate(TICKETS_ROUTE + '/' + record.id)} >{text}</a>)}
                    />
                    <Column 
                        title="Тема заявки" 
                        dataIndex="title" 
                        render={ (text, record) => (<div style={{cursor: 'pointer'}} onClick={ ()=> navigate(TICKETS_ROUTE + '/' + record.id)} >{text}</div>)}
                    />
                    <Column 
                        title="Категория" 
                        dataIndex={"category"} 
                        render={ (text, record) => <span>{record.category?.name}</span>}
                        sorter = {(a, b) => a.category.id - b.category.id}
                    />
                    <Column 
                        title="Создан" 
                        render = {(text, record) => getFormatDate(record) }
                        defaultSortOrder = 'descend'
                        sorter = { (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)}

                    />

                    <Column 
                        title="Статус" 
                        render={ (text, record) => <Tag color={getStatusTag(record, ticketProps)}>{text.status.name}</Tag>}
                            // getStatusTag(record)}
                        sorter = {(a, b) => a.status.id - b.status.id}
                    />

                    {/* <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <Space size="middle">
                            <a onClick={ () => setCurrent(text)}>Назначить</a>
                          
                        </Space>
                      )}
                    /> */}
                    <Column 
                        title="Приоритет" 
                        // dataIndex="priority" 
                        render ={ (record) => getPriorityIcon(record)}
                        sorter = {(a, b) => a.isPriority - b.isPriority}
                    />
                </Table>
                <SetCurrentModal show={isModalVisible} onHide={ () => setIsModalVisible(false)} />
            </div>
            </div>
            
        </div>    
    );
};

export default observer (Current);