'use client'
import { useState } from 'react'

import { UserStory } from '@/entities/userStory'

import styles from './boardCard.module.css'

export interface BoardCardProps {
    story: UserStory
}

export const BoardCard = ({
    story,
}: BoardCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={styles.boardCard}>
            <header>
                <h1 className={styles.boardTitle}>{story.title}</h1>
                <h2 className={styles.boardStory}>{story.story}</h2>
            </header>

            <main>
                {
                    isExpanded &&
                    <>
                        <p className={styles.boardDescription}>{story.description}</p>

                        <p className={styles.listTitle}>Criterios de aceptación de negocio:</p>
                        <ul>
                            {
                                story.acceptanceCriteria.business
                                    .map((criteria) => <li key={criteria}>{criteria}</li>)
                            }
                        </ul>

                        <p className={styles.listTitle}>Criterios de aceptación técnicos:</p>
                        <ul>
                            {
                                story.acceptanceCriteria.technical
                                    .map((criteria) => <li key={criteria}>{criteria}</li>)
                            }
                        </ul>
                    </>
                }
            </main>

            <footer className={styles.cardFooter}>
                <button
                    className={styles.expandButton}
                    onClick={() => setIsExpanded(prev => !prev)}
                >
                    { isExpanded ? 'Ver menos' : 'Ver más' }
                </button>
            </footer>
        </div>
    )
}