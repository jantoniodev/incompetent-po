import styles from './button.module.css'

export interface LightButtonProps {
    title: string
    children?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}

export const LightButton = ({
    title,
    disabled = false,
    children,
    onClick = () => {}
}: LightButtonProps) => {
    return <button
        className={styles.lightButton}
        onClick={() => onClick()}
        disabled={disabled}
    >
        { children || title }
    </button>
}