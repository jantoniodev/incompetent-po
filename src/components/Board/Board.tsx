'use client'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import styles from './board.module.css'

import { UserStory } from '@/entities/userStory'
import { BoardCard } from './BoardCard'

export interface BoardProps {
    histories: UserStory[]
}

export const Board = ({
    histories
}: BoardProps) => {
    return (
        <>
            <div className={styles.board}>
                <div className={styles.boardHeader}>
                    <h1 className={styles.boardTitle}>Historias</h1>
                    <div className={styles.boardCount}>{histories.length}</div>
                </div>

                <ResponsiveMasonry>
                    <Masonry gutter='1rem'>
                        {
                            histories.map((story) => 
                                <BoardCard key={story.id} story={story} />
                            )
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </>
    )
}