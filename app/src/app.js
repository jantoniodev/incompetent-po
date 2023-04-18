const form = document.getElementById('form')

const setLoading = (isLoading) => {
    const loading = document.getElementById('loading')
    const useStories = document.getElementById('userStories')

    loading.classList.toggle('hide', !isLoading)
    useStories.classList.toggle('hide', isLoading)
}

const setUserStories = (userStories) => {
    const userStoriesList = document.getElementById('userStoriesList')
    
    const liList = userStories.map(userStory => 
        `<li>${userStory.trim()}</li>`
    )

    userStoriesList.innerHTML = liList.join('')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const message = data.get('message')

    const url = `http://localhost:3001/product-owner?message=${message}`

    setLoading(true)
    fetch(url)
        .then(data => data.json())
        .then(data => {
            setUserStories(data)
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false)
        })
})