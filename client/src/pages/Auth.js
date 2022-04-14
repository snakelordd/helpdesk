import React from "react";
import { Button, Card, Input } from 'antd';
import "../styles/Auth.css";
import { UserOutlined} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from '../utils/consts';

const Auth = () => {

    return (
    <div className="loginForm">
        <Card  bordered={false} style={{ width: 600 }}>
            <p style={{textAlign: 'center'}}>Для того, чтобы авторизоваться необходимо ввести  логин и пароль</p>
            
            <Input 
                size="large" 
                placeholder="Введите email" 
                prefix={<UserOutlined />} 
                style={{marginTop: 5}}
            />
            <Input.Password 
                size="large" 
                placeholder="Введите пароль" 
                style={{marginTop: 15}}
            />
            <div style={{display:"flex", justifyContent:'center'}}>
            <Button
                block
                type='primary'
                style={{ marginTop: 10}}
            >
               <NavLink to={HOME_ROUTE}>Войти</NavLink>
            </Button>
            </div>
        </Card>
    </div>
    )
}

export default Auth