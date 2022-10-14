import React, { useContext } from 'react';
import {Route, Navigate, Router, Routes, useParams, useNavigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { CURRENT_ROUTE, LOGIN_ROUTE, MANUAL_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import AppLayout from '../AppLayout';
import Current from '../pages/Current';
import Auth from '../pages/Auth';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index path={CURRENT_ROUTE} element={<Current/>} />
                {authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component}/>
                )}
                {user.isAuth === false && publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component}/>
                )}

            </Route>
            {!user.isAuth && <Route key={LOGIN_ROUTE} path={LOGIN_ROUTE} element={<Auth/>}/>}

        </Routes >

    );
});

export default AppRouter;