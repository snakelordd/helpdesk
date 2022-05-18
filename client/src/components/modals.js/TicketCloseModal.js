import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Input, Space, Select } from 'antd';
import { Context } from '../..';


const TicketCloseModal = ({show, onHide}) => {
  
  const {tickets, ticketProps} = useContext(Context)

  const handleOk = () => {
    console.log(tickets.selectedTicket)
  };

  return (

    <>
      <Modal title="Закрыть заявку" visible={show} onOk={handleOk} onCancel={onHide} centered width={800}>
        <h2>Заявка {tickets.selectedTicket ? tickets.selectedTicket.id : 0}</h2>
        <Form style={{display: 'flex',  marginTop: '20px'}}>  
            <Form.Item name={['ticket', 'status']} help='Выберите статус заявки' style={{width: '25%',}}>
                
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
            <Form.Item name={['ticket', 'comment']} help='Необязательно' style={{width: '76%', marginLeft: '1%'}}>
                <Input placeholder='Комментарий'/>
            </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default TicketCloseModal;