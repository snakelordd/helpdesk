import React, { useContext } from 'react';
import {Route, Navigate, Router, Routes} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { MANUAL_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path="*" element={<Navigate to="/login"/>} /> 
        </Routes >

    );
});

export default AppRouter;