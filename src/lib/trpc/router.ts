import { initTRPC } from "@trpc/server";
import type { SearchRequest } from "$lib/types/Meilisearch/SearchRequest";
import { SearchRequestZod } from "$lib/types/Meilisearch/SearchRequestZod";
import searchIndex from "$lib/helpers/meilisearch/searchIndex";
import type { FoodKeeperProducts } from "$lib/types/FoodKeeper";
import type { SearchResponse } from "$lib/types/Meilisearch/SearchResponse";
import { t } from "$lib/trpc/t";

export const router = t.router({
    products: t.procedure.input(SearchRequestZod).query(async (opts) => {
        const {input} = opts
        const results: SearchResponse = await searchIndex('products', input as SearchRequest)

        return results.hits as FoodKeeperProducts[]
    })
})

export type Router = typeof router