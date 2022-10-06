import { Avatar, Button, Card, Descriptions, Divider, Form, Input, PageHeader, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../..';
import { SettingOutlined} from '@ant-design/icons';
import { addUserInfo, fetchOneUser } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import UserInfoModal from '../../components/modals.js/UserInfoModal';
import UserCard from './UserCard';
import UserSettings from '../../components/modals.js/UserSettings';

const Profile = () => {

    const params = useParams()
    const {user} = useContext(Context)
    const [profile, setProfile] = useState('')

    
    const [showEditForm, setShowEditForm] = useState(false)
    const [isUpdate, setIsUpdate] = useState(true)

    const navigate = useNavigate()

    const onHide = () => {
        setShowEditForm(false)
    }

    const openSettings = () => {
        setShowEditForm(true)
    }

    useEffect(() => {
        fetchOneUser(user.user.id).then(data => setProfile(data))
    }, [showEditForm])
    
    return (
        <div className='pageprops'>
            <div className='pageWidth' style={{ marginTop: '1%'}}>
                <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title="Мой профиль"
                  extra={[
                  ]}
                >
                </PageHeader>
                <div className='pageWidth' style={{ marginTop: '1%', }}>
                    <div style={{width: '100%', backgroundColor: 'white', paddingTop: '1%'}}>
                    <Card 
                        key='profileHeader'
                        bordered={false} 
                        extra={<a key="edit" onClick={openSettings} style={{paddingRight: 50}}><Space><SettingOutlined /> Настройки </Space></a>}
                        headStyle={{paddingTop: 20}}
                        title = {
                            <Card.Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title={ profile?.user_info?.name || profile?.email}
                                style={{paddingLeft: 50}}
                            />
                        }
                    >
                        <UserCard profile={profile} />
                    </Card>
                        {showEditForm && <UserSettings show={showEditForm} onHide={onHide} user={profile} isUpdate={true}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer (Profile);