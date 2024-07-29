'use client'

import { useFormStatus, useFormState } from 'react-dom'

import { generate } from '@/actions/generate'
import { useEffect } from 'react'

const initialState = {
    result: null
}

interface PromptFormProps {
    onResponse: (response: any) => void
}

function StatusButton() {
    const status = useFormStatus()

    if(status.pending) {
        return <input type="submit" value="Obteniendo respuesta..." disabled/>
    }

    return <input type="submit" value="Generar historias"/>
}

export function PromptForm({ onResponse }: PromptFormProps) {
    const [state, formAction] = useFormState(generate, initialState)

    useEffect(() => {
        if (state.result) {
            onResponse(state.result)
        }
    }, [state])

    return (
        <form action={formAction}>
            <textarea
                name="prompt"
                id="prompt"
                cols={80}
                rows={20}
                placeholder="Escribe tus requerimientos aquí"/>
            <StatusButton/>
        </form>
    )
}