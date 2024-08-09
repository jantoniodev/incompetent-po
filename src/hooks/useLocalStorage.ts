import { useState, useEffect } from 'react'
import { JSEncrypt } from 'jsencrypt'

const PUBLIC_KEY = (process.env.NEXT_PUBLIC_PUBLIC_KEY as string)?.replace(/\\n/g, '\n')

export function useLocalStorage(localStorageName: string, encrypt = false): [string, (data: any) => void] {
    const [localStorage, setLocalStorage] = useState('')

    useEffect(() => {
        const data = window.localStorage.getItem(localStorageName)
        setLocalStorage(data ? JSON.parse(data) : '')

        const onStorageChange = (event: StorageEvent) => {
            if (event.key === localStorageName) {
                setLocalStorage(event.newValue || '')
            }
        }

        addEventListener('storage', onStorageChange)

        return () => {
            removeEventListener('storage', onStorageChange)
        }
    }, [localStorageName])

    function saveLocalStorage(data: any) {
        const encriptedData = encrypt ? encryptData(data) : data
        setLocalStorage(encriptedData)
        window.localStorage.setItem(localStorageName, JSON.stringify(encriptedData))
    }

    return [localStorage, saveLocalStorage]
}

function encryptData(data: string) {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUBLIC_KEY)
    return encrypt.encrypt(data)
}