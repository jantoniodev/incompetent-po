const { Configuration, OpenAIApi } = require('openai')

const apiKey = process.env.OPENAPI_API_KEY

if (!apiKey)
    throw 'OpenApi key is required'

const configuration = new Configuration({
    apiKey
})

const openai = new OpenAIApi(configuration)

const chat = async (userMessage) => {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a software engineer with many years of experience. You are working on a pretigious consultant company. You will analyze a system requirement from a client and you should answer with the user stories to archieve the user requirements. The format for the asnwer will be: "As a [role], I [Want wanna do], So that [Business goal]." You will answer a list with many of this user history, only answer with the user stories with no explanations.' },
                { role: 'user', content: `The requirements for the system is: "${userMessage}"` }
            ]
        })

        return completion.data.choices[0].message.content
    }
    catch (error) {
        if (error.response) {
            throw error.response.data
        } else {
            throw error.message
        }
    }
}

module.exports = {
    chat
}