'use client'

import { StatusButton } from './StatusButton'
import styles from './promptForm.module.css'

interface PromptFormProps {
    action: (data: FormData) => void
    onLoading?: (loading: boolean) => void
}

export function PromptForm({
    action,
    onLoading = () => {}
}: PromptFormProps) {
    return (
        <form className={styles.form} action={action}>
            <textarea
                name="prompt"
                id="prompt"
                cols={80}
                rows={20}
                className={styles.textarea}
                placeholder="Escribe tus requerimientos aquí"/>
            <StatusButton onLoading={onLoading}/>
        </form>
    )
}