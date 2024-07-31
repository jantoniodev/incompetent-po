'use client'

import { IoIosWarning } from "react-icons/io"

import styles from './error.module.css'

export interface ErrorProps {
    message?: string
}

export const Error = ({
    message
}: ErrorProps) => {
    return (
        <div className={styles.errorContainer}>
            <IoIosWarning size={25}/> { message }
        </div>
    )
}