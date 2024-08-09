import { useState, useEffect } from 'react'

export function useLocalStorage(localStorageName: string) {
    const [localStorage, setLocalStorage] = useState(() => {
        const data = window.localStorage.getItem(localStorageName)
        return data ? JSON.parse(data) : null
    })

    useEffect(() => {
        const onStorageChange = (event: StorageEvent) => {
            if (event.key === localStorageName) {
                setLocalStorage(event.newValue)
            }
        }

        addEventListener('storage', onStorageChange)

        return () => removeEventListener('storage', onStorageChange)
    }, [])

    function saveLocalStorage(data: any) {
        setLocalStorage(data)
        window.localStorage.setItem(localStorageName, JSON.stringify(data))
    }

    return [localStorage, saveLocalStorage]
}