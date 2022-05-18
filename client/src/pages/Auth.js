import React, { useContext, useState,  } from "react";
import { Button, Card, Input, Avatar, Form } from 'antd';
import "../styles/Auth.css";
import { UserOutlined, SettingOutlined} from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { HOME_ROUTE, CURRENT_ROUTE } from '../utils/consts';
import { Context } from "..";

const Auth = () => {

    const navigate = useNavigate()

    const {user} = useContext(Context)
    const auth = () => {
        user.setIsAuth(true)
        navigate(CURRENT_ROUTE)
    }

    const [formDisplay, setFormDisplay] = useState('login')
    const loginForm = (formDisplay) => {
        switch(formDisplay) {
            case 'login':
                return(
                    <Form style={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '30px'}}>
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
                        {/* <div style={{display:"flex", justifyContent:'center'}}></div> */}
                        <Button
                            block
                            type='primary'
                            style={{ marginTop: 10}}
                            onClick={auth}
                        >
                            Войти
                        </Button>
                    </Form>
                )
            case 'register':
                return(
                    <Form style={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '30px'}}>
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
                        {/* <div style={{display:"flex", justifyContent:'center'}}></div> */}
                        <Button
                            block
                            type='primary'
                            style={{ marginTop: 10}}
                        >
                           <NavLink to={HOME_ROUTE}>Регистрация</NavLink>
                        </Button>
                    </Form>
                )
        }
    }
    
    return (
    <div className="loginForm">
        <Card
          style={{ width: 400 }}

        >
          <Card.Meta
            avatar={<Avatar icon={<UserOutlined/>} />}
            title={formDisplay === 'login' ? 'Авторизация' : 'Регистрация'}
            description={
                    formDisplay === 'login' ?
                    <div>
                        <span>Функционал данного сервиса требует авторизацию. </span>
                        <p>Войдите или пройдите 
                            <a onClick={() => setFormDisplay('register') }> регистрацию</a>
                        </p>
                    </div>
                    :
                    <div>
                        <span> <a onClick={() => setFormDisplay('login') }> Войдите,</a> если у вас уже есть аккаунт. </span>
                    </div>
                
            }
          />
          { loginForm(formDisplay)}
        </Card>
    </div>
    )
}

export default Auth