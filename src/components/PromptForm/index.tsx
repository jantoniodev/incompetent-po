'use client'

import { useFormStatus, useFormState } from 'react-dom'

import { generate } from '@/actions/generate'
import { useEffect } from 'react'

import styles from './promptForm.module.css'

const initialState = {
    result: null
}

interface PromptFormProps {
    onResponse: (response: any) => void
}

function StatusButton() {
    const status = useFormStatus()

    return <input
        className={styles.button}
        type="submit"
        value={status.pending ? "Obteniendo respuesta..." : "Obtener respuesta"}
        disabled={status.pending}
    />
}

export function PromptForm({ onResponse }: PromptFormProps) {
    const [state, formAction] = useFormState(generate, initialState)

    useEffect(() => {
        if (state.result) {
            onResponse(state.result)
        }
    }, [state])

    return (
        <form className={styles.form} action={formAction}>
            <textarea
                name="prompt"
                id="prompt"
                cols={80}
                rows={20}
                className={styles.textarea}
                placeholder="Escribe tus requerimientos aquí"/>
            <StatusButton/>
        </form>
    )
}