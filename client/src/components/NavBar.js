import React, { useContext, useState } from 'react';
import { Context } from '..';
import { Drawer, Menu, Avatar } from "antd"; //importing compnents from ant library
import "../styles/Navbar.css"; //importing a css styling sheet
import { HeaderSearch } from "./HeaderSearch";
import {HomeOutlined, FileSearchOutlined, PlusCircleOutlined, UserOutlined, TagsOutlined, LockOutlined, SettingOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react-lite'
import { useNavigate, Link, } from 'react-router-dom';
import { CLOSED_ROUTE, CREATE_ROUTE, HOME_ROUTE, MANUAL_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, TICKETS_ROUTE } from '../utils/consts';

const NavBar = observer ( () => {
    
    const {user} = useContext(Context)
    // console.log(user.isAuth)
    
    const navigate = useNavigate()

    const [shown, setShown] = useState(false);
    const showSidebar = () => {
      setShown(true);
    };

    const drawerClosed = () => {
        setShown(false);
     };
    
    return (
        <nav
            className="menu"
            style={
                { 
                    position: "static", 
                    zIndex: 5, 
                    width: "100%",
                 }
                }
        >
            <div className="Navbar">
                    {user.isAuth ? 
                        <Menu mode='horizontal' style={{height: 'inherit', paddingTop: '20px'}} >
                            <Menu.Item key="home" icon={<HomeOutlined/>} onClick={()=> navigate(HOME_ROUTE)} >
                                Главная
                            </Menu.Item>
                            <Menu.Item key="instructions" icon={<FileSearchOutlined />} onClick={()=> navigate(MANUAL_ROUTE)}>
                                Инструкции
                            </Menu.Item>
                            <Menu.Item key="newticket" icon={<PlusCircleOutlined /> } onClick={()=> navigate(CREATE_ROUTE)}>
                                Создать заявку
                            </Menu.Item>
                            <Menu.Item key='search' className='rightMenu'>
                                <HeaderSearch/>
                            </Menu.Item> 
                            <Menu.Item key="user" icon={<Avatar icon={<UserOutlined />} />} onClick={showSidebar}>
                                { user.user.userInfo.name }
                            </Menu.Item>
                        </Menu>
                        :
                        <Menu mode='horizontal'  >
                            <Menu.Item key="instructions" icon={<FileSearchOutlined />} onClick={()=> navigate(MANUAL_ROUTE)} >
                                Инструкции
                            </Menu.Item>
                            <Menu.Item key='signup' className='rightMenu' onClick={()=> navigate(REGISTRATION_ROUTE)}>
                                Регистрация
                            </Menu.Item>
                            <Menu.Item key='signin' onClick={ () => user.setIsAuth(true)}>
                                Войти
                            </Menu.Item>
                        </Menu>                    
                    }
            </div>
            <Drawer
            title={user.user.userInfo.name}
                placement="right"
                className="menu-drawer"
                closable={false}
                onClose={drawerClosed}
                visible={shown}
            > 
                <Menu mode="vertical">
                    <Menu.ItemGroup title='Мои заявки'>
                        <Menu.Item key='open' icon={<TagsOutlined />} onClick={drawerClosed}>
                            <Link to={TICKETS_ROUTE}>Открытые заявки</Link>
                        </Menu.Item>
                        <Menu.Item key='closed' icon={<LockOutlined />} onClick={drawerClosed}>
                            <Link to={TICKETS_ROUTE}>Закрытые заявки</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title='Настройки' >
                        <Menu.Item key='profile' icon={<SettingOutlined />} onClick={drawerClosed}>
                            <Link to={SETTINGS_ROUTE}>Мой профиль</Link> 
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </Drawer>       
        </nav>
    );
});

export default NavBar;