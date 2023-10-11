import MeiliSearch from "meilisearch";
import type { SearchRequest } from "$lib/types/Meilisearch/SearchRequest";
import type { SearchResponse } from "$lib/types/Meilisearch/SearchResponse";
import dotenv from 'dotenv'

dotenv.config()

const client = new MeiliSearch({
    host: process.env.MEILISEARCH_API_HOST || 'http://localhost:7700',
    apiKey: process.env.MEILISEARCH_API_KEY
})

const searchIndex = async (index: string, request: SearchRequest) => {
    const response = await client.index(index).search(request.q, request) as SearchResponse
    return response
}

export default searchIndex