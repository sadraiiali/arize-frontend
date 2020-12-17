import React from 'react'

import ErrorTriangle from '../../../../assets/icons/error-triangle.svg'
import SuccessSign from '../../../../assets/icons/success-sign.svg'

import styles from './Message.module.css'

interface IProps {
    text : string,
    type : IMessageTypes
}

export enum IMessageTypes {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

const Message = (props : IProps) => {
    const { text, type } = props

    return (
        <div className={styles.container}>
            {type === IMessageTypes.ERROR? <ErrorTriangle />:null}
            {type === IMessageTypes.SUCCESS? <SuccessSign />:null}
            &nbsp;&nbsp;
            <small 
                className={
                    `
                    ${type === IMessageTypes.ERROR? styles.errorText : ' '}
                    ${type === IMessageTypes.SUCCESS? styles.successText : ' '}
                    `
                }
            >
                {text}
            </small>
        </div>
    )
}

export default Message