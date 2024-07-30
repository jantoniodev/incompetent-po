'use client'

import { useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'

import { generate } from '@/actions/generate'
import { Loader } from '@/components/Loader'

import styles from './promptForm.module.css'

const initialState = {
    result: null
}

interface PromptFormProps {
    onResponse: (response: any) => void
}

function StatusButton() {
    const status = useFormStatus()

    if(status.pending) {
        return <Loader/>
    }

    return <input
        className={styles.button}
        type="submit"
        value="Generar historias"
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