import {Button, Card, Col, Form, Steps, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { addUserInfo, createUser } from '../../../http/userAPI';
import ApplyUser from './ApplyUser';
import RegistrationForm from './RegistrationForm';
import UserInfoForm from './UserInfoForm';


const { Step } = Steps

const CreateUser = ({showCreateTool, setShowCreateTool, reFetchUsers}) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [registrationData, setRegistrationData] = useState('')
    const [userInfoData, setUserInfoData] = useState('')

    const [form] = Form.useForm();

    const nextHandler = (values) => {
        console.log(values)
        currentStep === 0 && setRegistrationData(values)
        currentStep === 1 && setUserInfoData(values)
        currentStep  === 2 ?  setCurrentStep(0) : setCurrentStep(currentStep+1)
    }

    const closeCreateTool = () => {
        form.resetFields()
        setRegistrationData('')
        setUserInfoData('')
        setCurrentStep(0)
        setShowCreateTool(false)
    }

    const okHandler = (form) => {
        if (currentStep === 2) {
            const registrationFormData = new FormData()
            const userInfoFormData = new FormData()

            registrationFormData.append('email', registrationData.email)
            registrationFormData.append('password', registrationData.password)
            registrationFormData.append('role', 'USER')

            userInfoFormData.append('name', userInfoData.name)
            userInfoFormData.append('address', userInfoData.address)
            userInfoFormData.append('organization', userInfoData.organization)
            userInfoFormData.append('department', userInfoData.department)
            userInfoFormData.append('fedPhone', userInfoData.fedPhone)
            userInfoFormData.append('cityPhone', userInfoData.cityPhone)
            userInfoFormData.append('isUpdate', false)

            createUser(registrationFormData).then( data => {
                userInfoFormData.append('userId', data.id)
                addUserInfo(userInfoFormData)
            })

            setTimeout(() => { message.success({ content: 'Успешно!', key: 'message', duration: 2, 
              style: {
                marginTop: '45vh',
              } });
            }, 200);
            reFetchUsers()
            closeCreateTool()
            
        }

        form.validateFields().then( values => nextHandler(values))
    }
    return (
        <Modal 
            title='Мастер создания пользователя'
            visible={showCreateTool}
            centered 
            onCancel={closeCreateTool}
            width={900}
            footer={
                [
                    <Button key='cancelButton' onClick={() => {currentStep != 0 && setCurrentStep(currentStep - 1) || currentStep === 0 && setShowCreateTool(false)}}>
                        {currentStep === 0 ? 'Отмена' : 'Назад'}
                    </Button>,
                    <Button type='primary' key='okButton' onClick={() => okHandler(form)} >
                        {currentStep != 2 ? 'Далее' : 'Завершить'}
                    </Button>
                ]
            }
        >
            <Card bordered={false} key='content'>   
                <Card bordered={false} key='steps'>
                    <Steps current={currentStep}  >
                        <Step title="Шаг 1" description="Регистрация" />
                        <Step title="Шаг 2" description="Персональные данные" />
                        <Step title="Шаг 3" description="Завершение регистрации" />
                    </Steps>
                </Card>
            </Card>
            {currentStep === 0 && <RegistrationForm setRegistrationData={setRegistrationData} form={form} initialData={registrationData}/>}
            {currentStep === 1 && <UserInfoForm setUserInfoData={setUserInfoData} form={form} initialdata={userInfoData}/>}
            {currentStep === 2 && <ApplyUser registrationData={registrationData} userInfoData={userInfoData} />}
        </Modal>
    );
};

export default CreateUser;