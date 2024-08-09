import { RxCross2  } from 'react-icons/rx'

import styles from './modal.module.css'

export interface ModalProps {
    open?: boolean,
    onClose?: () => void,
    children?: React.ReactNode
}

export const Modal = ({
    open,
    onClose,
    children
}: ModalProps) => {

    if(open === false) {
        return null
    }

    return (
        <div className={styles.modal}>
            <header className={styles.modalHeader}>
                <button className={styles.closeButton} onClick={() => onClose?.()}>
                    <RxCross2 color='var(--foreground)'/>
                </button>
            </header>
            <main className={styles.modalContent}>
                {children}
            </main>
        </div>
    )
}