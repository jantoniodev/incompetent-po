'use client'

import { useState } from 'react'

import { PromptForm } from '@/components/PromptForm'

import styles from "./page.module.css";

export default function Home() {
    const [response, setResponse] = useState<any>(null)

    return (
        <div>
            <h1>Incompetent PO</h1>
            <PromptForm onResponse={setResponse}/>

            {
                response &&
                <pre className={styles.response}>
                    {JSON.stringify(response, null, 4)}
                </pre>
            }
        </div>
    )
}
