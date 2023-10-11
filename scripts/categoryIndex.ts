import MeiliSearch from "meilisearch";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config()

; await (async () => {
    const client = new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: process.env.MEILISEARCH_API_KEY
    })

    const index = client.index('categories')
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()

        const categories = await prisma.category.findMany()
        const response = await index.addDocuments(categories)
    
        console.log(response)
    } catch (error) {
        console.error('Error: ', error)
    } finally {
        prisma.$disconnect()
    }
})()
