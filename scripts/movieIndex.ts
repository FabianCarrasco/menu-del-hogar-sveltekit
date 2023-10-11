import MeiliSearch from 'meilisearch'
import movies from '../movies.json'

;(async () => {

    const movieList = movies as any[]

    const client = new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: 'Fabianhuapo300900'
    })

    const index = client.index('movies')

    let response = await index.addDocuments(movieList)

    console.log(response)
})()