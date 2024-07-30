import { useFormStatus } from 'react-dom'

import { Loader } from '../Loader'

import styles from './statusButton.module.css'

export interface StatusButtonProps {
    disabled?: boolean
    onLoading?: (loading: boolean) => void
}

export function StatusButton({
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
        value="Generar historias"
        disabled={status.pending || disabled}
    />
}