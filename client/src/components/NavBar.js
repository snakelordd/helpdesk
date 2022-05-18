import React, { useContext, useState } from 'react';
import { Context } from '..';
import { Drawer, Menu, Avatar } from "antd"; //importing compnents from ant library
import "../styles/Navbar.css"; //importing a css styling sheet
import { HeaderSearch } from "./HeaderSearch";
import {HomeOutlined, TagOutlined, FileSearchOutlined, PlusCircleOutlined, UserOutlined, TagsOutlined, LockOutlined, SettingOutlined} from '@ant-design/icons'
import {observer} from 'mobx-react-lite'
import { useNavigate, Link, } from 'react-router-dom';
import {CURRENT_ROUTE, CLOSED_ROUTE, CREATE_ROUTE, HOME_ROUTE, MANUAL_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, TICKETS_ROUTE } from '../utils/consts';

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
        >
            <div className="Navbar">
                    {user.isAuth ? 
                        <Menu mode='horizontal' style={{height: 'inherit', paddingTop: '10px', paddingBottom: '5px'}} >
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
                        <Menu mode='horizontal'  style={{height: 'inherit', paddingTop: '10px', paddingBottom: '5px'}}>
                            <Menu.Item key="instructions" icon={<FileSearchOutlined />} onClick={()=> navigate(MANUAL_ROUTE)} >
                                Инструкции
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
                <Menu mode="vertical" selectable={false}>
                    <Menu.ItemGroup title='Мои заявки'>
                        <Menu.Item key='current' icon={<TagOutlined />} onClick={drawerClosed}>
                            <Link to={CURRENT_ROUTE}>Мои заявки</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                        { user.user.role === 'ADMIN' && 
                        <Menu.ItemGroup title='Все заявки'>
                            <Menu.Item key='open' icon={<TagsOutlined />} onClick={drawerClosed}>
                                <Link to={TICKETS_ROUTE}>Открытые заявки</Link>
                            </Menu.Item>

                            <Menu.Item key='closed' icon={<LockOutlined />} onClick={drawerClosed}>
                                <Link to={TICKETS_ROUTE}>Закрытые заявки</Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        }
                    
                    <Menu.ItemGroup title='Настройки' >
                        <Menu.Item key='profile' icon={<UserOutlined/>} onClick={drawerClosed}>
                            <Link to={PROFILE_ROUTE}>Мой профиль</Link> 
                        </Menu.Item>
                        { user.user.role === 'ADMIN' &&
                        <Menu.Item key='settings' icon={<SettingOutlined />} onClick={drawerClosed}>
                            <Link to={SETTINGS_ROUTE}>Настройки</Link> 
                        </Menu.Item>
                        }
                    </Menu.ItemGroup>
                </Menu>
            </Drawer>       
        </nav>
    );
});

export default NavBar;
