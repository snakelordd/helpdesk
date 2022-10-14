import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '.';
import NavBar from './components/NavBar';

const AppLayout = () => {
    const {user} = useContext(Context)
    return (
        <>
            <header>
                {user.isAuth && <NavBar style={{position: 'relative'}}/>}
            </header>
            <main className='appLayout'>
                <Outlet />
            </main>
        </>
    );
};

export default observer (AppLayout);