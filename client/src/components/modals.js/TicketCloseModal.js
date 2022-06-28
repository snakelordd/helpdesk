import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Input, Space, Select } from 'antd';
import { Context } from '../..';
import { updateTicket } from '../../http/ticketAPI';


const TicketCloseModal = ({show, onHide}) => {
  const {user} = useContext(Context)

  const {tickets, ticketProps} = useContext(Context)

  const handleOk = () => {
    console.log(tickets.selectedTicket)
    updateTicket()
  };

  const updateHandler = values => {
    const formData = new FormData()
    formData.append('statusId', values.status)
    formData.append('message', values.body)
    formData.append('userId', user.user.id)
    
    // values.body && formData.append('body', values.body)
    updateTicket(tickets.selectedTicket.id, formData)
    console.log(values)
  }
  return (

    <>
      <Modal title="Закрыть заявку" visible={show}  onCancel={onHide} centered width={800} footer={[
        <Button form="close" type='primary' key="submit" htmlType="submit" >
            Применить
        </Button>
        ]}>
        <h2>Заявка {tickets.selectedTicket ? tickets.selectedTicket.id : 0}</h2>
        <Form id='close' onFinish={updateHandler} style={{display: 'flex',  marginTop: '20px' }}>  
            <Form.Item name={'status'} help='Выберите статус заявки' style={{width: '25%',}}>
                
                    <Select
                        
                        showSearch
                        allowClear = 'true'
                        placeholder="Статус"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                    { ticketProps.statuses.map((item) => 
                        <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                    )}
                    </Select>  
                    
                    
                
                
            </Form.Item>
            <Form.Item name={ 'body'} help='Необязательно' style={{width: '76%', marginLeft: '1%'}}>
                <Input placeholder='Комментарий'/>
            </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default TicketCloseModal;