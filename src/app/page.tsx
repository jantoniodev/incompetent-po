'use client'

import { useState } from 'react' 
import { useFormState } from 'react-dom'

import { PromptForm } from '@/components/PromptForm'
import { Error } from '@/components/Error'
import { Board } from '@/components/Board'
import { generate } from '@/actions/generate'

import styles from "./page.module.css"

const initialState = {
    result: null
}

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [state, formAction] = useFormState(generate, initialState)

    return (
        <div className={styles.content}>
            <h1>Incompetent PO</h1>

            <div className={styles.promptForm}>
                <PromptForm action={formAction} onLoading={setLoading}/>

                {
                    (state.error && !loading) &&
                    <Error message={state.errorMessage}/>
                }
            </div>

            {
                (state.result && !loading) &&
                <Board histories={state.result}/>
            }
        </div>
    )
}
