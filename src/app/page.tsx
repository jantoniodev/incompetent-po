'use client'

import { useEffect, useState } from 'react' 
import { useFormState } from 'react-dom'

import { PromptForm } from '@/components/PromptForm'
import { Error } from '@/components/Error'
import { Board } from '@/components/Board'
import { ApiKeyForm } from '@/components/ApiKeyForm'
import { Modal } from '@/components/Modal'
import { generate } from '@/actions/generate'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import styles from "./page.module.css"

const initialState = {
    result: null
}

export default function Home() {
    const [openAiKey, setOpenAiKey] = useLocalStorage('openAiKey')
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [state, formAction] = useFormState(generate, initialState)

    
    useEffect(() => {
        if(state.code === 'invalid_api_key') {
            setTimeout(() => {
                setOpenAiKey('')
                setApiKeyModalOpen(true)
            }, 1000)
        }
    }, [state.code])

    const handleFormAction = (formData: FormData) => {
        if (!openAiKey) {
            setApiKeyModalOpen(true)
            return
        }

        formData.set('apikey', openAiKey)

        formAction(formData)
    }

    const handleModalClose = () => {
        setApiKeyModalOpen(false)
    }

    const actionSetApiKey = (formData: FormData) => {
        const apiKey = formData.get('apikey')
        setOpenAiKey(apiKey)
        setApiKeyModalOpen(false)
    }

    return (
        <div className={styles.content}>
            <h1>Incompetent PO</h1>

            <div className={styles.promptForm}>
                <PromptForm action={handleFormAction} onLoading={setLoading}/>

                {
                    (state.error && !loading) &&
                    <Error message={state.errorMessage}/>
                }
            </div>

            <Modal open={apiKeyModalOpen} onClose={handleModalClose}>
                <ApiKeyForm action={actionSetApiKey}/>
            </Modal>

            {
                (state.result && !loading) &&
                <Board histories={state.result}/>
            }
        </div>
    )
}
