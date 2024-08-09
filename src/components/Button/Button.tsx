import { useFormStatus } from 'react-dom'

import { Loader } from '../Loader'

import styles from './button.module.css'

export interface StatusButtonProps {
    title: string
    disabled?: boolean
    onLoading?: (loading: boolean) => void
}

export function Button({
    title,
    disabled = false,
    onLoading = () => {}
}: StatusButtonProps) {
    const status = useFormStatus()

    onLoading(status.pending)

    if(status.pending) {
        return <Loader/>
    }

    return <input
        className={styles.button}
        type="submit"
        value={title}
        disabled={status.pending || disabled}
    />
}