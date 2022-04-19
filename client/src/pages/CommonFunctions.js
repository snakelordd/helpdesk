import React from "react";
import { LineOutlined, ArrowUpOutlined } from '@ant-design/icons';


export const getFormatDate = (record) => {   
    let date = new Date(Date.parse(record.createdAt))
    return date.toLocaleString().slice(0, -3)
}

export const getStatusTag = (record, ticketProps) => { 
       for (let i=0; i< ticketProps.statuses.length; i++) {
          if (record.status.name === ticketProps.statuses[i].name) {
              return (ticketProps.statuses[i].tag)
          }
       }
}

export const getPriorityIcon = (record, ticketProps) => { 
    for (let i=0; i< ticketProps.priorities.length; i++) {
       if (record.priority.name === ticketProps.priorities[i].name) {
           switch (ticketProps.priorities[i].name) {
                case 'НИЗКИЙ':
                    return 
                case 'СРЕДНИЙ':
                    return <LineOutlined />
                case 'ВЫСОКИЙ':
                    return <ArrowUpOutlined style={{color: 'red'}}/> 
           }
       }
    }
}