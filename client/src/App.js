import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check, fetchOneUser} from './http/userAPI';
import { Spin } from 'antd';
import { LOGIN_ROUTE } from './utils/consts';
import jwtDecode from 'jwt-decode';


const App = () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  

  useEffect( () => {
      check().then( data => {
        if (localStorage.token === data.token) {
            fetchOneUser(data.user.id).then(data => {user.setUser(data)} )
            // user.setUser(data.user)
            user.setIsAuth(true)
        }
        else {
          localStorage.removeItem('token')
        }
      }).finally( ()=> setLoading(false))
    

  }, [])

  if (loading) {
    return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Spin size='large'/>
    </div>
    )
  }
  return (
    <BrowserRouter>
    
        {user.isAuth && <NavBar style={{position: 'relative'}}/>}
        <AppRouter />        
    </BrowserRouter>
  );
}

export default observer(App);
