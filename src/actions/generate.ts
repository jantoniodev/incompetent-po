'use server'

import { UserStory } from '@/entities/userStory'

import { dummyResponse } from './dummyResponse'

interface UserStoryResponse {
    result: UserStory[] | null
}

export async function generate(prevState: any, formData: FormData) {
    const userPrompt = formData.get('prompt') as string

    if (!userPrompt) {
        throw new Error('No prompt is required')
    }

    const prompt = `
        Actua como el product owner de una empresa de software. 
        El requerimiento es el siguiente: "${userPrompt}".
        Debes desarrollar las historias de usuario para que el equipo de 
        desarrollo las pueda implementar siguiendo la metodologia scrum.
        La historia de usuario debe tener el formato: “Como [perfil], quiero 
        [objetivo del software], para lograr [resultado]”,
        debe tener una descripción de no más de un parrafo y una lista con 
        los criterios de aceptación separados por: criterios de aceptación del 
        negocio y criterios de aceptación tecnicos.

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
    `

    return new Promise<UserStoryResponse>((resolve, reject) => {
        setTimeout(() => {
            console.log('Generating stories...')
            resolve({
                result: dummyResponse
            })
        }, 10_000)
    })
}