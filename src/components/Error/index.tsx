'use client'

import { useState } from 'react'

import { IoIosWarning } from "react-icons/io"
import { IoClose } from "react-icons/io5";

import styles from './error.module.css'

export interface ErrorProps {
    message?: string
}

export const Error = ({
    message
}: ErrorProps) => {
    const [hideError, setHideError] = useState(false)

    if(hideError) {
        return null
    }

    return (
        <div className={styles.errorContainer}>
            <IoIosWarning size={25}/> { message }
            <IoClose size={20} className={styles.closeButton} onClick={() => setHideError(true)}/>
        </div>
    )
}