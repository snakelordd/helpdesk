import React, { useContext } from 'react';
import { PageHeader, Button, Descriptions, Tag, Divider, Form, Input, Select, Space, message, Tabs } from 'antd';
import { Context } from '..';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

function callback(key) {
    console.log(key);
}

const Settings = () => {
    const [current, setCurrent] = React.useState('1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };
    
    const {ticketProps} = useContext(Context)
    const { Option } = Select;

    const {categories} = ticketProps
    


    return (
    <div className="pageprops" >
        <div className='header pageWidth' style={{marginTop: '1%', height: '8%'}}>
                <PageHeader
                    style={{height: '100%'}}
                    ghost={false}
                    onBack={() => window.history.back()}
                    title='Настройки'
                >
              
                </PageHeader>
        </div>
        <div className='content pageWidth'  style={{display: 'flex', height:'87%'}}>
            
            <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%', paddingLeft: '2%'}}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Справочники" key="1" icon={<AppstoreOutlined/>}>
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>           

            </div>  
        </div>
    </div>
    );
};

export default Settings;