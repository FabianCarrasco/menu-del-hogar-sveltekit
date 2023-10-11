import {z} from 'zod'

/** Same as SearchRequest type */
const SearchRequestZod = z.object({
    q: z.string().optional(),
    offset: z.number().optional(),
    limit: z.number().optional(),
    hitsPerPage: z.number().optional(),
    page: z.number().optional(),
    filter: z.string().array().optional(),
    facets: z.string().array().optional(),
    attributesToRetrieve: z.string().array().optional(),
    attributesToCrop: z.string().array().optional(),
    cropLength: z.number().optional(),
    cropMarker: z.string().optional(),
    attributesToHighlight: z.string().array().optional(),
    highlightPreTag: z.string().optional(),
    highlightPostTag: z.string().optional(),
    showMatchesPosition: z.boolean().optional(),
    sort: z.string().array().optional(),
    matchingStrategy: z.string().optional(),
    showRankingScore: z.boolean().optional(),
    attributesToSearchOn: z.string().array().optional(),
})

export {SearchRequestZod}