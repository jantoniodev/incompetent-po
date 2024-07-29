'use server'

import { UserStory } from '@/entities/userStory'

import { dummyResponse } from './dummyResponse'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const USE_DUMMY_RESPONSE = process.env.USE_DUMMY_RESPONSE || false

const COMPLETIONS_API = 'https://api.openai.com/v1/chat/completions'

interface UserStoryResponse {
    result: UserStory[] | null
}

export async function generate(prevState: any, formData: FormData) {
    const formPrompt = formData.get('prompt') as string

    if (!formPrompt) {
        throw new Error('No prompt is required')
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

        Debes generar al menos 20 historias de usuario.

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

    if(USE_DUMMY_RESPONSE) {
        return {
            result: dummyResponse
        }
    }

    const response = await fetch(COMPLETIONS_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
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

    const content = JSON.parse(json.choices[0].message.content)

    return {
        result: content
    } as UserStoryResponse
}