'use server'

import { generateUUID } from '@/utils/uuid'
import { UserStory } from '@/entities/userStory'
import { JSEncrypt } from 'jsencrypt'

import { dummyResponse } from './dummyResponse'

const COMPLETIONS_API = 'https://api.openai.com/v1/chat/completions'

const privateKey = (process.env.PRIVATE_KEY as string)?.replace(/\\n/g, '\n')

interface UserStoryResponse {
    error?: boolean
    errorMessage?: string
    code?: string
    result: UserStory[] | null
}

function decryptData(data: string) {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decrypt(data)
}

export async function generate(prevState: any, formData: FormData): Promise<UserStoryResponse> {
    const formPrompt = formData.get('prompt') as string
    const apiKey = formData.get('apikey') as string

    const decryptedApiKey = decryptData(apiKey)

    if (!formPrompt.trim()) {
        return {
            error: true,
            code: 'empty_prompt',
            errorMessage: 'Debes ingresar requerimientos.',
            result: null
        }
    }

    if (formPrompt.length > 500) {
        return {
            error: true,
            code: 'max_length_exceeded',
            errorMessage: 'No puedes ingresar más de 500 caracteres.',
            result: null
        }
    }

    const systemPrompt = `
        Actua como el product owner de una empresa de software. 
        Debes desarrollar las historias de usuario para que el equipo de 
        desarrollo las pueda implementar siguiendo la metodologia scrum.
        La historia de usuario debe tener el formato: “Como [perfil], quiero 
        [objetivo del software], para lograr [resultado]”,
        debe tener una descripción de no más de un parrafo y una lista con 
        los criterios de aceptación separados por: criterios de aceptación del 
        negocio y criterios de aceptación tecnicos.

        Debes generar al como máximo 10 historias de usuario.

        La respuesta debe seguir la siguiente interfaz de typescript pero el 
        resultado debe ser en JSON, no typescript:

        interface UserStory {
        id: number;
        title: string;
        story: string;
        description: string;
        acceptanceCriteria: AcceptanceCriteria;
        }

        interface AcceptanceCriteria {
        business: string[];
        technical: string[];
        }

        Responde en texto plano sin formato.
    `

    const userPrompt = `
        El requerimiento es el siguiente: "${formPrompt}".
    `

    const useDummyResponse = ['demo', 'test', 'prueba'].includes(formPrompt.toLowerCase())

    if (useDummyResponse) {
        console.log('Using dummy response')
        await new Promise(resolve => setTimeout(resolve, 10000))
        return {
            result: [
                ...dummyResponse,
                ...dummyResponse,
            ].map((response, index) => ({ ...response, id: index + 1 }))
        }
    }

    try {
        const response = await fetch(COMPLETIONS_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${decryptedApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                temperature: 0.5,
            })
        })

        const json = await response.json()

        if(json.error?.code === 'invalid_api_key') {
            return {
                error: true,
                errorMessage: 'La api key es inválida.',
                code: 'invalid_api_key',
                result: null
            }
        }

        if(!!json.error) {
            console.log(json)
            return {
                error: true,
                errorMessage: json.error.message,
                result: null
            }
        }

        const content = JSON.parse(json.choices[0].message.content)

        return {
            result: content
        } as UserStoryResponse
    } catch(error) {
        const uuid = generateUUID()

        console.error(uuid, error)

        return {
            error: true,
            code: 'unexpected_error',
            errorMessage: `Ocurrió un error al intentar generar las historias de usuario. (Ref: ${uuid})`,
            result: null
        }
    }
}