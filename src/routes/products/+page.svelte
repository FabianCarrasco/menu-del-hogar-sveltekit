<script lang="ts">
    import { trpc } from '$lib/trpc/client'
    import type { SearchRequest } from '$lib/types/Meilisearch/SearchRequest';
    import type { FoodKeeperProducts } from '$lib/types/FoodKeeper';
    import vegetables from '$lib/assets/images/products/vegetables.png'

    let greeting = 'press the button to load data'
    let loading = false
    let request: Partial<SearchRequest> = {};

    let products: FoodKeeperProducts[] = []

    const loadData = async () => {
        loading = true
        products = await trpc().products.query(request)
        request = {}
        console.log(products)
        loading = false
    }
</script>

<div class="w-fit px-2 py-4">
    <h6>Loading data in <code>+page.svelte</code></h6>
    <form on:submit={loadData}>
        <input type="text" name="product" id="product" class="ring-1 ring-black" bind:value={request.q}>
        <input type="submit" class="cursor-pointer">
    </form>

    {#each products as product}
        <p>{(product.name_subtitle !== null ? product.name_subtitle : '') + ' ' + product.name}<br></p>
    {/each}

    <p>{greeting}</p>
    
</div>

