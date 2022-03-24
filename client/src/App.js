
import React, { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import { Empty } from 'antd';



export default class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className='emptyPage' style={ { width: '100vw', height: '100hw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Empty />
        </div>
      </>
    );
  }
}








