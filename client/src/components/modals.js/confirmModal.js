import { Modal } from 'antd';
import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
  

export const showConfirm = (content, acceptFunction, formValues) => {

    Modal.confirm({
      content: content,
      centered: true,
      icon: <ExclamationCircleOutlined/>,
      okText: 'Да',
      cancelText: 'Отмена',
      onOk() {
        acceptFunction(formValues)
      },
      onCancel() {
      }
    })

  };
  