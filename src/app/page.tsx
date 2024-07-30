'use client'

import { useState } from 'react'

import { UserStory } from '@/entities/userStory'
import { PromptForm } from '@/components/PromptForm'
import { Board } from '@/components/Board'

import styles from "./page.module.css";

export default function Home() {
    const [response, setResponse] = useState<UserStory[] | null>(null)

    return (
        <div className={styles.content}>
            <h1>Incompetent PO</h1>

            <PromptForm onResponse={setResponse}/>

            {
                response &&
                <Board histories={response}/>
            }
        </div>
    )
}
