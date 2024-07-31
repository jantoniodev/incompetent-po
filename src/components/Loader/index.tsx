import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'

const messages = [
    'Trabajando más rápido que tu product owner',
    'Generando historias de usuario',
    'Haciendo micromanagement',
    'Imitando a tu PO: ¿Como vamos?',
]

export const Loader = () => {
    const [showAfterDebounce, setShowAfterDebounce] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(messages[0])

    useEffect(() => {
        let interval: NodeJS.Timeout

        const debounceTimeout = setTimeout(() => {
            setShowAfterDebounce(true)
        }, 300)

        const timeout = setTimeout(() => {
            setShowMessage(true)

            interval = setInterval(() => {
                const message = messages[Math.floor(Math.random() * messages.length)]
                setSelectedMessage(message)
            }, 5000)
        }, 3000)


        return () => {
            clearTimeout(timeout)
            clearTimeout(debounceTimeout)
            clearInterval(interval)
        }
    }, [])

    if(!showAfterDebounce) {
        return null
    }

    return (
        <>
            <PropagateLoader color='var(--color-primary)' size={25}/>
            {showMessage && <p>{selectedMessage}</p>}
        </>
    )
}