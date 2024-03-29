import React, { useContext, useEffect, useState } from 'react';
import '../styles/styles.css'
import { Table, Tag, Space, PageHeader, Divider, Input, DatePicker } from 'antd';
import { Context } from '..';
import { useNavigate, useParams } from 'react-router-dom';
import {HOME_ROUTE, TICKET_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getFormatDate, getStatusTag, getPriorityIcon } from './CommonFunctions';
import {locale} from '../utils/locale'
import SetCurrentModal from '../components/modals.js/SetCurrentModal';
import { fetchClosedTickets, fetchTickets } from '../http/ticketAPI';
import { fetchProps } from '../http/ticketPropsAPI';

const { Column, ColumnGroup } = Table;



const ClosedTickets = observer ( () => {

    const {type} = useParams()

    const { ticketProps} = useContext(Context)
    const [tickets, setTickets] = useState([])

    useEffect( () => {
            fetchClosedTickets().then( data => {
                console.log(data)
                setTickets(data.rows)})
        
        
        fetchProps('category').then( data => ticketProps.setCategories(data.data))
        fetchProps('status').then( data => ticketProps.setStatuses(data.data))
    }, [])


    const navigate = useNavigate()
    tickets.map(i => i['key'] = i.id)
    const { RangePicker } = DatePicker;

    const { Search } = Input;
    const onSearch = value => console.log(value);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const setCurrent = (ticket) => {
        tickets.setSelectedTicket(ticket)
        setIsModalVisible(true)
    }
    const setMyCurrent = (ticket) => {
        tickets.setSelectedTicket(ticket)
        
    }
    let obj
    return ( 

        <div className='pageprops'>
            <div className='pageWidth' style={{ marginTop: '1%'}}>
            
            <PageHeader
              ghost={false}
              onBack={() => navigate(HOME_ROUTE)}
              title="Открытые заявки"
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
                    dataSource={tickets} 
                    sortDirections= {['ascend', 'descend', 'ascend']} 
                    
                >
                    <Column 
                        title="Номер заявки" 
                        dataIndex="id" 
                        key="id" 
                        render={ (text, record) => (<a onClick={ ()=> navigate(TICKET_ROUTE + '/' + record.id)} >{text}</a>)}
                    />
                    <Column 
                        title="Тема заявки" 
                        dataIndex="title" 
                        key="title" 
                        render={ (text, record) => (<div style={{cursor: 'pointer'}} onClick={ ()=> navigate(TICKET_ROUTE + '/' + record.id)} >{text}</div>)}
                    />
                    <Column 
                        title="Категория" 
                        dataIndex={"category"} 
                        key="category" 
                        render={ (text, record) => <span>{record.category.name}</span>}
                        sorter = {(a, b) => a.category.id - b.category.id}
                    />
                    <Column 
                        title="Создан" 
                        key="createdAt" 
                        render = {(text, record) => getFormatDate(record) }
                        defaultSortOrder = 'descend'
                        sorter = { (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)}

                    />

                    <Column 
                        title="Статус" 
                        key="status" 
                        render={ (text, record) => <Tag color={  getStatusTag(obj.tickets = {record}, ticketProps)}>{text.status.name}</Tag>}
                            // getStatusTag(record)}
                        sorter = {(a, b) => a.status.id - b.status.id}
                    />

                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <Space size="middle">
                            <a onClick={ () => setMyCurrent(text)}>Ввести</a>
                            <a onClick={ () => setCurrent(text)}>Назначить</a>
                          
                        </Space>
                      )}
                    />
                    <Column 
                        title="Приоритет" 
                        // dataIndex="priority" 
                        key="priority" 
                        render ={ (record) => getPriorityIcon(record)}
                        sorter = {(a, b) => a.isPriority - b.isPriority}
                    />
                </Table>
                <SetCurrentModal show={isModalVisible} onHide={ () => setIsModalVisible(false)} />
            </div>
            </div>
            
        </div>    
    );
});
 
export default ClosedTickets;






