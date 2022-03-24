import React, { useState } from "react"; //useState helps us manage our app state
import { Drawer, Button, Menu, Avatar } from "antd"; //importing compnents from ant library
import { AlignRightOutlined } from "@ant-design/icons"; //importing ant design icons
import "../styles/Navbar.css"; //importing a css styling sheet
import { HeaderSearch } from "./HeaderSearch";
import {HomeOutlined, FileSearchOutlined, PlusCircleOutlined, UserOutlined, TagsOutlined, LockOutlined, SettingOutlined} from '@ant-design/icons'


function NavBar() {

  const [shown, setShown] = useState(false);
  const user = 'User'
  const showSidebar = () => {
    setShown(true);
  };

  const drawerClosed = () => {
    setShown(false);
  };

function LeftMenu({mode}) {
    
  return (
    <Menu mode={mode}  >
        <Menu.Item key="home" icon={<HomeOutlined/>} >
            Главная
        </Menu.Item>
        <Menu.Item key="instructions" icon={<FileSearchOutlined />}>
          Инструкции
        </Menu.Item>
        <Menu.Item key="newticket" icon={<PlusCircleOutlined /> }>
          Создать заявку
        </Menu.Item>
  </Menu>
  )
}

function RightMenu({mode}) {
    
    const isAuth = true;
 return (
      <Menu mode={mode}>
        <Menu.Item key='search'>
            <HeaderSearch/>
          </Menu.Item>
        { isAuth ? 
        <Menu.Item key="user" icon={<Avatar icon={<UserOutlined />} />} onClick={showSidebar}>
           {user}
        </Menu.Item>
        :
        <Menu.Item key="signin">
          <a href="/login">Войти</a>
        </Menu.Item>
        }
        
      </Menu>
    )
}
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
        <div className="left-menu">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="right-menu">       
          <RightMenu mode="horizontal" />
        </div>
        <Drawer
          title={user}
          placement="right"
          className="menu-drawer"
          closable={false}
          onClose={drawerClosed}
          visible={shown}
        > 
          <Menu mode="vertical">
             <Menu.ItemGroup title='Мои заявки'>
              <Menu.Item icon={<TagsOutlined />}>
              <a href=''> Открытые заявки</a>
              </Menu.Item>
              <Menu.Item icon={<LockOutlined />}>
                <a href=''>Закрытые заявки</a>
              </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title='Настройки'>
              <Menu.Item icon={<SettingOutlined />}>
              <a href=''> Мой профиль</a>
              </Menu.Item>
              </Menu.ItemGroup>
          </Menu>
        </Drawer>
    </nav>
  );
}

export default NavBar;