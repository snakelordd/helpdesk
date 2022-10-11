import { Card, Descriptions } from 'antd';
import React from 'react';
import UserCard from '../../../pages/Profile/UserCard';

const ApplyUser = ({registrationData, userInfoData}) => {

    const user = {user_info: ''}
    user.user_info = userInfoData

    
    return (
        <Card bordered={false} >
            {registrationData && userInfoData ? 
                
                <UserCard profile={user}/>

                :

                <p>
                    <b>Похоже вы забыли заполнить некоторые поля...</b>
                    
                </p>
            }
        </Card>
    );
};

export default ApplyUser;