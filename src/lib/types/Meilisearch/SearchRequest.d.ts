declare interface SearchRequest {
    /**  Query string */
    q: string | undefined,

    /** Number of documents to skip */ 
    offset: number | undefined,

    /** Maximum number of documents returned */
    limit: number | undefined,

    /** Maximum number of documents returned for a page */
    hitsPerPage: number | undefined,

    /** Request a specific page of results */
    page: number | undefined,

    /** Filter queries by an attribute's value */
    filter: string[] | undefined,

    /** Display the count of matches per facet */
    facets: string[] | undefined,

    /** Attributes to display in the returned documents */
    attributesToRetrieve: string[] | undefined,

    /** Attributes whose values have to be cropped */
    attributesToCrop: string[] | undefined,

    /** Maximum length of cropped value in words */
    cropLength: number | undefined,

    /** String marking crop boundaries */
    cropMarker: string | undefined,

    /** Highlight matching terms contained in an attribute */
    attributesToHighlight: string[] | undefined,

    /** String inserted at the start of a highlighted term */
    highlightPreTag: string | unefined,

    /** String inserted at the end of a highlighted term */
    highlightPostTag: string | undefined,

    /** Return marching terms location */
    showMatchesPosition: boolean | undefined,

    /** Sort search results by an attribute's value */
    sort: string[] | undefined,

    /** Strategy used to match quert terms within documents */
    matchingStrategy: string | undefined,

    /** Display the global ranking score of a document */
    showRankingScore: boolean | undefined,

    /** Restrict search to the specified attributes */
    attributesToSearchOn: string[] | undefined,
}

export {SearchRequest}