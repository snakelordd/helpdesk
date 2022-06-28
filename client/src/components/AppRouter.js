import React, { useContext } from 'react';
import {Route, Navigate, Router, Routes, useParams} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { MANUAL_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {user.isAuth === false && publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {user.isAuth === true && <Route path="/login" element={<Navigate to="/tickets"/>} /> }
            {user.isAuth === false && <Route path="/*" element={<Navigate to="/login"/>} /> }
        </Routes >

    );
});

export default AppRouter;