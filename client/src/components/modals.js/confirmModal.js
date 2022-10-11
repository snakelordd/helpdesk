import { Modal } from 'antd';
import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
  

export const showConfirm = (content, acceptFunction, formValues) => {


    Modal.confirm({
      content: <span>{Array.isArray(content) ? content.map((item) => <p>{item}</p>) : content}</span>,
      centered: true,
      icon: <ExclamationCircleOutlined/>,
      okText: 'Да',
      cancelText: 'Отмена',
      width: 500,
      onOk() {
        acceptFunction(formValues)
      },
      onCancel() {
      }
    })

  };
  