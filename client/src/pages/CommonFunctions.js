import React from "react";
import { LineOutlined, ArrowUpOutlined } from '@ant-design/icons';


export const getFormatDate = (record) => {   
    let date = new Date(Date.parse(record.createdAt))
    return date.toLocaleString().slice(0, -3)
}

export const getStatusTag = (statusName, ticketProps) => { 
    ticketProps.statuses.map( item => {
        if (item.name === statusName) {
            return (item.tag)
        }
    })
    //    for (let i=0; i< ticketProps.statuses.length; i++) {
    //       if (record.status.name === ticketProps.statuses[i].name) {
    //           return (ticketProps.statuses[i].tag)
    //       }
    //    }
}

export const getPriorityIcon = (record) => { 
    switch(record.isPriority) {
        case true:
            return <ArrowUpOutlined style={{color: 'red'}}/> 
        case false:
            return
    }

}