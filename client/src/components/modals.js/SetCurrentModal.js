import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Input, Space, Select } from 'antd';
import { Context } from '../..';


const SetCurrentModal = ({show, onHide}) => {
  
  const {tickets} = useContext(Context)
  const fetchedAdmins = [
    {
        id: 1,
        email: "user@mail.ru",
        role: "ADMIN",
        avatar: "staticAvatar.jpg",
        user_info: {
            name: "First",
            address: "adress",
            organization: "tinner",
            department: "1"
        }
    }
  ]
  const handleOk = () => {
    console.log(tickets.selectedTicket)
  };

  return (

    <>
      <Modal title="Назначить исполнителя" visible={show} onOk={handleOk} onCancel={onHide} centered width={800}>
        <h2>Заявка {tickets.selectedTicket ? tickets.selectedTicket.id : 0}</h2>
        <Form style={{display: 'flex',  marginTop: '20px'}}>  
            <Form.Item name={['setCurrent', 'user']} help='Выберите пользоваетля' style={{width: '25%',}}>
                
                    <Select
                        
                        showSearch
                        allowClear = 'true'
                        placeholder="Пользователь"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                    { fetchedAdmins.map((item) => 
                        <Select.Option value={item.id} key={item.id}>{item.user_info.name}</Select.Option>
                    )}
                    </Select>  
                    
                    
                
                
            </Form.Item>
            <Form.Item name={['setCurrent', 'comment']} help='Необязательно' style={{width: '76%', marginLeft: '1%'}}>
                <Input placeholder='Комментарий'/>
            </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default SetCurrentModal;