import MeiliSearch from "meilisearch";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config()

; await (async () => {

    const client = new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: process.env.MEILISEARCH_API_KEY
    })
    const index = client.index('products')
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()

        const products = await prisma.product.findMany()
        const response = await index.addDocuments(products, {primaryKey: 'id'})

        console.log(response)

    } catch (error) {
        console.error('Error: ', error)
    } finally {
        prisma.$disconnect()
    }
})()