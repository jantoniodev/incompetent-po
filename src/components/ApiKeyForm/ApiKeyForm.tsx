import { Button } from '@/components/Button'

import styles from './apiKeyForm.module.css'

export interface ApiKeyFormProps {
    action?: (formData: FormData) => void
}

export const ApiKeyForm = ({
    action
}: ApiKeyFormProps) => {
    return (
        <form action={action} className={styles.container}>
            <h2>Configura la api key de openAi</h2>

            <article className={styles.article}>
                <p>
                    Entra a este <a target='_blank' href='https://platform.openai.com/api-keys'>link</a> para crear tu api key.
                </p>

                <p>
                    Haz click en el botón "Create new secret key", saldrá un modal, 
                    introduce un nombre para tu api key y haz click en el botón "Create secret key".
                    Copia la api key y pégala en el input de abajo.
                </p>

                <p>
                    Tu api key quedará encriptada en tu navegador y no será compartida con nadie.
                </p>

            </article>

            <input className={styles.input} name='apikey' type="password" placeholder="Api Key" />

            <Button title='Guardar api key'/>
        </form>
    )   
}