import { message, Button } from 'antd';
import React from 'react';

export const success = (alertMessage) => {
   const {content} = alertMessage
   console.log(content)
  message.success({
    content: {content},
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
};

