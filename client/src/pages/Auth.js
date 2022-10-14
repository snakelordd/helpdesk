import React, { useContext, useState,  } from "react";
import { Button, Card, Input, Avatar, Form, Space } from 'antd';
import "../styles/Auth.css";
import { UserOutlined, SettingOutlined} from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { HOME_ROUTE, CURRENT_ROUTE, TICKETS_ROUTE, PROFILE_ROUTE } from '../utils/consts';
import { Context } from "..";
import { registration, login, fetchOneUser } from "../http/userAPI";
import { observer } from "mobx-react-lite";


const Auth = () => {
    const navigate = useNavigate()


    const {user} = useContext(Context)
    const [formDisplay, setFormDisplay] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const sign = async () => {
        if (email && password) {
            try {
                let userData;
                if (formDisplay === 'login') {
                    userData = await login(email.toLowerCase(), password)
                }
                else {
                    userData = await registration(email, password)    
                }
                fetchOneUser(userData.id).then(data => {
                    user.setUser(data)
                    user.setIsAuth(true)
                    navigate(CURRENT_ROUTE)
                } )
                
            }
            catch (e) {
                console.log(e.response)
                alert('Неизвестная ошибка')

            }
        }
        else {
            alert('Введите email и пароль')
        }
    }

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
                                onChange={(e)=> setEmail(e.target.value)}
                            />

                            <Input.Password 
                                size="large" 
                                placeholder="Введите пароль" 
                                style={{marginTop: 15}}
                                onChange={(e) => setPassword(e.target.value)}
                                onPressEnter={sign}
                            />
                            <Button
                                block
                                type='primary'
                                style={{ marginTop: 10}}
                                onClick={sign}
                            >
                                Войти
                            </Button>

                    </Form>
                )
            case 'register':
                return(
                    <Form style={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '30px'}}>
                        <Form.Item rules={[{ required: true }]}>
                            <Input 
                                size="large" 
                                placeholder="Введите email" 
                                prefix={<UserOutlined />} 
                                style={{marginTop: 5}}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item  rules={[{ required: true }]}>
                            <Input.Password 
                                size="large" 
                                placeholder="Введите пароль" 
                                style={{marginTop: 15}}
                                onChange={(e) => setPassword(e.target.value)}
                                onPressEnter={sign}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button
                                block
                                type='primary'
                                style={{ marginTop: 10}}
                                onClick={sign}

                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                )
        }
    }
    
    return (
    <div className="authBack" style={{ backgroundImage: "url(/img/background.jpg)" }}>
        <div className="loginForm">
            <Card
              style={{ width: 400 }}
        
            >
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined/>} />}
                title={ 'Авторизация' }
                 description={
                        //  formDisplay === 'login' ?
                         <div>
                             <span>Функционал данного сервиса требует авторизацию. </span>
                             {/* <p>Войдите или пройдите 
                                 <a onClick={() => setFormDisplay('register') }> регистрацию</a>
                             </p> */}
                         </div>
                         
                        //  <div>
                        //      <span> <a onClick={() => setFormDisplay('login') }> Войдите,</a> если у вас уже есть аккаунт. </span>
                        //  </div>

                 }
              />
              { loginForm(formDisplay)}
            </Card>
        </div>
    </div>
    )
}

export default observer(Auth)