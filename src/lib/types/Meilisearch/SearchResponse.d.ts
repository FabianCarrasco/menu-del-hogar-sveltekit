declare interface SearchResponse {
    /** Results of the query */
    hits: any[],

    /** Number of documents skipped */
    offset: number,

    /** Number of documents to take */
    limit: number,

    /** Estimated total number of matches */
    estimatedTotalHits: number,

    /** Exhausted total number of matches */
    totalHits: number,

    /** Exhausted total number of search results page */
    totalPages: number,

    /** Number of results on each page */
    hitsPerPage: number,

    /** Current results per page */
    page: number,

    /** Distribution of the given facets */
    facetDistribution: any,

    /** The numeric `min` and `max` values per facet */
    facetStats: any,

    /** Processing time of the query */
    processingTimeMs: number,

    /** Query originating the response */
    query: string
}

export {SearchResponse}