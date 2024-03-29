import { Button, Col, Menu, Modal, Row, Select, Space } from 'antd';
import {UserOutlined, LockOutlined, ToolOutlined  } from '@ant-design/icons';
import React, { useState } from 'react';
import UserInfo from './UserSettings/UserInfo';
import SecurityAndRoles from './UserSettings/SecurityAndRoles';
import ProfileManagment from './UserSettings/ProfileManagment';
  

const UserSettings = ({show, onHide, user, isUpdate}) => {
  const [menuItem, setMenuItem] = useState('userInfo');

  return (
        <Modal
            visible={show}  
            onCancel={onHide} 
            centered 
            width={1000} 
            footer={[
            <Button onClick={onHide} key={Math.random()}>
                Закрыть
            </Button>, 
            ]} 
            
        > 
            <Menu
                defaultSelectedKeys={['userInfo']}
                mode="horizontal"
            >
                <Menu.Item key='userInfo' icon={<UserOutlined />} onClick={() => setMenuItem('userInfo')}> Персональное </Menu.Item>
                <Menu.Item key='userSecurity' icon={<LockOutlined />} onClick={() => setMenuItem('userSecurity')}> Безопасность и роли </Menu.Item>
                <Menu.Item key='profileManagment' icon={<ToolOutlined />} onClick={() => setMenuItem('profileManagment')} >Управление профилем</Menu.Item>
            </Menu>
            <Row justify="center" style={{marginTop: '2%'}}>
                <Col span={22}>
                    {menuItem === 'userInfo' && <UserInfo user={user} isUpdate={isUpdate}/>}
                    {menuItem === 'userSecurity' &&<SecurityAndRoles user={user}/>}
                    {menuItem === 'profileManagment' && <ProfileManagment  userProfile={user} onHide={onHide}/>}
                </Col>
            </Row>            
        </Modal>
  );
};

export default UserSettings;