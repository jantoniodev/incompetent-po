'use client'
import { useState } from 'react'

import { CharacterCounter } from '@/components/CharacterCounter'

import { StatusButton } from './StatusButton'
import styles from './promptForm.module.css'

const MAX_PROMPT_LENGTH = 500

interface PromptFormProps {
    action: (data: FormData) => void
    onLoading?: (loading: boolean) => void
}

export function PromptForm({
    action,
    onLoading = () => {}
}: PromptFormProps) {
    const [promptCount, setPromptCount] = useState(0)

    const handleChange = (event: any) => {
        setPromptCount(event.target.value.length)
    }

    const maxReached = promptCount > MAX_PROMPT_LENGTH

    return (
        <form className={styles.form} action={action}>
            <div className={styles.textareaContainer}>
                <textarea
                    name="prompt"
                    id="prompt"
                    cols={80}
                    rows={20}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Escribe tus requerimientos aquí"/>
                <CharacterCounter
                    current={promptCount}
                    max={MAX_PROMPT_LENGTH}
                    className={`${styles.characterCounter} ${maxReached ? styles.maxReached : ''}`}
                />
            </div>
            <StatusButton disabled={maxReached} onLoading={onLoading}/>
        </form>
    )
}