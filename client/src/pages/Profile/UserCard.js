import { Avatar, Card, Descriptions, Divider, Space } from 'antd';
import React from 'react';
import { MailOutlined, NumberOutlined , SolutionOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import UserInfoModal from '../../components/modals.js/UserInfoModal';

const UserCard = ({profile}) => {
    return (
        <Card bordered={false}>
            { 
            profile?.user_info &&
            <div style={{paddingLeft: '50px'}}>
                
                <div>
                { profile?.user_info &&
                    <Descriptions title="Информация о пользователе" >
                       {<Descriptions.Item label={<Space><SolutionOutlined />Юр. лицо</Space>}>{profile?.user_info?.organization}</Descriptions.Item>}
                       {<Descriptions.Item label={<Space><EnvironmentOutlined/>Место деятельности</Space>}><a>{profile?.user_info?.address}</a></Descriptions.Item>}
                       {<Descriptions.Item label={<Space><NumberOutlined />Номер аптеки</Space>}>{profile?.user_info?.department}</Descriptions.Item>}
                       {<Descriptions.Item label={<Space><MailOutlined />Эл. почта</Space>}><a>{profile?.email}</a></Descriptions.Item>}
                       {<Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{profile?.user_info.fedPhone}</a></Descriptions.Item>}
                       {<Descriptions.Item label={<Space><PhoneOutlined />Номер телефона</Space>}><a>{profile?.user_info.cityPhone}</a></Descriptions.Item>}
                    </Descriptions>
                    
                }
                </div>
            </div>
            }
        </Card>
    );
};

export default UserCard;