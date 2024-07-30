import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'

const messages = [
    'Trabajando más rápido que tu product owner',
    'Generando historias de usuario',
    'Haciendo micromanagement',
    'Imitando a tu PO: ¿Como vamos?',
]

export const Loader = () => {
    const [showMessage, setShowMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(messages[0])

    useEffect(() => {
        let interval: NodeJS.Timeout

        const timeout = setTimeout(() => {
            setShowMessage(true)

            interval = setInterval(() => {
                const message = messages[Math.floor(Math.random() * messages.length)]
                setSelectedMessage(message)
            }, 5000)
        }, 3000)


        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <PropagateLoader color='var(--color-primary)' size={25}/>
            {showMessage && <p>{selectedMessage}</p>}
        </>
    )
}