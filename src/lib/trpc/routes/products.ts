import searchIndex from '$lib/helpers/meilisearch/searchIndex'
import {t} from '$lib/trpc/t'
import type { FoodKeeperProducts } from '$lib/types/FoodKeeper'
import type { SearchRequest } from '$lib/types/Meilisearch/SearchRequest'
import { SearchRequestZod } from '$lib/types/Meilisearch/SearchRequestZod'

const productsRouter = t.router({
    productsSearch: t.procedure
        .input(SearchRequestZod)
        .query(async (opts) => {
            const {input} = opts
            const results = await searchIndex('products', input as SearchRequest)
            return results.hits as FoodKeeperProducts[]
        })
})

export type ProductsRouter = typeof productsRouter
export {productsRouter}